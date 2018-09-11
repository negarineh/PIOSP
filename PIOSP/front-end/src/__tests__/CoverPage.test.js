import React from 'react';
import {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import {CoverPage} from '../HomePage';
import toJson from 'enzyme-to-json';

Enzyme.configure({ adapter: new Adapter()}); 

describe('Cover Page Component', () => {
    describe('render()', () => {
        it('Should render the component', () => {
            const component = shallow(<CoverPage/>);
            const tree = toJson(component);
            console.log(tree);
            // expect(component.contains('Admin Tables')).toBe(true);
            expect(tree).toMatchSnapshot();
        });
    });
});
