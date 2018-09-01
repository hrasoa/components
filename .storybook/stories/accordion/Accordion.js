// @flow
import React from 'react';
import type { Node } from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionPanel,
} from '../../../packages/accordion/src';
import './style.scss';

type Props = {
  renderHeader?: (i: number, id: string) => string | Node,
  renderPanel?: (i: number, id: string) => string | Node,
  className?: string,
  allowToggle?: boolean,
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
        {renderHeader && renderHeader(i, id)}
      </AccordionHeader>,
      <AccordionPanel
        key={`${id}-panel-${i}`}
        id={`${id}-panel-${i}`}
        expanded={!!(expandedIds && expandedIds.indexOf(`panel-${i}`) >= 0)}
      >
        {renderPanel && renderPanel(i, id)}
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
  className,
  ...props
}: Props) => (
  <Accordion
    className={className}
    {...props}
  >
    {getItems(id, expandedIds, renderHeader, renderPanel)}
  </Accordion>
);

AccordionMinimal.defaultProps = {
  allowMultiple: false,
  allowToggle: false,
  className: 'accordion',
  expandedIds: null,
  id: 'minimal',
  renderHeader: (i: number): string => `Header ${i + 1}`,
  renderPanel: (i: number, id: string): Node => (
    <ul>
      <li>
        <label htmlFor={`${id}-input-${i}-0`}>
          Label <input id={`${id}-input-${i}-0`} />
        </label>
      </li>
      <li>
        <label htmlFor={`${id}-input-${i}-1`}>
          Label <input id={`${id}-input-${i}-1`} />
        </label>
      </li>
    </ul>
  ),
};

export default AccordionMinimal;
