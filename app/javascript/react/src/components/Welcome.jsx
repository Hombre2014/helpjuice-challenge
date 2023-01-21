import React from 'react';
import * as ReactDOM from 'react-dom/client';
import Notion from './Notion';

const Welcome = () => {
  return (
    <div className='container'>
      <h1>Front-end developer test project</h1>
      <Notion />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('welcome'));
root.render(
  <React.StrictMode>
    <Welcome />
  </React.StrictMode>
);

export default Welcome;
