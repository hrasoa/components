// @flow
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Accordion from '../src/Accordion';

const mockKeyNavigation = jest.fn();

beforeEach(() => {
  mockKeyNavigation.mockClear();
});

describe('Accordion', () => {
  describe('Snapshot testing', () => {
    test('minimal', () => {
      const component = renderer.create(
        <Accordion
          handleKeyNavigation={mockKeyNavigation}
        >
          <span>accordion items</span>
        </Accordion>,
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });

    test('with more props', () => {
      const component = renderer.create(
        <Accordion
          handleKeyNavigation={mockKeyNavigation}
          className="accordion"
          style={{ color: 'inherit' }}
        >
          <span>accordion items</span>
        </Accordion>,
      );
      const tree = component.toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('DOM Testing', () => {
    test('should call handleKeyNavigation onKeyDown', () => {
      const wrapper = shallow(
        <Accordion
          handleKeyNavigation={mockKeyNavigation}
        >
          <span>accordion items</span>
        </Accordion>,
      );
      wrapper.simulate('keydown');
      expect(mockKeyNavigation).toHaveBeenCalledTimes(1);
    });
  });
});
