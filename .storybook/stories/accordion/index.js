import React from 'react';
import { storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';
import Accordion from './Accordion';

storiesOf('Accordion', module)
  .addDecorator(checkA11y)
  .add('Minimal', () => <Accordion />)
  .add('Allow toggle', () => <Accordion allowToggle />)
  .add('Allow multi-selectable', () => <Accordion allowMultiple />)
  .add('Nested', () => (
    <Accordion
      renderPanel={i => (
        <div>
          <p>Nested accordion:</p>
          <Accordion
            id={`nested-${i}`}
            renderHeader={idx => `Nested header ${idx}`}
            allowMultiple
          />
        </div>
      )}
    />
  ));
