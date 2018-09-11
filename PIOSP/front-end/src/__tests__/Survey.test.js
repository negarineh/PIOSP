import React from "react";
import Enzyme, { shallow } from "enzyme";
import assert from "assert";
import Survey from "../components/Survey/Survey";
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
 
Enzyme.configure({ adapter: new Adapter() });

// unit tests for the UserDeletePrompt component
describe('Survey component', () => {
  describe('render()', () => {
    it('should render the component', () => {
      const props = {sendItems: {}, history: {}, addItem: ()=>{}};
      const wrapper = shallow(<Survey {...props}/>);
      const tree = toJson(wrapper);
      expect(tree).toMatchSnapshot();
      assert.equal(wrapper.length, 1);
    });
  });
});
