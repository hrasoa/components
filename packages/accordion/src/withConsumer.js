// @flow
import React from 'react';
import type { ComponentType } from 'react';
import { getDisplayName } from '@hrasoa/components-utils';

type PropsInput = any;

type PropsOutput = any;

function withConsumer(
  Consumer: ComponentType<any>,
  mapValueToProps?: (value: ProviderValue, ownProps: PropsInput) => PropsOutput,
): (ComponentType<PropsOutput>) => ComponentType<PropsInput> {
  return (WrappedComponent) => {
    function WithConsumer(ownProps: {}) {
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

    WithConsumer.displayName = `withAccordionConsumer(${getDisplayName(WrappedComponent)})`;
    return WithConsumer;
  };
}

export default withConsumer;
