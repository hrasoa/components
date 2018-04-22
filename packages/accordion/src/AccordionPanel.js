// @flow
import * as React from 'react';

type Props = {
  /** @private */
  children: string | React.Node,
  id: string,
  /** @private */
  addPanel: (id: string, ref: { current: null | HTMLElement }) => void,
  className?: string,
  expandedClass?: string,
  'aria-labelledby'?: string,
  role?: string,
  isExpanded?: boolean,
};

/** AccordionPanel descripiion */
class AccordionPanel extends React.Component<Props> {
  static defaultProps = {
    expandedClass: 'is-expanded',
  }

  constructor(props: Props) {
    super(props);
    this.props.addPanel(this.props.id, this.ref);
  }

  shouldComponentUpdate(nextProps: Props) {
    return this.props.isExpanded !== nextProps.isExpanded;
  }

  ref: { current: null | HTMLElement } = React.createRef();

  render() {
    const {
      className,
      expandedClass,
      isExpanded,
      addPanel,
      ...rest
    } = this.props;
    return (
      <dd
        className={getClassName(this.props)}
        ref={this.ref}
        {...rest}
      />
    );
  }
}

function getClassName({ className, expandedClass, isExpanded }): string | null {
  const name = `${className || ''}${isExpanded ? ` ${expandedClass || ''}` : ''}`;
  return name.length ? name.trim() : null;
}

export default AccordionPanel;
