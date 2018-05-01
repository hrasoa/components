// @flow
import BaseAccordion from './Accordion';
import BaseAccordionHeader from './AccordionHeader';
import BaseAccordionPanel from './AccordionPanel';
import AccordionProvider, { Consumer } from './AccordionProvider';
import withConsumer from './withConsumer';

const withAccordion = withConsumer.bind(null, Consumer);

const Accordion = withAccordion(({ handleKeyNavigation, isTouched }) => ({
  handleKeyNavigation,
  isTouched,
}))(BaseAccordion);

const AccordionHeader = withAccordion((providerValue, { controls }: { controls: string }) => ({
  togglePanel: providerValue.togglePanel,
  isExpanded: providerValue.isExpanded(controls),
  isDisabled: providerValue.isDisabled(controls),
  isFocused: providerValue.isFocused(controls),
}))(BaseAccordionHeader);

const AccordionPanel = withAccordion((providerValue, { id }: { id: string }) => ({
  addPanel: providerValue.addPanel,
  isExpanded: providerValue.isExpanded(id),
}))(BaseAccordionPanel);

export {
  AccordionProvider,
  Accordion,
  AccordionHeader,
  AccordionPanel,
  withAccordion,
};
