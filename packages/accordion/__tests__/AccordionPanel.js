// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { mount } from 'enzyme';
import disabled from 'ally.js/maintain/disabled';
import AccordionPanel from '../src/AccordionPanel';

jest.mock('ally.js/maintain/disabled');

const mockDisengage = jest.fn();
const mockAddPanel = jest.fn();
const mockDisabled = disabled.mockImplementation(() => ({
  disengage: mockDisengage,
}));

beforeEach(() => {
  mockDisengage.mockClear();
  mockDisabled.mockClear();
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
          style={{ color: 'inherit' }}
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
      const ref = { current: wrapper.find('dd').first().instance() };
      expect(mockAddPanel).toHaveBeenCalledTimes(1);
      expect(mockAddPanel).toHaveBeenCalledWith('panel-1', ref, false);
    });

    test('should call addPanel on mount with expanded', () => {
      const wrapper = mount(
        <AccordionPanel
          id="panel-1"
          addPanel={mockAddPanel}
          expanded
          isExpanded
        >
          Panel 1
        </AccordionPanel>,
      );
      const ref = { current: wrapper.find('dd').first().instance() };
      expect(mockDisabled).not.toHaveBeenCalled();
      expect(mockAddPanel).toHaveBeenCalledTimes(1);
      expect(mockAddPanel).toHaveBeenCalledWith('panel-1', ref, true);
    });

    test('should not call disabled on mount, even expanded', () => {
      const wrapper = mount(
        <AccordionPanel
          id="panel-1"
          addPanel={mockAddPanel}
          expanded
          isExpanded
          disableInnert
        >
          Panel 1
        </AccordionPanel>,
      );
      wrapper.setProps({ isExpanded: false });
      wrapper.setProps({ isExpanded: true });
      wrapper.unmount();
      expect(mockDisabled).not.toHaveBeenCalled();
      expect(mockDisengage).not.toHaveBeenCalled();
    });

    test('should test disabled behavior', () => {
      const wrapper = mount(
        <AccordionPanel
          id="panel-1"
          addPanel={mockAddPanel}
        >
          Panel 1
        </AccordionPanel>,
      );
      const ref = { current: wrapper.find('dd').first().instance() };
      expect(mockDisabled).toHaveBeenCalledTimes(1);
      expect(mockDisabled).toHaveBeenCalledWith({ context: ref.current });
      wrapper.setProps({ isExpanded: true });
      expect(mockDisengage).toHaveBeenCalledTimes(1);
      wrapper.setProps({ isExpanded: false });
      expect(mockDisabled).toHaveBeenCalledTimes(2);
      expect(mockDisabled).toHaveBeenCalledWith({ context: ref.current });
      wrapper.unmount();
      expect(mockDisengage).toHaveBeenCalledTimes(2);
    });
  });
});
