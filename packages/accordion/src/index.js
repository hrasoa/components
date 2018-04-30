// @flow
import BaseAccordion from './Accordion';
import BaseAccordionHeader from './AccordionHeader';
import BaseAccordionPanel from './AccordionPanel';
import AccordionProvider, { Consumer } from './AccordionProvider';
import withConsumer from './withConsumer';

const withAccordion = withConsumer.bind(null, Consumer);

const Accordion = withAccordion(({ handleKeyNavigation }) => ({
  handleKeyNavigation,
}))(BaseAccordion);

const AccordionHeader = withAccordion((value, { controls }: { controls: string }) => ({
  togglePanel: value.togglePanel,
  isExpanded: value.isExpanded(controls),
  isDisabled: value.isDisabled(controls),
  isFocused: value.isFocused(controls),
}))(BaseAccordionHeader);

const AccordionPanel = withAccordion((value, { id }: { id: string }) => ({
  addPanel: value.addPanel,
  isExpanded: value.isExpanded(id),
}))(BaseAccordionPanel);

export {
  AccordionProvider,
  Accordion,
  AccordionHeader,
  AccordionPanel,
  withAccordion,
};
