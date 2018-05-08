// @flow
import * as React from 'react';
import {
  Accordion,
  AccordionProvider,
  AccordionHeader,
  AccordionPanel,
} from '../src';

type Props = {
  allowTogle?: boolean,
  allowMultiple?: boolean,
  className?: string,
  expandedIds?: Array<string>,
  renderHeader?: (i: number) => string | React.Node,
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
  <AccordionProvider {...props}>
    <Accordion>
      {getItems(expandedIds, renderHeader)}
    </Accordion>
  </AccordionProvider>
);

AccordionTest.defaultProps = {
  allowMultiple: false,
  allowTogle: false,
  className: null,
  expandedIds: null,
  renderHeader: i => `Header ${i + 1}`,
};

export default AccordionTest;
