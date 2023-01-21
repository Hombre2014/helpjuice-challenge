import React, { useState, useEffect } from 'react';
import Display from './Display';

const Notion = () => {
  const [lines, setLines] = useState([]);
  const linesUrl = 'http://localhost:3000/api/v1/lines';
  const [message, setMessage] = useState('');
  const [header, setHeader] = useState(false);

  const fetchLines = () => {
    fetch(linesUrl)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setLines(data);
    })
  }

  useEffect(() => {
    fetchLines();
  }, [message]);

  useEffect(() => {
    newLine({content: message, header: header});
  }, [message]);


  const newLine = (data) => {
    fetch('http://localhost:3000/api/v1/lines', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
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
      plot.value = '';
      setHeader(true);
    }
  }

  const handleEnter = (e) => {
    if (e.keyCode === 13 && header === true) {
      e.preventDefault();
      setMessage(e.target.value);
      plot.value = '';
      plot.classList.remove('h1');
      plot.setAttribute('placeholder', 'Type /1 for heading 1');
      console.log('Here you have to render message!', header);
      // newLine({content: message}, {header: header});
      // setHeader(false);
    } else if (e.keyCode === 13 && header === false) {
      e.preventDefault();
      setMessage(e.target.value);
      console.log(header);
      // newLine({content: message}, {header: header});
      plot.value = '';
      plot.setAttribute('placeholder', 'Type /1 for heading 1');
      setHeader(false);
    }
    return false;
  }

  return (
    <div>
      <h2>Start typing below</h2>
      <Display lines={lines} />
      <textarea id='plot' name="plot" rows="32" cols="80" placeholder='' className='bg-white border-0' style={{outline: 'none'}} onClick={handleClick} onChange={handleChange} onKeyDown={handleEnter} />
    </div>
  )
}

export default Notion;
