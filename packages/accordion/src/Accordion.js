// @flow
import * as React from 'react';

type Props = {
  /** @private */
  children: string | React.Node,
  /** @private */
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
