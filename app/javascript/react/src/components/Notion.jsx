import React, { useState, useEffect } from 'react';
import Display from './Display';

const Notion = () => {
  const [lines, setLines] = useState([]);
  const [message, setMessage] = useState({
    content: '',
    header: 0,
  });
  // const [header, setHeader] = useState(0);
  const linesUrl = 'http://localhost:3000/api/v1/lines';

  const fetchLines = () => {
    fetch(linesUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log('This is DATA from fetch Lines', data);
      setLines(data);
    })
  }

  useEffect(() => {
    fetchLines();
  }, [message.content]);

  useEffect(() => {
    newLine({content: message.content, header: message.header});
  }, [message.content]);

  // useEffect(() => {
  //   setMessage({ content: message.content, header: message.header });
  // }, [message.content, message.header]);

  const newLine = async (data) => {
    const response = await fetch('http://localhost:3000/api/v1/lines', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log('This is DATA from POST fetch', result);
  };

  // const newLine = (data) => {
  //   fetch('http://localhost:3000/api/v1/lines', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log('This is DATA from POST fetch', data);
  //     })
  //     .catch((error) => {
  //       console.log('This is error from POST fetch: ', error);
  //     });
  // };

  const handleClick = () => {
    const plot = document.getElementById('plot');
    plot.setAttribute('placeholder', 'Type /1 for heading 1');
    plot.classList.add('border-0', 'p-2');
  }

  const handleChange = (e) => {
    if (e.target.value === '/1') {
      plot.value = '';
      plot.setAttribute('placeholder', 'Heading 1');
      plot.classList.add('h1');
      setMessage({ content: '', header: 1 });
      console.log('Just setHeader to 1: ', message.header);
    }
  }

  const handleEnter = (e) => {
    if (e.keyCode === 13 && message.header === 1) {
      e.preventDefault();
      console.log('header is true', message.header);
      console.log('Content is: ', e.target.value);
      const value = e.target.value;
      console.log('Value is. This is for the message.content: ', value);
      setMessage({ content: value, header: 1 });
      console.log('Message content is: ', message.content);
      console.log('Content type is: ', typeof message.content);
      console.log('Message header is: ', message.header);
      plot.value = '';
      plot.classList.remove('h1');
      plot.setAttribute('placeholder', 'Type /1 for heading 1');
      newLine({content: message.content, header: message.header});
      fetchLines();
      setMessage({content: '', header: 0});
      console.log('header is false', message.header);
    } else if (e.keyCode === 13 && message.header === 0) {
      e.preventDefault();
      console.log('header is false', message.header);
      setMessage({content: e.target.value, header: message.header});
      plot.value = '';
      plot.setAttribute('placeholder', 'Type /1 for heading 1');
      // newLine({content: message.content, header: 0});
      fetchLines();
    }
    return false;
  }

  return (
    <div>
      <h2>Start typing below</h2>
      <ul className="list-group list-group-flush p-0">
        <Display lines={lines} />
      </ul>
      <textarea id='plot' name="plot" rows="32" cols="80" placeholder='' className='bg-white border-0' style={{ outline: 'none', resize: 'none' }} onClick={handleClick} onChange={handleChange} onKeyDown={handleEnter} />
    </div>
  )
}

export default Notion;
