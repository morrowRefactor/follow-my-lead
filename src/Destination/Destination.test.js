import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Destination from './Destination';
import './Destination.css';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <Destination />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});