// @flow
import React, { Component } from 'react';
import type { Node } from 'react';
import {
  up,
  down,
  home,
  end,
  pageUp,
  pageDown,
} from 'ally.js/map/keycode';

const { Provider, Consumer } = React.createContext();

type Panels = {
  [panelId: string]: {
    ref: { current: null | HTMLElement },
    isInitiallyExpanded: boolean,
  }
};

type State = {
  expandedId: ?string,
  expandedStates: { [panelId: string]: boolean },
  focusedId: ?string,
  isTouched: boolean,
};

type Props = {
  children: Node,
  onChange?: (State, State, Panels) => void | any,
  allowMultiple?: boolean,
  allowToggle?: boolean,
};

class AccordionProvider extends Component<Props, State> {
  static defaultProps = {
    allowMultiple: false,
    allowTogle: false,
    className: null,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      expandedId: null,
      expandedStates: {},
      focusedId: null,
      isTouched: false,
    };
    this.panels = {};
    this.panelIds = [];
    this.allowMultiple = false;
  }

  componentDidUpdate(prevProps: Props, prevState: State) {
    const { expandedId, expandedStates } = this.state;
    if (this.props.onChange && (
      prevState.expandedStates !== expandedStates ||
      prevState.expandedId !== expandedId
    )) {
      this.props.onChange(
        { ...prevState },
        { ...this.state },
        this.panels,
      );
    }
  }

  addPanel = (
    panelId: string,
    ref: { current: null | HTMLElement },
    isInitiallyExpanded: boolean,
  ): void => {
    if (this.panels[panelId]) return;
    this.panelIds.push(panelId);
    this.panels[panelId] = { ref, isInitiallyExpanded };
    this.allowMultiple =
      !!this.props.allowMultiple ||
      this.panelIds
        .map(id => this.panels[id].isInitiallyExpanded)
        .filter(expanded => expanded === true)
        .length > 2;

    this.setState((prevState) => {
      const expandedId = !prevState.expandedId && this.panelIds.length ?
        this.panelIds[0] :
        prevState.expandedId;
      return {
        expandedId: isInitiallyExpanded ? panelId : expandedId,
        expandedStates: { ...prevState.expandedStates, [panelId]: !!isInitiallyExpanded },
      };
    });
  }

  isDisabled = (panelId: string): boolean =>
    this.isExpanded(panelId) && !(this.allowMultiple || this.props.allowToggle);

  isExpanded = (panelId: string): boolean =>
    (this.allowMultiple ?
      this.state.expandedStates[panelId] : this.state.expandedId === panelId);

  isFocused = (panelId: string): boolean =>
    this.state.focusedId === panelId;

  togglePanel = (panelId: string): void => {
    if (!this.panels[panelId]) return;

    this.setState(prevState => ({
      isTouched: true,
      expandedId: this.props.allowToggle && prevState.expandedId === panelId ? null : panelId,
      expandedStates: {
        ...prevState.expandedStates,
        [panelId]: !prevState.expandedStates[panelId],
      },
      focusedId: panelId,
    }));
  }

  toggleAllPanel(open: boolean): void {
    this.setState(prevState => ({
      isTouched: true,
      expandedStates: Object.keys(prevState.expandedStates)
        .reduce((acc, panelId) => ({ ...acc, [panelId]: open }), {}),
    }));
  }

  openAll = (): void => {
    if (!this.allowMultiple) return;
    this.toggleAllPanel(true);
  }

  closeAll = (): void => {
    if (!this.allowMultiple) return;
    this.toggleAllPanel(false);
  }

  handleKeyNavigation = (e: SyntheticKeyboardEventElement<HTMLElement>): void => {
    const key = e.which.toString();
    const ctrlModifier = (e.ctrlKey && key.match(new RegExp(`${pageUp}|${pageDown}`)));
    const count = this.panelIds.length;
    const index = this.panelIds.indexOf(e.target.getAttribute('aria-controls'));
    if (index < 0) {
      // Inside a panel
      if (ctrlModifier) {
        Object.keys(this.panels).every((panelId) => {
          const { ref } = this.panels[panelId];
          if (ref.current && ref.current.contains(e.target)) {
            this.setState({
              focusedId: panelId,
            });
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
        focusedId: this.panelIds[(index + count + direction) % count],
      });
      e.preventDefault();
    } else if (key.match(new RegExp(`${home}|${end}`))) {
      switch (e.which) {
        // Go to first accordion
        case home:
          this.setState({ focusedId: this.panelIds[0] });
          break;
          // Go to last accordion
        case end:
          this.setState({ focusedId: this.panelIds[count - 1] });
          break;
        default:
          break;
      }
      e.preventDefault();
    } else {
      this.setState({ focusedId: null });
    }
  }

  panelIds: Array<string>;

  panels: Panels;

  allowMultiple: boolean;

  render() {
    return (
      <Provider
        value={{
          isExpanded: this.isExpanded,
          isDisabled: this.isDisabled,
          isFocused: this.isFocused,
          togglePanel: this.togglePanel,
          addPanel: this.addPanel,
          handleKeyNavigation: this.handleKeyNavigation,
          openAll: this.openAll,
          closeAll: this.closeAll,
          isTouched: this.state.isTouched,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default AccordionProvider;

export { Consumer };
