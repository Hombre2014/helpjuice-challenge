import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Display = (props) => {
  const [lines, setLines] = useState(props.lines);
  const linesUrl = 'https://pacific-tundra-66615.herokuapp.com/api/v1/lines';

  const handleChange = async (e) => {
    const updateLine = async (data) => {
      const result = await axios.patch(`https://pacific-tundra-66615.herokuapp.com/api/v1/lines/${e.target.dataset.id}/update_content`, data)
        .catch(error => console.log(error))
      
      const lineId = e.target.dataset.id;
      const line = lines.find((line) => line.id === parseInt(lineId));
      line.content = e.target.value;
      setLines(lines);
      fetchLines();
    };

    await updateLine({ content: e.target.value });
  };

  const fetchLines = () => {
    fetch(linesUrl)
      .then((response) => response.json())
      .then((data) => {
        setLines(data);
      });
  };

  useEffect(() => {
    fetchLines();
  }, []);

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
