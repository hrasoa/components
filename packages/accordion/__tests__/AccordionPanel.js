// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import AccordionPanel from '../src/AccordionPanel';

jest.mock('ally.js/maintain/disabled');

const mockAddPanel = jest.fn();

beforeEach(() => {
  mockAddPanel.mockClear();
});

describe('AccordionPanel', () => {
  describe('Snapshot testing', () => {
    test('minimal', () => {
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

    test('with more props', () => {
      const component = renderer.create(
        <AccordionPanel
          id="panel-1"
          className="accordion__panel"
          aria-labelledby="header-1"
          role="region"
          addPanel={mockAddPanel}
        >
          Panel 1
        </AccordionPanel>,
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('expanded state', () => {
      const component = renderer.create(
        <AccordionPanel
          id="panel-1"
          isExpanded
          addPanel={mockAddPanel}
        >
          Panel 1
        </AccordionPanel>,
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('DOM Testing', () => {
    test('should call addPanel on mount', () => {
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
        false,
      );
    });

    test('should call addPanel on mount with truthy initially expanded', () => {
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
});
