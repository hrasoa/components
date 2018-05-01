// @flow
import React from 'react';

type Props = {
  handleKeyNavigation: (e: SyntheticKeyboardEventElement<HTMLElement>) => void,
  isTouched?: boolean,
  className?: ?string,
  touchedClass?: string,
};

const Accordion = (props: Props) => {
  const {
    handleKeyNavigation,
    className,
    isTouched,
    ...rest
  } = props;
  return (
    <dl
      role="presentation"
      className={getClassName(props)}
      onKeyDown={props.handleKeyNavigation}
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

function getClassName({ className, isTouched, touchedClass }): ?string {
  const name = [
    className || '',
    isTouched ? touchedClass : '',
  ].join(' ').trim();
  return name.length ? name : null;
}

export default Accordion;
