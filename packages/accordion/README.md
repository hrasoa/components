# @hrasoa/accordion

Accordion

## Installation

```bash
$ npm install @hrasoa/accordion --save
$ yarn add @hrasoa/accordion
```

## General usage

```jsx
import {
  AccordionProvider,
  Accordion,
  AccordionHeader,
  AccordionPanel,
} from '@hrasoa/accordion';

<AccordionProvider>
  <Accordion>
    <AccordionHeader
      controls="panel-0"
    >
      Header
    </AccordionHeader>
    <AccordionPanel
      id="panel-0"
    >
      Panel
    </AccordionPanel>
  </Accordion>
</AccordionProvider>
```


## Api

### `<AccordionProvider>`



**Props**



### `<undefined>`



**Props**



### `<AccordionHeader>`



**Props**



### `<AccordionPanel>`



**Props**


