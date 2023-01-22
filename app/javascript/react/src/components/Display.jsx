import React, { useState, useEffect } from 'react';

const Display = (props) => {
  const [lines, setLines] = useState([]);
  const [lineId, setLineId] = useState(0);
  const linesUrl = 'http://localhost:3000/api/v1/lines';

  const handleClick = (e) => {
    console.log(e.target.value);
    setLines({
      content: e.target.value,
    });
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setLines({
      content: e.target.value,
    });
  };

  // const fetchLines = () => {
  //   fetch(linesUrl)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log('This is DATA from fetch Lines', data);
  //       setLines(data);
  //     });
  // };

  // useEffect(() => {
  //   fetchLines();
  // }, []);

  const handleEdit = (e) => {
    console.log('This the value: ', e.target.value);
    console.log('This the id: ', e.target.dataset.id);
    setLineId(parseInt(e.target.dataset.id));
    console.log('This is lineId: ', lineId);

    const updateLine = (data) => {
      fetch(`https://localhost:3000/api/v1/lines/2/update_content`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('PUT: ', data);
        });
      setLines({
        content: data.content,
      });
      // .catch((error) => {
      //   console.log(error);
      // });
    };
    // updateLine({ content: e.target.value });
    // fetchLines();
  };

  return (
    <>
      {props.lines.map((line) => {
        return (
          <li key={line.id.toString()} className="list-group-item border-0 p-0">
            {line.header ? (
              <textarea
                id="display"
                data-id={line.id}
                name="display"
                rows="1"
                cols="80"
                placeholder=""
                className="bg-white border-0 h1"
                style={{ outline: 'none', resize: 'none' }}
                value={line.content}
                onBlur={handleEdit}
                onClick={handleClick}
                onChange={handleChange}
              />
            ) : (
              <textarea
                id="display"
                data-id={line.id}
                name="display"
                rows="1"
                cols="80"
                placeholder=""
                className="bg-white border-0"
                style={{ outline: 'none', resize: 'none' }}
                value={line.content}
                onBlur={handleEdit}
                onClick={handleClick}
                onChange={handleChange}
              />
            )}
          </li>
        );
      })}
    </>
  );
};

export default Display;
