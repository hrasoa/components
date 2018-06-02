import React, { Fragment } from 'react';
import { setAddon, storiesOf } from '@storybook/react';
import { checkA11y } from '@storybook/addon-a11y';
import Icon from '@material-ui/icons/KeyboardArrowDown';
import JSXAddon from 'storybook-addon-jsx';
import Accordion from './Accordion';

setAddon(JSXAddon);

storiesOf('Accordion', module)
  .addDecorator(checkA11y)
  .addWithJSX('Minimal', () => <Accordion />)
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
  ))
  .add('Styled', () => (
    <Accordion
      className="accordion-styled"
      renderHeader={id => <Fragment>Header {id} <Icon /></Fragment>}
    />
  ));
