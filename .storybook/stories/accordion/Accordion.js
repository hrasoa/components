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
  renderPanel?: (i: number) => string | Node,
  className?: string,
  allowTogle?: boolean,
  allowMultiple?: boolean,
  expandedIds?: Array<string>,
  id?: string,
};

const getItems = (id = 'minimal', expandedIds, renderHeader, renderPanel) => {
  let items = [];
  for (let i = 0; i <= 2; i += 1) {
    items = [
      ...items,
      <AccordionHeader
        key={`${id}-header-${i}`}
        id={`${id}-header-${i}`}
        controls={`${id}-panel-${i}`}
      >
        {renderHeader && renderHeader(i)}
      </AccordionHeader>,
      <AccordionPanel
        key={`${id}-panel-${i}`}
        id={`${id}-panel-${i}`}
        expanded={!!(expandedIds && expandedIds.indexOf(`panel-${i}`) >= 0)}
      >
        {renderPanel && renderPanel(i)}
      </AccordionPanel>,
    ];
  }
  return items;
};

const AccordionMinimal = ({
  id,
  expandedIds,
  renderHeader,
  renderPanel,
  ...props
}: Props) => (
  <AccordionProvider
    {...props}
  >
    <Accordion
      className="accordion"
    >
      {getItems(id, expandedIds, renderHeader, renderPanel)}
    </Accordion>
  </AccordionProvider>
);

AccordionMinimal.defaultProps = {
  className: null,
  allowMultiple: false,
  allowTogle: false,
  expandedIds: null,
  renderHeader: (i: number): string => `Header ${i + 1}`,
  renderPanel: (i: number): Node => (
    <ul>
      <li>
        <label htmlFor={`input-${i}-0`}>
          Label <input id={`input-${i}-0`} />
        </label>
      </li>
      <li>
        <label htmlFor={`input-${i}-1`}>
          Label <input id={`input-${i}-1`} />
        </label>
      </li>
    </ul>
  ),
  id: 'minimal',
};

export default AccordionMinimal;
