declare type PanelRef = HTMLRef<HTMLElement>;

declare type Panels = {
  [panelId: string]: {
    ref: PanelRef,
    isInitiallyExpanded: boolean,
  }
};

declare type ProviderState = {
  allowMultiple: boolean,
  expandedId: ?string,
  expandedStates: { [panelId: string]: boolean },
  focusedId: ?string,
  isTouched: boolean,
  panelIds: Array<string>,
  panels: Panels,
};

declare type ProviderValue = {
  addPanel: (
    panelId: string,
    ref: PanelRef,
    isInitiallyExpanded: boolean,
  ) => void,
  disableInnert: boolean,
  handleKeyNavigation: (e: SyntheticKeyboardEventElement<HTMLElement>) => void,
  isDisabled: (panlelId: string) => boolean,
  isExpanded: (panlelId: string) => boolean,
  isFocused: (panlelId: string) => boolean,
  isTouched: boolean,
  togglePanel: (panlelId: string) => void,
  setState: (state: ProviderState) => void,
};
