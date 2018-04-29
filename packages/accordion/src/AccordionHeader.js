// @flow
import * as React from 'react';

type Props = {
  /** @public */
  controls: string,
  children: string | React.Node,
  togglePanel: (panelId: string) => void,
  'aria-level'?: string,
  isDisabled?: boolean,
  isExpanded?: boolean,
  isFocused?: boolean,
};

class AccordionHeader extends React.Component<Props> {
  static defaultProps = {
    'aria-level': '3',
  }

  componentDidUpdate() {
    if (this.props.isFocused && this.ref.current) {
      this.ref.current.focus();
    }
  }

  onTogglePanel = (): void => {
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
          onClick={this.onTogglePanel}
          {...rest}
        />
      </dt>
    );
  }
}

export default AccordionHeader;
