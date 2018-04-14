// @flow
import * as React from 'react';

type Props = {
  children: string | React.Node,
  handleKeyNavigation: (e: SyntheticKeyboardEventElement<HTMLElement>) => void,
  className?: ?string,
};

/** Accordion descripiion */
const Accordion = (props: Props) => (
  <dl
    className={props.className}
    role="presentation"
    onKeyDown={props.handleKeyNavigation}
  >
    {props.children}
  </dl>
);

Accordion.defaultProps = {
  className: null,
};

export default Accordion;
