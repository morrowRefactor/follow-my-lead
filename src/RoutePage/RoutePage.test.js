import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import RoutePage from './RoutePage';
import './RoutePage.css';

it('renders RoutePage without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <RoutePage />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});