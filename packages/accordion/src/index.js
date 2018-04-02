// @flow
import React from 'react';
import BaseAccordion from './Accordion';
import BaseAccordionHeader from './AccordionHeader';
import BaseAccordionPanel from './AccordionPanel';
import withProvider from './withProvider';
import withConsumer from './withConsumer';
import AccordionTest from '../__tests__';

const { Provider, Consumer } = React.createContext();

const Accordion = withProvider(Provider)(BaseAccordion);

const AccordionHeader = withConsumer(Consumer)(BaseAccordionHeader);

const AccordionPanel = withConsumer(Consumer, (value, props) => ({
  addPanel: value.addPanel,
  isExpanded: value.isExpanded(props.id),
}))(BaseAccordionPanel);

export {
  Accordion,
  AccordionHeader,
  AccordionPanel,
  AccordionTest,
};
