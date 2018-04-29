// @flow
import BaseAccordion from './Accordion';
import BaseAccordionHeader from './AccordionHeader';
import BaseAccordionPanel from './AccordionPanel';
import AccordionProvider, { Consumer } from './AccordionProvider';
import withConsumer from './withConsumer';

const withAccordion = withConsumer.bind(null, Consumer);

const Accordion = withAccordion(value => ({
  handleKeyNavigation: value.handleKeyNavigation,
}))(BaseAccordion);

const AccordionHeader = withAccordion((value, ownProps: { controls: string }) => ({
  isExpanded: value.isExpanded(ownProps.controls),
  isDisabled: value.isDisabled(ownProps.controls),
  isFocused: value.isFocused(ownProps.controls),
  togglePanel: value.togglePanel,
}))(BaseAccordionHeader);

const AccordionPanel = withAccordion((value, ownProps: { id: string }) => ({
  addPanel: value.addPanel,
  isExpanded: value.isExpanded(ownProps.id),
}))(BaseAccordionPanel);

export {
  AccordionProvider,
  Accordion,
  AccordionHeader,
  AccordionPanel,
  withAccordion,
};
