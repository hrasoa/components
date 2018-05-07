// @flow
import React, { Component } from 'react';

type Props = {
  'aria-level'?: string,
  controls: string,
  isDisabled?: boolean,
  isExpanded?: boolean,
  isFocused?: boolean,
  togglePanel: $PropertyType<ProviderValue, 'togglePanel'>,
};

class AccordionHeader extends Component<Props> {
  static defaultProps = {
    'aria-level': '3',
  }

  constructor(props: Props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidUpdate() {
    if (this.props.isFocused && this.ref.current) {
      this.ref.current.focus();
    }
  }

  handleTogglePanel = (): void => {
    this.props.togglePanel(this.props.controls);
  }

  ref: HTMLRef<HTMLButtonElement>;

  render() {
    const {
      'aria-level': ariaLevel,
      controls,
      isDisabled,
      isExpanded,
      isFocused,
      togglePanel,
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
