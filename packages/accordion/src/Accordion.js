// @flow
import React from 'react';

type Props = {
  handleKeyNavigation: (e: SyntheticKeyboardEventElement<HTMLElement>) => void,
  isInteractive?: boolean,
  className?: ?string,
};

const Accordion = (props: Props) => {
  const {
    handleKeyNavigation,
    className,
    isInteractive,
    ...rest
  } = props;
  return (
    <dl
      role="presentation"
      className={getClassName(className, isInteractive)}
      onKeyDown={props.handleKeyNavigation}
      {...rest}
    />
  );
};

Accordion.defaultProps = {
  className: null,
  isInteractive: false,
};

Accordion.displayName = 'Accordion';

function getClassName(className, isInteractive): ?string {
  const name = [
    className || '',
    isInteractive ? 'is-interactive' : '',
  ].join(' ').trim();
  return name.length ? name : null;
}

export default Accordion;
