// @flow
import React from 'react';
import type { Node } from 'react';
import {
  AccordionProvider,
  Accordion,
  AccordionHeader,
  AccordionPanel,
} from '../../../packages/accordion/src';
import './style.scss';

type Props = {
  renderHeader?: (i: number) => string | Node,
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
        expanded={!!(expandedIds && expandedIds.indexOf(`panel-${i}`) >= 0)}
      >
        <ul>
          <li><label htmlFor={`input-${i}-0`}>Label <input id={`input-${i}-0`} /></label></li>
          <li><label htmlFor={`input-${i}-1`}>Label <input id={`input-${i}-1`} /></label></li>
        </ul>
      </AccordionPanel>,
    ];
  }
  return items;
};

const AccordionTest = ({ expandedIds, renderHeader, ...props }: Props) => (
  <AccordionProvider {...props}>
    <Accordion className="accordion">
      {getItems(expandedIds, renderHeader)}
    </Accordion>
  </AccordionProvider>
);

AccordionTest.defaultProps = {
  className: null,
  allowMultiple: false,
  allowTogle: false,
  expandedIds: null,
  renderHeader: i => `Header ${i + 1}`,
};

export default AccordionTest;
