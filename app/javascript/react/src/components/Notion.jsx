import React, { useState } from 'react';

const Notion = () => {
  const [message, setMessage] = useState('');
  let header = false;

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
      header = true;
    } else {
      header = false;
    }
  }

  const handleEnter = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      console.log('Enter pressed');
      setMessage(e.target.value);
      plot.value = '';
      plot.classList.remove('h1');
      plot.setAttribute('placeholder', 'Type /1 for heading 1');
      console.log('Value is: ', e.target.value);
    }
    return false;
  }

  return (
    <div>
      <h2>Start typing below</h2>
      {header === false ? <p>{message}</p> : <h1>{message}</h1>}
      <textarea id='plot' name="plot" rows="32" cols="80" placeholder='' className='bg-white border-0' style={{outline: 'none'}} onClick={handleClick} onChange={handleChange} onKeyDown={handleEnter} />
    </div>
  )
}

export default Notion;
