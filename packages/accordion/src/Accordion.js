// @flow
import React from 'react';

type Props = {
  handleKeyNavigation: (e: SyntheticKeyboardEventElement<HTMLElement>) => void,
  isTouched?: boolean,
  className?: ?string,
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
      className={getClassName(className, isTouched)}
      onKeyDown={props.handleKeyNavigation}
      {...rest}
    />
  );
};

Accordion.defaultProps = {
  className: null,
  isTouched: false,
};

Accordion.displayName = 'Accordion';

function getClassName(className, isTouched): ?string {
  const name = [
    className || '',
    isTouched ? 'is-touched' : '',
  ].join(' ').trim();
  return name.length ? name : null;
}

export default Accordion;
