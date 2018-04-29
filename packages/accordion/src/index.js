// @flow
import BaseAccordion from './Accordion';
import BaseAccordionHeader from './AccordionHeader';
import BaseAccordionPanel from './AccordionPanel';
import AccordionProvider, { Consumer } from './AccordionProvider';
import withAccordion from './withAccordion';

const Accordion = withAccordion(Consumer, value => ({
  handleKeyNavigation: value.handleKeyNavigation,
}))(BaseAccordion);

const AccordionHeader = withAccordion(Consumer, (value, ownProps: { controls: string }) => ({
  isExpanded: value.isExpanded(ownProps.controls),
  isDisabled: value.isDisabled(ownProps.controls),
  isFocused: value.isFocused(ownProps.controls),
  togglePanel: value.togglePanel,
}))(BaseAccordionHeader);

const AccordionPanel = withAccordion(Consumer, (value, ownProps: { id: string }) => ({
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
