import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import RouteSummary from './RouteSummary';
import './RouteSummary.css';

it('renders RouteSummary without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <RouteSummary />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});