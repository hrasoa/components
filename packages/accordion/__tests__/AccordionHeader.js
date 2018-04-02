// @flow
import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import AccordionHeader from '../src/AccordionHeader';

const mockTogglePanel = jest.fn();

beforeEach(() => {
  mockTogglePanel.mockClear();
});

describe('AccordionHeader', () => {
  test('initial', () => {
    const component = renderer.create(
      <AccordionHeader
        id="header-1"
        controls="panel-1"
        togglePanel={mockTogglePanel}
      >
        Header 1
      </AccordionHeader>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('is expanded and disabled', () => {
    const component = renderer.create(
      <AccordionHeader
        id="header-1"
        aria-level="2"
        className="accordion__header"
        controls="panel-1"
        isExpanded
        isDisabled
        togglePanel={mockTogglePanel}
      >
        Header 1
      </AccordionHeader>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('focus, expand', () => {
    const wrapper = mount(
      <AccordionHeader
        id="header-1"
        controls="panel-1"
        togglePanel={mockTogglePanel}
      >
        Panel 1
      </AccordionHeader>,
    );
    const ref = wrapper.find('button').first().instance();
    expect(document.activeElement === ref).toBeFalsy();
    wrapper.setProps({ isFocused: true });
    expect(document.activeElement === ref).toBeTruthy();
    wrapper.find('button').simulate('click');
    expect(mockTogglePanel).toHaveBeenCalledTimes(1);
    expect(mockTogglePanel).toHaveBeenLastCalledWith('panel-1');
  });
});
