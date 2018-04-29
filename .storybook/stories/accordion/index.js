import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';
import Accordion from './Accordion';

storiesOf('Accordion', module)
  .addDecorator(checkA11y)
  .add('always single panel opened', () => <Accordion />)
  .add('allow toggle panel', () => <Accordion allowToggle />)
  .add('allow multi-selectable panel', () => <Accordion expandedIds={['panel-1']} />);
