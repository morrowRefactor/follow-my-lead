import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import SearchMap from './SearchMap';
import './SearchMap.css';

it('renders SearchMap without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <SearchMap />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});