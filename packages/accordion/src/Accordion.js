// @flow
import React from 'react';

type Props = {
  handleKeyNavigation: (e: SyntheticKeyboardEventElement<HTMLElement>) => void,
};

const Accordion = (props: Props) => {
  const {
    handleKeyNavigation,
    ...rest
  } = props;
  return (
    <dl
      role="presentation"
      onKeyDown={props.handleKeyNavigation}
      {...rest}
    />
  );
};

export default Accordion;
