import React from "react";
import Enzyme, { shallow } from "enzyme";
import assert from "assert";
import Submit from "../components/Survey/Submit";
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
 
Enzyme.configure({ adapter: new Adapter() });

// unit tests for the UserDeletePrompt component
describe('Submit component', () => {
  describe('render()', () => {
    it('should render the component', () => {
      const props = {starSelected: 0, totalStars: 5, history: {}, addItem: ()=>{}, change: ()=>{}};
      const wrapper = shallow(<Submit {...props}/>);
      const tree = toJson(wrapper);
      expect(tree).toMatchSnapshot();
      assert.equal(wrapper.length, 1);
    });
  });
});
