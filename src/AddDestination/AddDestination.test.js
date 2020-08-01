import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import AddDestination from './AddDestination';
import './AddDestination.css';

it('renders AddDestination without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <AddDestination />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});