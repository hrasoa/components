import { configure } from '@storybook/react';

function loadStories() {
  require('./stories/accordion/index');
}

configure(loadStories, module);
