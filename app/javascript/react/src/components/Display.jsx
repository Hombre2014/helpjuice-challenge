import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Display = (props) => {
  const [lines, setLines] = useState(props.lines);
  // const [lineId, setLineId] = useState(0);
  const linesUrl = 'http://localhost:3000/api/v1/lines';

  const handleClick = (e) => {
    console.log(e.target.value);
    // const lineId = e.target.dataset.id;
    // setLines(lines[lineId - 1].content : e.target.value);
  };

  const handleChange = async (e) => {
    console.log('This the value: ', e.target.value);
    console.log('This the id: ', e.target.dataset.id);

    const updateLine = async (data) => {
      const result = await axios.patch(`http://localhost:3000/api/v1/lines/${e.target.dataset.id}/update_content`, data)
        .catch(error => console.log(error))
      console.log('This is DATA from PATCH fetch', result);

    //   axios.patch(global.API + "/todo/" + this.props.todo.id, {
    //     isDone: true
    //   }
    // ).catch(error => console.log(error))

      // await fetch(`https://localhost:3000/api/v1/lines/${e.target.dataset.id}/update_content`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(data),
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     console.log('PUT: ', data);
      //   });
      
      const lineId = e.target.dataset.id;
      const line = lines.find((line) => line.id === parseInt(lineId));
      line.content = e.target.value;
      setLines(lines);
      fetchLines();
    };

    await updateLine({ content: e.target.value });
    // await fetchLines();
  };

  const fetchLines = () => {
    fetch(linesUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log('This is DATA from fetch Lines', data);
        setLines(data);
      });
  };

  useEffect(() => {
    fetchLines();
  }, []);

  // useEffect(() => {
  //   fetchLines();
  // }, [lines]);

  return (
    <>
      {lines.map((line) => {
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
                // onBlur={handleEdit}
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
                // onBlur={handleEdit}
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
