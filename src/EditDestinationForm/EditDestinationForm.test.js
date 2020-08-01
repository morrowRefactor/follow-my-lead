import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import EditDestinationForm from './EditDestinationForm';
import './EditDestinationForm.css';

it('renders EditDestinationForm without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <BrowserRouter>
      <EditDestinationForm />
    </BrowserRouter>,
    div
  )
  ReactDOM.unmountComponentAtNode(div);
});