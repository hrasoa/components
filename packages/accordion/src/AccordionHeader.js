// @flow
import React, { Component } from 'react';

type Props = {
  controls: string,
  togglePanel: (panelId: string) => void,
  'aria-level'?: string,
  isDisabled?: boolean,
  isExpanded?: boolean,
  isFocused?: boolean,
};

class AccordionHeader extends Component<Props> {
  static defaultProps = {
    'aria-level': '3',
  }

  componentDidUpdate() {
    if (this.props.isFocused && this.ref.current) {
      this.ref.current.focus();
    }
  }

  handleTogglePanel = (): void => {
    this.props.togglePanel(this.props.controls);
  }

  ref: { current: null | HTMLButtonElement } = React.createRef();

  render() {
    const {
      controls,
      isDisabled,
      isExpanded,
      isFocused,
      togglePanel,
      'aria-level': ariaLevel,
      ...rest
    } = this.props;
    return (
      <dt
        aria-level={ariaLevel}
        role="heading"
      >
        <button
          aria-controls={controls}
          aria-disabled={isDisabled}
          aria-expanded={isExpanded}
          type="button"
          ref={this.ref}
          onClick={this.handleTogglePanel}
          {...rest}
        />
      </dt>
    );
  }
}

export default AccordionHeader;
