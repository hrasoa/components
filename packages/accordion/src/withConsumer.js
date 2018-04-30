// @flow
import * as React from 'react';
import getDisplayName from '@hrasoa/components-utils/getDisplayName';

type ProviderValue = {
  isDisabled: (id: string) => boolean,
  isExpanded: (id: string) => boolean,
  isFocused: (id: string) => boolean,
  togglePanel: (id: string) => void,
  addPanel: (id: string) => void,
  handleKeyNavigation: (e: SyntheticKeyboardEventElement<HTMLElement>) => void,
  openAll: () => void,
  closeAll: () => void,
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
