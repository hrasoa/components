// @flow
import React, { Component } from 'react';
import disabled from 'ally.js/maintain/disabled';

type Props = {
  id: string,
  expandedClass?: string,
  expanded?: boolean,
  addPanel: (
    id: string,
    ref: PanelRef,
    isInitiallyExpanded: ?boolean,
  ) => void,
  className?: ?string,
  isExpanded?: boolean,
  disableInnert?: boolean,
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
    if (this.ref.current && !this.props.disableInnert) {
      this.handleInnert = this.props.isExpanded ? null : disabled({
        context: this.ref.current,
      });
    }
  }

  shouldComponentUpdate(nextProps: Props) {
    return this.props.isExpanded !== nextProps.isExpanded;
  }

  componentDidUpdate() {
    if (this.props.disableInnert) return;

    if (this.props.isExpanded && this.handleInnert) {
      this.handleInnert.disengage();
    } else if (this.ref.current) {
      this.handleInnert = disabled({
        context: this.ref.current,
      });
    }
  }

  componentWillUnmount() {
    if (this.handleInnert) {
      this.handleInnert.disengage();
      this.handleInnert = null;
    }
  }

  handleInnert: null | { disengage: () => void };

  ref: PanelRef = React.createRef();

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
        className={getClassName(className, expandedClass, isExpanded)}
        ref={this.ref}
        {...rest}
      />
    );
  }
}

function getClassName(className, expandedClass, isExpanded): ?string {
  const name = [
    className || '',
    isExpanded ? expandedClass : '',
  ].join(' ').trim();
  return name.length ? name : null;
}

export default AccordionPanel;
