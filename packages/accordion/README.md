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

**Props**

`className` 

Component class

type: string

default value: `null`

### `<AccordionHeader>`

AccordionHeader descripiion

**Props**

`aria-level` 

type: string

default value: `'3'`

`children` (required)

type: string | React.Node

`className` 

type: string

`controls` (required)

type: string

`id` 

type: string

`isDisabled` 

type: boolean

`isExpanded` 

type: boolean

`isFocused` 

type: boolean

`togglePanel` (required)

type: function (panelId: string) => void

### `<AccordionPanel>`

AccordionPanel descripiion

**Props**

`addPanel` (required)

type: function (id: string, ref: any) => void

`aria-labelledby` 

type: string

`children` (required)

type: string | React.Node

`className` 

type: string

`id` (required)

type: string

`isExpanded` 

type: boolean

`role` 

type: string
