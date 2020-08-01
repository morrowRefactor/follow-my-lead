import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import DestinationMap from './DestinationMap';
import './DestinationMap.css';

it('renders DestinationMap without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <DestinationMap />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});