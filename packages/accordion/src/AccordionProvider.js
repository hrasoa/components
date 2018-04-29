// @flow
import * as React from 'react';

const { Provider, Consumer } = React.createContext();

type Props = {
  children: React.Node,
  allowMultiple?: boolean,
  allowToggle?: boolean,
};

type State = {
  expandedId: ?string,
  expandedStates: { [panelId: string]: boolean },
  focusedId: ?string,
};

class AccordionProvider extends React.Component<Props, State> {
  static defaultProps = {
    allowMultiple: false,
    allowTogle: false,
    className: null,
  };

  static getDerivedStateFromProps(nextProps: {}, prevState: {}) {
    return prevState;
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      expandedId: null,
      expandedStates: {},
      focusedId: null,
    };
    this.panels = {};
    this.panelIds = [];
    this.allowMultiple = false;
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
      const prevExpandedId = !prevState.expandedId && this.panelIds.length ?
        this.panelIds[0] :
        prevState.expandedId;
      return {
        expandedId: isInitiallyExpanded ? panelId : prevExpandedId,
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
      expandedId: this.props.allowToggle && prevState.expandedId === panelId ? null : panelId,
      expandedStates: {
        ...prevState.expandedStates,
        [panelId]: !prevState.expandedStates[panelId],
      },
      focusedId: panelId,
    }));
  }

  handleKeyNavigation = (e: SyntheticKeyboardEventElement<HTMLElement>): void => {
    const key = e.which.toString();
    // 33 = Page Up, 34 = Page Down
    const ctrlModifier = (e.ctrlKey && key.match(/33|34/));
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
    // 38 = Up, 40 = Down
    if (key.match(/38|40/) || ctrlModifier) {
      const direction = (key.match(/34|40/)) ? 1 : -1;
      this.setState({
        focusedId: this.panelIds[(index + count + direction) % count],
      });
      e.preventDefault();
    } else if (key.match(/35|36/)) {
      // 35 = End, 36 = Home keyboard operations
      switch (key) {
        // Go to first accordion
        case '36':
          this.setState({ focusedId: this.panelIds[0] });
          break;
          // Go to last accordion
        case '35':
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

  panels: {
    [panelId: string]: {
      ref: { current: null | HTMLElement },
      isInitiallyExpanded: boolean,
    }
  } = {};

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
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export default AccordionProvider;

export { Consumer };
