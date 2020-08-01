import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import EditDestination from './EditDestination';
import './EditDestination.css';

it('renders EditDestination without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <EditDestination />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});