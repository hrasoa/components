// @flow
import * as React from 'react';
import getDisplayName from '@hrasoa/components-utils/getDisplayName';

type Props = {
  children: string | React.Node,
  id: string,
  controls: string,
  className?: ?string,
  'aria-level'?: string,
  'aria-labelledby'?: string,
  role?: ?string,
  isExpanded?: boolean,
};

type ProviderValue = {
  isDisabled: (id: string) => boolean,
  isExpanded: (id: string) => boolean,
  isFocused: (id: string) => boolean,
  togglePanel: (id: string) => void,
  addPanel: (id: string) => void,
};

type MappedProps = {
  togglePanel: (id: string) => void,
  addPanel: (id: string) => void,
  isDisabled?: boolean,
  isExpanded?: boolean,
  isFocused?: boolean,
};

function withConsumer(
  Consumer: React.ComponentType<any>,
  mapValueToProps?: (value: ProviderValue, props: Props) => $Shape<MappedProps>,
): (React.ComponentType<$Shape<Props & MappedProps>>) => React.ComponentType<$Shape<Props>> {
  return (WrappedComponent) => {
    function WithConsumer(props) {
      const mappedProps = mapValueToProps || defaultMapValueToProps;
      return (
        <Consumer>
          {(value: ProviderValue) => (
            <WrappedComponent
              {...props}
              {...mappedProps(value, props)}
            />
          )}
        </Consumer>
      );
    }

    WithConsumer.displayName = `AccordionConsumer(${getDisplayName(WrappedComponent)})`;
    return WithConsumer;
  };
}

function defaultMapValueToProps(value, props) {
  const id: string = props.controls || props.id;
  return {
    isExpanded: value.isExpanded(id),
    isDisabled: value.isDisabled(id),
    isFocused: value.isFocused(id),
    togglePanel: value.togglePanel,
  };
}

export default withConsumer;
