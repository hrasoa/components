// @flow
import * as React from 'react';

type Props = {
  children: string | React.Node,
  handleKeyNavigation: (e: SyntheticKeyboardEventElement<HTMLElement>) => void,
  className?: ?string,
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

Accordion.defaultProps = {
  className: null,
};

export default Accordion;
