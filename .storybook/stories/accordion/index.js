import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';
import Accordion from './Accordion';

storiesOf('Accordion', module)
  .addDecorator(checkA11y)
  .add('always single panel opened', () => <Accordion onChange={console.log} />)
  .add('allow toggle panel', () => <Accordion allowToggle />)
  .add('allow multi-selectable panel', () => <Accordion allowMultiple onChange={console.log} />);
