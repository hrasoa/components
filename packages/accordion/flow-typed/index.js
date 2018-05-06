declare type ProviderValue = {
  addPanel: (
    panelId: string,
    ref: { current: null | HTMLElement },
    isInitiallyExpanded: boolean,
  ) => void,
  closeAll: () => void,
  handleKeyNavigation: (e: SyntheticKeyboardEventElement<HTMLElement>) => void,
  isDisabled: (panlelId: string) => boolean,
  isExpanded: (panlelId: string) => boolean,
  isFocused: (panlelId: string) => boolean,
  isTouched: boolean,
  openAll: () => void,
  togglePanel: (panlelId: string) => void,
};
