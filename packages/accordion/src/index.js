// @flow
import BaseAccordion from './Accordion';
import BaseAccordionHeader from './AccordionHeader';
import BaseAccordionPanel from './AccordionPanel';
import AccordionProvider, { Consumer } from './AccordionProvider';
import withConsumer from './withConsumer';
import withProvider from './withProvider';

const withAccordionConsumer = withConsumer.bind(null, Consumer);
const withAccordionProvider = withProvider.bind(null, AccordionProvider);

const Accordion = withAccordionProvider()(withAccordionConsumer(
  ({ handleKeyNavigation, isTouched }) => ({
    handleKeyNavigation,
    isTouched,
  }),
)(BaseAccordion));

const AccordionHeader = withAccordionConsumer(
  (providerValue, { controls }: { controls: string }) => ({
    isDisabled: providerValue.isDisabled(controls),
    isExpanded: providerValue.isExpanded(controls),
    isFocused: providerValue.isFocused(controls),
    togglePanel: providerValue.togglePanel,
  }),
)(BaseAccordionHeader);

const AccordionPanel = withAccordionConsumer(
  (providerValue, ownProps: { id: string }) => ({
    addPanel: providerValue.addPanel,
    disableInnert: providerValue.disableInnert,
    isExpanded: providerValue.isExpanded(ownProps.id),
  }),
)(BaseAccordionPanel);

export {
  Accordion,
  AccordionProvider,
  AccordionHeader,
  AccordionPanel,
  withAccordionConsumer,
};
