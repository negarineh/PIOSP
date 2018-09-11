import React from "react";
import Enzyme, { shallow } from "enzyme";
import assert from "assert";
import AdminDeletePrompt from "../AdminListPage/AdminDeletePrompt";
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
 
Enzyme.configure({ adapter: new Adapter() });

// unit tests for the UserDeletePrompt component
describe('UserDeletePrompt component', () => {
  describe('render()', () => {
    it('should render the component', () => {
      const props = {show: true, user: {}, hideDelete: ()=>{}, userDelete: ()=>{}};
      const wrapper = shallow(<AdminDeletePrompt {...props}/>);
      const tree = toJson(wrapper);
      expect(tree).toMatchSnapshot();
      assert.equal(wrapper.length, 1);
    });
  });
});
