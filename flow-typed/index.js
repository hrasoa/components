/**
 * SyntheticKeyboardEventElement
 * https://github.com/facebook/flow/issues/218
 */
declare type SyntheticKeyboardEventElement<E> = {
  target: E
} & SyntheticKeyboardEvent<EventTarget>;
