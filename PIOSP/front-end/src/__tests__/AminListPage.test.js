import React from 'react';
import Enzyme , {shallow} from 'enzyme';
import assert from 'assert';
import Adapter from 'enzyme-adapter-react-16';
import {AdminList} from '../AdminListPage';

import { store } from '../_helpers';
import { Provider } from 'react-redux';

Enzyme.configure({adapter: new Adapter()});

//unit tests for AdminListPage component
describe('AdminListPage component', () => {
    describe('render()', () => {
        it('should render the component', () => {
            const props = { delete_user:{}, showDelete: () =>{}, hideDelete: () =>{}, userDelete: () =>{}, showUpdate: () =>{} };
            const wrapper = shallow(<Provider store={store}><AdminList {...props}/></Provider>);
            assert.equal(wrapper.length, 1);
        });
    });
});