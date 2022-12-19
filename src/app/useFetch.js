import { useState, useEffect } from 'react';

function useFetch(url, options) {
  const [data, setData] = useState([]);

  /*useEffect(() => {
    updateData();
  }, []);*/

  function updateData() {
    fetch(url, options)
      .then(response => response.json())
      .then(responseData => {
        setData(responseData);
      });
  }

  return [data, updateData];
}

export {useFetch}