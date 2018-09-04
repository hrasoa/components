// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import {
  down,
  end,
  home,
  pageDown,
  pageUp,
  up,
} from 'ally.js/map/keycode';

const { Provider, Consumer } = React.createContext();

type Props = {
  allowMultiple?: boolean,
  allowToggle?: boolean,
  children: Node,
  disableInnert?: boolean,
  onChange?: ($Shape<ProviderState>, $Shape<ProviderState>, Panels) => void,
};

class AccordionProvider extends Component<Props, ProviderState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      allowMultiple: !!this.props.allowMultiple,
      expandedId: null,
      expandedStates: {},
      focusedId: null,
      isTouched: false,
      panelIds: [],
      panels: {},
    };
  }

  componentDidUpdate(prevProps: Props, prevState: ProviderState) {
    const {
      allowMultiple,
      expandedId,
      expandedStates,
      panels,
    } = this.state;
    if (this.props.onChange && (
      prevState.expandedStates !== expandedStates ||
      prevState.expandedId !== expandedId
    )) {
      this.props.onChange(
        allowMultiple ?
          { expandedStates: prevState.expandedStates } : { expandedId: prevState.expandedId },
        allowMultiple ?
          { expandedStates } : { expandedId },
        panels,
      );
    }
  }

  get providerValue(): $Exact<ProviderValue> {
    return {
      addPanel: this.addPanel,
      disableInnert: !!this.props.disableInnert,
      handleKeyNavigation: this.handleKeyNavigation,
      isDisabled: this.isDisabled,
      isExpanded: this.isExpanded,
      isFocused: this.isFocused,
      isTouched: this.state.isTouched,
      setState: (state: ProviderState) => { this.setState(state); },
      togglePanel: this.togglePanel,
    };
  }

  addPanel = (
    panelId: string,
    ref: PanelRef,
    isInitiallyExpanded: boolean,
  ): void => {
    if (this.state.panels[panelId]) return;

    this.setState((prevState) => {
      const panelIds = [...prevState.panelIds, panelId];
      const panels: Panels = { ...prevState.panels, [panelId]: { isInitiallyExpanded, ref } };
      const allowMultiple =
        prevState.allowMultiple ||
        panelIds
          .map(id => panels[id].isInitiallyExpanded)
          .filter(expanded => expanded === true)
          .length > 2;
      const expandedId = !prevState.expandedId && panelIds.length ?
        panelIds[0] :
        prevState.expandedId;
      return {
        allowMultiple,
        expandedId: isInitiallyExpanded ? panelId : expandedId,
        expandedStates: { ...prevState.expandedStates, [panelId]: isInitiallyExpanded },
        panelIds,
        panels,
      };
    });
  }

  isDisabled = (panelId: string): boolean =>
    this.isExpanded(panelId) && !(this.state.allowMultiple || this.props.allowToggle);

  isExpanded = (panelId: string): boolean =>
    (this.state.allowMultiple ?
      this.state.expandedStates[panelId] : this.state.expandedId === panelId);

  isFocused = (panelId: string): boolean =>
    this.state.focusedId === panelId;

  togglePanel = (panelId: string): void => {
    if (!this.state.panels[panelId]) return;

    this.setState(prevState => ({
      expandedId: this.props.allowToggle && prevState.expandedId === panelId ? null : panelId,
      expandedStates: {
        ...prevState.expandedStates,
        [panelId]: !prevState.expandedStates[panelId],
      },
      focusedId: panelId,
      isTouched: true,
    }));
  }

  handleKeyNavigation = (e: SyntheticKeyboardEventElement<HTMLElement>): void => {
    const { panelIds, panels } = this.state;
    const key = e.which.toString();
    const ctrlModifier = (e.ctrlKey && key.match(new RegExp(`${pageUp}|${pageDown}`)));
    const count = panelIds.length;
    const index = panelIds.indexOf(e.target.getAttribute('aria-controls'));
    if (index < 0) {
      // Inside a panel
      if (ctrlModifier) {
        Object.keys(panels).every((panelId) => {
          const { ref } = panels[panelId];
          if (ref.current && ref.current.contains(e.target)) {
            this.setState({ focusedId: panelId });
            // exit
            return false;
          }
          return true;
        });
        e.preventDefault();
      }
      return;
    }

    if (key.match(new RegExp(`${up}|${down}`)) || ctrlModifier) {
      const direction = (key.match(new RegExp(`${pageDown}|${down}`))) ? 1 : -1;
      this.setState({
        focusedId: panelIds[(index + count + direction) % count],
      });
      e.preventDefault();
    } else if (key.match(new RegExp(`${home}|${end}`))) {
      switch (e.which) {
        // Go to first accordion
        case home:
          this.setState({ focusedId: panelIds[0] });
          break;
          // Go to last accordion
        case end:
          this.setState({ focusedId: panelIds[count - 1] });
          break;
        default:
          break;
      }
      e.preventDefault();
    } else {
      this.setState({ focusedId: null });
    }
  }

  render() {
    return (
      <Provider
        value={this.providerValue}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default AccordionProvider;

export { Consumer };
