import React, { useState } from 'react';

const Display = (props) => {
  const [line, setLine] = useState({
    content: '',
    header: false
  });

  const handleClick = (e) => {
    const display = document.getElementById('display');
    console.log(e.target.value);
    setLine({
      content: e.target.value
    });
  }

  const handleEdit = (e) => {
    console.log(e.target.value);
    setLine({
      content: e.target.value
    });
  }

  return (
    <div>
      {props.lines.map((line) => {
        return (
          <div key={line.id}>
            {line.header ? (
              <textarea id='display' name="display" rows="1" cols="80" placeholder='' className='bg-white border-0 h1' style={{outline: 'none'}} value={line.content} onChange={handleEdit} onClick={handleClick} />) : (
              <textarea id='display' name="display" rows="1" cols="80" placeholder='' className='bg-white border-0' style={{outline: 'none'}} value={line.content} onChange={handleEdit} onClick={handleClick} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Display;
