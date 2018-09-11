import React from 'react';
import ReactDOM from 'react-dom';
import {App} from '../App';
import { store } from '../_helpers';
import { Provider } from 'react-redux';

// import {mount} from 'enzyme'; 
// import MemoryRouter from 'react-router';
// import Page2 from '../components/Survey/Page2';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// import '../__mocks__/localStorage';

Enzyme.configure({ adapter: new Adapter()});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><App /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

// test('Should render Page2 url', () => {
//     const component = mount(
//         <MemoryRouter initialEntries = {['/page2']} initialIndex = {0}>
//           <Provider store={store}><App /></Provider>
//         </MemoryRouter>
//     )
//     expect(component.find(Page2).length).toBe(1);
// })

debugger;