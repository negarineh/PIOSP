import React from 'react';
import Enzyme , {shallow} from 'enzyme';
import assert from 'assert';
import Adapter from 'enzyme-adapter-react-16';
import AdminListElement from '../AdminListPage/AdminListElement';

// import { store } from '../_helpers';
// import { Provider } from 'react-redux';

Enzyme.configure({adapter: new Adapter()});

//unit tests for AdminListPage component
describe('AdminListElement component', () => {
    describe('render()', () => {
        it('should render the component', () => {
            const props = { handleClicked: () =>{}, handleChange: () =>{}};
            const wrapper = shallow(<AdminListElement {...props}/>);
            assert.equal(wrapper.length, 1);
        });
    });
});