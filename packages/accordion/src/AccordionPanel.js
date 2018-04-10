// @flow
import * as React from 'react';

type Props = {
  children: string | React.Node,
  id: string,
  addPanel: (id: string, ref: any) => void,
  className?: string,
  'aria-labelledby'?: string,
  role?: string,
  isExpanded?: boolean,
};

class AccordionPanel extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.props.addPanel(this.props.id, this.ref);
  }

  shouldComponentUpdate(nextProps: Props) {
    return this.props.isExpanded !== nextProps.isExpanded;
  }

  ref: React.Ref<'dd'> = React.createRef();

  render() {
    return (
      <dd
        id={this.props.id}
        className={this.props.className}
        arial-labelledby={this.props['aria-labelledby']}
        ref={this.ref}
        hidden={!this.props.isExpanded}
        role={this.props.role}
      >
        {this.props.children}
      </dd>
    );
  }
}

export default AccordionPanel;
