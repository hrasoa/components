// @flow
import * as React from 'react';

type Props = {
  children: string | React.Node,
  controls: string,
  togglePanel: (panelId: string) => void,
  id?: string,
  className?: string,
  'aria-level'?: string,
  isDisabled?: boolean,
  isExpanded?: boolean,
  isFocused?: boolean,
};

/** AccordionHeader descripiion */
class AccordionHeader extends React.Component<Props> {
  static defaultProps = {
    'aria-level': '3',
  }

  componentDidUpdate() {
    if (this.props.isFocused) {
      this.ref.current.focus();
    }
  }

  onTogglePanel = (): void => {
    this.props.togglePanel(this.props.controls);
  }

  onTogglePanel: Function;

  ref: React.Ref<'button'> = React.createRef();

  render() {
    return (
      <dt
        aria-level={this.props['aria-level']}
        role="heading"
      >
        <button
          id={this.props.id}
          className={this.props.className}
          aria-controls={this.props.controls}
          aria-disabled={this.props.isDisabled}
          aria-expanded={this.props.isExpanded}
          type="button"
          ref={this.ref}
          onClick={this.onTogglePanel}
        >
          {this.props.children}
        </button>
      </dt>
    );
  }
}

export default AccordionHeader;
