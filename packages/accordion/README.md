# @hrasoa/accordion
> Accordion


## Installation

```bash
$ npm install @hrasoa/accordion --save
$ yarn add @hrasoa/accordion
```

## General usage
```jsx
import {
  Accordion,
  AccordionHeader,
  AccordionPanel,
} from '@hrasoa/accordion';

<Accordion>
  <AccordionHeader
    controls="panel"
  >
    Header
  </AccordionHeader>
  <AccordionPanel
    id="panel"
  >
    Panel
  </AccordionPanel>
</Accordion>
```


## Api
### `<Accordion>`
Accordion descripiion
Props

**children** (required)

**className** 

**handleKeyNavigation** (required)

### `<AccordionHeader>`
AccordionHeader descripiion
Props

**aria-level** 

**children** (required)

**className** 

**controls** (required)

**id** 

**isDisabled** 

**isExpanded** 

**isFocused** 

**togglePanel** (required)

### `<AccordionPanel>`
AccordionPanel descripiion
Props

**addPanel** (required)

**aria-labelledby** 

**children** (required)

**className** 

**id** (required)

**isExpanded** 

**role** 

