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
  isDisabled: providerValue.isDisabled(controls),
  isExpanded: providerValue.isExpanded(controls),
  isFocused: providerValue.isFocused(controls),
  togglePanel: providerValue.togglePanel,
}))(BaseAccordionHeader);

const AccordionPanel = withAccordion(({ addPanel, isExpanded }, ownProps: { id: string }) => ({
  addPanel,
  isExpanded: isExpanded(ownProps.id),
}))(BaseAccordionPanel);

export {
  Accordion,
  AccordionProvider,
  AccordionHeader,
  AccordionPanel,
  withAccordion,
};
