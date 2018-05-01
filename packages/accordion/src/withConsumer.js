// @flow
import * as React from 'react';
import getDisplayName from '@hrasoa/components-utils/getDisplayName';

type ProviderValue = {
  isDisabled: (panlelId: string) => boolean,
  isExpanded: (panlelId: string) => boolean,
  isFocused: (panlelId: string) => boolean,
  togglePanel: (panlelId: string) => void,
  addPanel: (panlelId: string) => void,
  handleKeyNavigation: (e: SyntheticKeyboardEventElement<HTMLElement>) => void,
  openAll: () => void,
  closeAll: () => void,
  isTouched: boolean,
};

type PropsInput = any;

type PropsOutput = any;

function withConsumer(
  Consumer: React.ComponentType<any>,
  mapValueToProps?: (value: ProviderValue, ownProps: PropsInput) => PropsOutput,
): (React.ComponentType<PropsOutput>) => React.ComponentType<PropsInput> {
  return (WrappedComponent) => {
    function WithConsumer(ownProps) {
      return (
        <Consumer>
          {(value: ProviderValue) => (
            <WrappedComponent
              {...ownProps}
              {...(mapValueToProps ? mapValueToProps(value, ownProps) : {})}
            />
          )}
        </Consumer>
      );
    }

    WithConsumer.displayName = `withAccordion(${getDisplayName(WrappedComponent)})`;
    return WithConsumer;
  };
}

export default withConsumer;
