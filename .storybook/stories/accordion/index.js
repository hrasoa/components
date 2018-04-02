import React from 'react';
import { storiesOf } from '@storybook/react';
import { AccordionTest } from '../../../packages/accordion';

storiesOf('Accordion', module)
  .add('always single panel opened', () => <AccordionTest />)
  .add('allow toggle panel', () => <AccordionTest allowToggle />)
  .add('allow multi-selectable panel', () => <AccordionTest allowMultiple />);
