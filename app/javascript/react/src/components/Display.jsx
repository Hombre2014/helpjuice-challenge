import React, { useState, useEffect } from 'react';

const Display = (props) => {
  const [lines, setLines] = useState([props.lines]);
  const linesUrl = 'http://localhost:3000/api/v1/lines';

  // const handleChange = (e) => {
  //   console.log(e.target.value);
  //   setLines({
  //     content: e.target.value,
  //   });
  // };

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

  const handleChange = async (e) => {
    const updateLine = async (data) => {
      fetch(`http://localhost:3000/api/v1/lines/2/update_content`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('PATCH: ', data);
      });
      // const result = await axios.patch(`http://localhost:3000/api/v1/lines/${e.target.dataset.id}/update_content`, data)
      //   .catch(error => console.log(error))
      
      const lineId = e.target.dataset.id;
      console.log('This is lineId: ', lineId);
      const line = props.lines.find((line) => line.id === parseInt(lineId));
      console.log('This is line: ', line);
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






  // const handleEdit = (e) => {
  //   console.log('This the value: ', e.target.value);
  //   console.log('This the id: ', e.target.dataset.id);
  //   setLineId(parseInt(e.target.dataset.id));
  //   console.log('This is lineId: ', lineId);

  //   const updateLine = (data) => {
  //     fetch(`https://localhost:3000/api/v1/lines/2/update_content`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(data),
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log('PUT: ', data);
  //       });
  //     setLines({
  //       content: data.content,
  //     });
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   };
  //   updateLine({ content: e.target.value });
  //   fetchLines();
  // };

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
