import React from "react";
import Enzyme, { shallow } from "enzyme";
import assert from "assert";
import {SurveyResultsPage} from "../SurveyResultsPage";
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import { store } from '../_helpers';
import { Provider } from 'react-redux';
 
Enzyme.configure({ adapter: new Adapter() });

// unit tests for the UserDeletePrompt component
describe('Survey Results Page component', () => {
  describe('render()', () => {
    it('should render the component', () => {
      const props = {handleChange: () => {}, handleItemClick: () => {}};
      const wrapper = shallow(<Provider store={store}><SurveyResultsPage {...props}/></Provider>);
      const tree = toJson(wrapper);
      expect(tree).toMatchSnapshot();
      assert.equal(wrapper.length, 1);
    });
  });
});
