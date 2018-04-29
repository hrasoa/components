// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import AccordionPanel from '../src/AccordionPanel';

const mockAddPanel = jest.fn();

beforeEach(() => {
  mockAddPanel.mockClear();
});

describe('AccordionPanel', () => {
  test('initial', () => {
    const component = renderer.create(
      <AccordionPanel
        id="panel-1"
        addPanel={mockAddPanel}
      >
        Panel 1
      </AccordionPanel>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('is expanded', () => {
    const component = renderer.create(
      <AccordionPanel
        id="panel-1"
        className="accordion__panel"
        aria-labelledby="header-1"
        role="region"
        isExpanded
        addPanel={mockAddPanel}
      >
        Panel 1
      </AccordionPanel>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('addPanel', () => {
    const wrapper = mount(
      <AccordionPanel
        id="panel-1"
        addPanel={mockAddPanel}
      >
        Panel 1
      </AccordionPanel>,
    );
    expect(mockAddPanel).toHaveBeenCalledTimes(1);
    expect(mockAddPanel).toHaveBeenCalledWith(
      'panel-1',
      { current: wrapper.find('dd').first().instance() },
      undefined,
    );
  });

  test('addPanel initiallyExpanded', () => {
    const wrapper = mount(
      <AccordionPanel
        id="panel-1"
        addPanel={mockAddPanel}
        expanded
      >
        Panel 1
      </AccordionPanel>,
    );
    expect(mockAddPanel).toHaveBeenCalledTimes(1);
    expect(mockAddPanel).toHaveBeenCalledWith(
      'panel-1',
      { current: wrapper.find('dd').first().instance() },
      true,
    );
  });
});
