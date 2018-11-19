import React from 'react';
import Enzyme , {shallow,configure} from 'enzyme'
import EnzymeAdapter from 'enzyme-adapter-react-16'
import App from './App';

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App Component
 * @function setup
 * @param {object} props - Component props specific to this set up.
 * @param {object} state - Initial state for set up
 * @returns {ShallowWrapper} 
 */
const setup = (props={}, state=null) => {

  const wrapper = shallow(<App {...props}/>);
  //Testing button click section
  if(state) wrapper.setState(state);

  return wrapper;
  //end Testing bbutton click section
}

/**
 * Return ShawllowWrapper containing node(s) with  the given data-test value.
 * @param {ShallowWrapper} wrapper - Enzyne shallow wrapper to search within. 
 * @param {string} val  - Value of data-test attribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper,val) => {
  return wrapper.find(`[data-test="${val}"]`);
}

test('renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper,"component-app");
  expect(appComponent.length).toBe(1);
});

test('renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper,"increment-button");
  expect(button.length).toBe(1);
});

test('renders counter display', () => {
  const wrapper = setup();
  const counter = findByTestAttr(wrapper,"counter-display");
  expect(counter.length).toBe(1);

});

//testing state.
test('renders starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
});

//Test Button Click
test('clicking button increments counter display', () => {
  const counter = 7;
  const wrapper = setup(null,{counter});

  //find button and click
  const button = findByTestAttr(wrapper,'increment-button');
  button.simulate('click');
  wrapper.update();

  //find display and test value
  const counterDisplay = findByTestAttr(wrapper,'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1);
});