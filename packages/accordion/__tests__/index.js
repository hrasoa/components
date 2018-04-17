// @flow
import * as React from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionPanel,
} from '../src';

type Props = {
  renderHeader?: (i: number) => string | React.Node,
  className?: string,
  allowTogle?: boolean,
  allowMultiple?: boolean,
  expandedIds?: Array<string>,
};

const getItems = (expandedIds, renderHeader) => {
  let items = [];
  for (let i = 0; i <= 2; i += 1) {
    items = [
      ...items,
      <AccordionHeader
        key={`header-${i}`}
        id={`header-${i}`}
        controls={`panel-${i}`}
      >
        {renderHeader && renderHeader(i)}
      </AccordionHeader>,
      <AccordionPanel
        key={`panel-${i}`}
        id={`panel-${i}`}
        isExpanded={expandedIds && expandedIds.indexOf(i) >= 0}
      >
        <ul>
          <li><input /></li>
          <li><input /></li>
        </ul>
      </AccordionPanel>,
    ];
  }
  return items;
};

const AccordionTest = ({ expandedIds, renderHeader, ...props }: Props) => (
  <Accordion {...props}>
    {getItems(expandedIds, renderHeader)}
  </Accordion>
);

AccordionTest.defaultProps = {
  className: null,
  allowMultiple: false,
  allowTogle: false,
  expandedIds: null,
  renderHeader: i => `Header ${i + 1}`,
};

export default AccordionTest;
