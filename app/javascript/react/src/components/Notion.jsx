import React, { useState, useEffect } from 'react';
import Display from './Display';

const Notion = () => {
  const [lines, setLines] = useState([]);
  const [content, setContent] = useState('');
  const [header, setHeader] = useState(0);
  const linesUrl = 'http://localhost:3000/api/v1/lines';

  const fetchLines = async () => (
    fetch(linesUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('This is DATA from fetch Lines', data);
        setLines(data);
      })
  );

  useEffect(() => {
    fetchLines();
  }, [content]);

  // useEffect(() => {
  //   (async () => {
  //     await fetchLines();
  //   })();
  // }, [content]);

  // useEffect(() => {
  //   (async() => {
  //     await fetchLines();
  //   })();
  // }, []);

  // useEffect(() => {
  //   setMessage({ content: content, header: header });
  // }, [content, header]);

  const newLine = async (data) => {
    console.log('This is DATA: ', data);
    console.log('This is JSON DATA: ', JSON.stringify(data));
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
      setHeader(1);
      console.log('Just setHeader to 1: ', header);
    }
  }

  const handleEnter = async (e) => {
    if (e.keyCode === 13 && header === 1) {
      e.preventDefault();
      console.log('header is 1?: ', header);
      console.log('Content is: ', e.target.value);
      // setContent(e.target.value);
      console.log('Message content is: ', content);
      console.log('Message header is: ', header);
      await newLine({ content: '' + e.target.value, header: 1 });
      setContent(e.target.value);
      // fetchLines();
      setHeader(0);
      plot.value = '';
      plot.classList.remove('h1');
      plot.setAttribute('placeholder', 'Type /1 for heading 1');
      console.log('header is false', header);
    } else if (e.keyCode === 13 && header === 0) {
      e.preventDefault();
      console.log('header is false', header);
      // setContent(e.target.value);
      console.log('Message content is: ', e.target.value);
      await newLine({content: '' + e.target.value, header: 0});
      setContent(e.target.value);
      plot.value = '';
      plot.setAttribute('placeholder', 'Type /1 for heading 1');
      // fetchLines();
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
