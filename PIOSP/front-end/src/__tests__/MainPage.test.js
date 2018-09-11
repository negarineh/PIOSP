import React from "react";
import Enzyme , { shallow } from "enzyme";
import assert from "assert";
import {MainPage} from "../MainPage";
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

// unit tests for the Home component
describe('Main Page component', () => { 
  describe('render()', () => {
    it('should render the component', () => {
      const wrapper = shallow(<MainPage/>);
      assert.equal(wrapper.length, 1);
    });
  });
});
