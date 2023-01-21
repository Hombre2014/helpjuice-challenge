import React, { useState } from 'react';

const Line = (props) => {
  const [lines, setLines] = useState([]);

  const handleClick = (e) => {
    const display = document.getElementById('display');
    setLines({
      content: e.target.value,
    });
  };

  const handleEdit = (e) => {
    console.log(e.target.value);
    // setLine({
    //   content: e.target.value,
    // });
    updateLines({content: e.target.value});
  };

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


  const updateLine = (data) => {
    fetch(
      `http://localhost:3000/api/v1/lines/${props.singleLine.id}/update_content`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <li>
      {line.header ? (
        <textarea
          id="display"
          name="display"
          rows="1"
          cols="80"
          placeholder=""
          className="bg-white border-0 h1"
          style={{ outline: 'none' }}
          value={props.singleLine.content}
          onChange={handleEdit}
          onClick={handleClick}
        />
      ) : (
        <textarea
          id="display"
          name="display"
          rows="1"
          cols="80"
          placeholder=""
          className="bg-white border-0"
          style={{ outline: 'none' }}
          value={props.singleLine.content}
          onChange={handleEdit}
          onClick={handleClick}
        />
      )}
    </li>
  );
};

export default Line;
