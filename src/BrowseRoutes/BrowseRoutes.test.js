import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import BrowseRoutes from './BrowseRoutes';
import './BrowseRoutes.css';

it('renders BrowseRoutes without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <BrowseRoutes />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});