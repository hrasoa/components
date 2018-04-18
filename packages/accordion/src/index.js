// @flow
import React from 'react';
import BaseAccordion from './Accordion';
import BaseAccordionHeader from './AccordionHeader';
import BaseAccordionPanel from './AccordionPanel';
import withProvider from './withProvider';
import withConsumer from './withConsumer';

const { Provider, Consumer } = React.createContext();

const Accordion = withProvider(Provider)(BaseAccordion);

const AccordionHeader = withConsumer(Consumer, (value, ownProps: { controls: string }) => ({
  isExpanded: value.isExpanded(ownProps.controls),
  isDisabled: value.isDisabled(ownProps.controls),
  isFocused: value.isFocused(ownProps.controls),
  togglePanel: value.togglePanel,
}))(BaseAccordionHeader);

const AccordionPanel = withConsumer(Consumer, (value, ownProps: { id: string }) => ({
  addPanel: value.addPanel,
  isExpanded: value.isExpanded(ownProps.id),
}))(BaseAccordionPanel);

export {
  Accordion,
  AccordionHeader,
  AccordionPanel,
};
