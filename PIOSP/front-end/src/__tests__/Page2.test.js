import React from "react";
import Enzyme, { shallow } from "enzyme";
import assert from "assert";
import Page2 from "../components/Survey/Page2";
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
 
Enzyme.configure({ adapter: new Adapter() });

// unit tests for the UserDeletePrompt component
describe('UserDeletePrompt component', () => {
  describe('render()', () => {
    it('should render the component', () => {
      const props = {history: {}, userDelete: ()=>{}, shoeDelete: ()=>{}, handleSubmit: () => {}, closeModal: () => {}, openModal: () => {}};
      const wrapper = shallow(<Page2 {...props}/>);
      const tree = toJson(wrapper);
      expect(tree).toMatchSnapshot();
      assert.equal(wrapper.length, 1);
    });
  });
});
