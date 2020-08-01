import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import CreateRoute from './CreateRoute';
import './CreateRoute.css';

it('renders CreateRoutes without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <CreateRoute />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});