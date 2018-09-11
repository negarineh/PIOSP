import React from "react";
import Enzyme, { shallow } from "enzyme";
import assert from "assert";
import {ParticipantSignUpPendingPage} from "../ParticipantSignUpPendingPage";
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';
 
Enzyme.configure({ adapter: new Adapter() });

// unit tests for the UserDeletePrompt component
describe('Participant SignUp Pending Page component', () => {
  describe('render()', () => {
    it('should render the component', () => {
      const wrapper = shallow(<ParticipantSignUpPendingPage/>);
      const tree = toJson(wrapper);
      expect(tree).toMatchSnapshot();
      assert.equal(wrapper.length, 1);
    });
  });
});
