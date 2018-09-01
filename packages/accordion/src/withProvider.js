// @flow
import React from 'react';
import type { ComponentType } from 'react';
import { getDisplayName } from '@hrasoa/components-utils';

type PropsInput = any;

type PropsOutput = any;

function withProvider(
  Provider: ComponentType<any>,
): (ComponentType<PropsOutput>) => ComponentType<PropsInput> {
  return (WrappedComponent) => {
    function WithProvider(ownProps: {
      disableInnert: boolean,
      allowMultiple: boolean,
      allowToggle: boolean,
      onChange: Function
    }) {
      const {
        disableInnert,
        allowMultiple,
        allowToggle,
        onChange,
        ...rest
      } = ownProps;
      return (
        <Provider
          disableInnert={disableInnert}
          allowMultiple={allowMultiple}
          allowToggle={allowToggle}
          onChange={onChange}
        >
          <WrappedComponent
            {...rest}
          />
        </Provider>
      );
    }

    WithProvider.displayName = `withAccordionProvider(${getDisplayName(WrappedComponent)})`;
    return WithProvider;
  };
}

export default withProvider;
