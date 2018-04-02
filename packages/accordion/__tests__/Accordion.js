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
  test('initial', () => {
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

  test('keyboard navigation', () => {
    const wrapper = shallow(
      <Accordion
        handleKeyNavigation={mockKeyNavigation}
        className="accordion"
      >
        <span>accordion items</span>
      </Accordion>,
    );
    wrapper.simulate('keydown');
    expect(mockKeyNavigation).toHaveBeenCalledTimes(1);
  });
});
