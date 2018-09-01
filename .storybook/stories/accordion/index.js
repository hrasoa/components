import React, { Fragment } from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { checkA11y } from '@storybook/addon-a11y';
import Icon from '@material-ui/icons/KeyboardArrowDown';
import Accordion from './Accordion';

storiesOf('Accordion', module)
  .addDecorator(checkA11y)
  .add('Minimal', () => <Accordion />)
  .add('Second panel opened by default', () => <Accordion expandedIds={['panel-1']} />)
  .add('onChange callback', () => <Accordion onChange={action('onChange(prevState, state, panels)')} />)
  .add('Allow toggle', () => <Accordion allowToggle />)
  .add('Allow multiple', () => <Accordion allowMultiple />)
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
