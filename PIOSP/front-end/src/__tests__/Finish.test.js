import React from "react";
import Enzyme, { shallow } from "enzyme";
import assert from "assert";
import Finish from "../components/Survey/Finish";
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
 
Enzyme.configure({ adapter: new Adapter() });

// unit tests for the UserDeletePrompt component
describe('UserDeletePrompt component', () => {
  describe('render()', () => {
    it('should render the component', () => {
      const props = {history: {}};
      const wrapper = shallow(<Finish {...props}/>);
      const tree = toJson(wrapper);
      expect(tree).toMatchSnapshot();
      assert.equal(wrapper.length, 1);
    });
  });
});
