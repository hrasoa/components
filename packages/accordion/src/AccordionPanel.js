// @flow
import React, { Component } from 'react';
import disabled from 'ally.js/esm/maintain/disabled';

type Props = {
  id: string,
  expandedClass?: string,
  expanded?: boolean,
  addPanel: (
    id: string,
    ref: { current: null | HTMLElement },
    isInitiallyExpanded: ?boolean,
  ) => void,
  className?: ?string,
  isExpanded?: boolean,
};

class AccordionPanel extends Component<Props> {
  static defaultProps = {
    expandedClass: 'is-expanded',
  }

  constructor(props: Props) {
    super(props);
    this.handleInnert = null;
    this.props.addPanel(this.props.id, this.ref, this.props.expanded);
  }

  componentDidMount() {
    this.handleInnert = this.props.isExpanded ? null : disabled({
      context: this.ref.current,
    });
  }

  shouldComponentUpdate(nextProps: Props) {
    return this.props.isExpanded !== nextProps.isExpanded;
  }

  componentDidUpdate() {
    if (this.props.isExpanded && this.handleInnert) {
      this.handleInnert.disengage();
    } else {
      this.handleInnert = disabled({
        context: this.ref.current,
      });
    }
  }

  componentWillUnmount() {
    this.handleInnert = null;
  }

  handleInnert: null | { disengage: Function };

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

function getClassName({ className, expandedClass, isExpanded }): ?string {
  const name = [
    className || '',
    isExpanded ? expandedClass : '',
  ].join(' ').trim();
  return name.length ? name : null;
}

export default AccordionPanel;
