// @flow
import * as React from 'react';

type Props = {
  /** @private */
  children: string | React.Node,
  controls: string,
  /** @private */
  togglePanel: (panelId: string) => void,
  id?: string,
  className?: string,
  'aria-level'?: string,
  /** @private */
  isDisabled?: boolean,
  /** @private */
  isExpanded?: boolean,
  /** @private */
  isFocused?: boolean,
};

/** AccordionHeader descripiion */
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

  onTogglePanel: Function;

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
