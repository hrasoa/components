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

**Props**

**`className`** 

Component class

type: string

default value: `null`

### `<AccordionHeader>`

AccordionHeader descripiion

**Props**

**`aria-level`** 

type: string

default value: `'3'`

**`className`** 

type: string

**`controls`** :exclamation:(required)

type: string

**`id`** 

type: string

### `<AccordionPanel>`

AccordionPanel descripiion

**Props**

**`aria-labelledby`** 

type: string

**`className`** 

type: string

**`expandedClass`** 

type: string

default value: `'is-expanded'`

**`id`** :exclamation:(required)

type: string

**`isExpanded`** 

type: boolean

**`role`** 

type: string
