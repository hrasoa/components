// @flow
import React from 'react';

type Props = {
  className?: ?string,
  handleKeyNavigation: $PropertyType<ProviderValue, 'handleKeyNavigation'>,
  isTouched?: $PropertyType<ProviderValue, 'isTouched'>,
  touchedClass?: string,
};

const Accordion = (props: Props) => {
  const {
    handleKeyNavigation,
    className,
    isTouched,
    touchedClass,
    ...rest
  } = props;
  return (
    <dl
      role="presentation"
      className={getClassName(className, isTouched, touchedClass)}
      onKeyDown={handleKeyNavigation}
      {...rest}
    />
  );
};

Accordion.defaultProps = {
  className: null,
  isTouched: false,
  touchedClass: 'is-touched',
};

Accordion.displayName = 'Accordion';

function getClassName(className, isTouched, touchedClass): ?string {
  const name = [
    className || '',
    isTouched ? touchedClass : '',
  ].join(' ').trim();
  return name.length ? name : null;
}

export default Accordion;
