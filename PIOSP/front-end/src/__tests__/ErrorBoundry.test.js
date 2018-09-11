import React from "react";
import Enzyme , { shallow } from "enzyme";
import assert from "assert";
import ErrorBoundry from "../ErrorBoundry/ErrorBoundry";
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// unit tests for the Home component
describe('Error Boundry component', () => { 
  describe('render()', () => {
    it('should render the component', () => {
      const wrapper = shallow(<ErrorBoundry/>);
      assert.equal(wrapper.length, 1);
    });
  });
});
