// @flow
import React, { Component } from 'react';

type Props = {
  id: string,
  expandedClass?: string,
  expanded?: boolean,
  addPanel: (
    id: string,
    ref: { current: null | HTMLElement },
    isInitiallyExpanded: ?boolean,
  ) => void,
  className?: string,
  isExpanded?: boolean,
};

class AccordionPanel extends Component<Props> {
  static defaultProps = {
    expandedClass: 'is-expanded',
  }

  constructor(props: Props) {
    super(props);
    this.props.addPanel(this.props.id, this.ref, this.props.expanded);
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
      expanded,
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
