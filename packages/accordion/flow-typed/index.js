declare type PanelRef = HTMLRef<HTMLElement>;

declare type ProviderValue = {
  addPanel: (
    panelId: string,
    ref: PanelRef,
    isInitiallyExpanded: boolean,
  ) => void,
  closeAll: () => void,
  disableInnert: boolean,
  handleKeyNavigation: (e: SyntheticKeyboardEventElement<HTMLElement>) => void,
  isDisabled: (panlelId: string) => boolean,
  isExpanded: (panlelId: string) => boolean,
  isFocused: (panlelId: string) => boolean,
  isTouched: boolean,
  openAll: () => void,
  togglePanel: (panlelId: string) => void,
};
