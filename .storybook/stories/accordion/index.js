import React from 'react';
import { storiesOf } from '@storybook/react';
import Accordion from './Accordion';

storiesOf('Accordion', module)
  .add('always single panel opened', () => <Accordion />)
  .add('allow toggle panel', () => <Accordion allowToggle />)
  .add('allow multi-selectable panel', () => <Accordion allowMultiple />);
