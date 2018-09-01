import React, { Fragment } from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';
import Icon from '@material-ui/icons/KeyboardArrowDown';
import Accordion from './Accordion';

storiesOf('Accordion', module)
  .addDecorator(checkA11y)
  .add('Minimal', () => <Accordion />)
  .add('Allow toggle', () => <Accordion allowToggle />)
  .add('Allow multiple', () => <Accordion allowMultiple onChange={console.log} />)
  .add('Nested', () => (
    <Accordion
      renderPanel={i => (
        <Fragment>
          <p>Nested accordion:</p>
          <Accordion
            id={`nested-${i}`}
            renderHeader={idx => `Nested header ${idx}`}
            allowMultiple
          />
        </Fragment>
      )}
    />
  ));
