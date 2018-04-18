// @flow
import * as React from 'react';
import getDisplayName from '@hrasoa/components-utils/getDisplayName';

type ProviderValue = {
  isDisabled: (id: string) => boolean,
  isExpanded: (id: string) => boolean,
  isFocused: (id: string) => boolean,
  togglePanel: (id: string) => void,
  addPanel: (id: string) => void,
};

type MappedProps = {
  togglePanel?: (id: string) => void,
  addPanel?: (id: string) => void,
  isDisabled?: boolean,
  isExpanded?: boolean,
  isFocused?: boolean,
};

type PropsInput = any;

type PropsOutput = $Shape<PropsInput & MappedProps>;

function withConsumer(
  Consumer: React.ComponentType<any>,
  mapValueToProps?: (value: ProviderValue, props: PropsInput) => PropsOutput,
): (React.ComponentType<PropsOutput>) => React.ComponentType<PropsInput> {
  return (WrappedComponent) => {
    function WithConsumer(props) {
      return (
        <Consumer>
          {(value: ProviderValue) => (
            <WrappedComponent
              {...props}
              {...(mapValueToProps ? mapValueToProps(value, props) : {})}
            />
          )}
        </Consumer>
      );
    }

    WithConsumer.displayName = `AccordionConsumer(${getDisplayName(WrappedComponent)})`;
    return WithConsumer;
  };
}

export default withConsumer;
