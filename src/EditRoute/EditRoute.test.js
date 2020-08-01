import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import EditRoute from './EditRoute';
import './EditRoute.css';

it('renders EditRoute without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <EditRoute />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});