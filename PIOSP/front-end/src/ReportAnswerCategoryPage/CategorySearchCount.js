
/* eslint-disable no-undef */
function search(query, cb) {
    return fetch(`reportAnswersCategoryCount`, { 
      headers: {"Content-Type": "application/json"},
      method: "POST",
      body:JSON.stringify({
              answer: query,
            }),
    })
      .then(checkStatus)
      .then(parseJSON)
      .then(cb)
      .catch(err => console.log(err));
  }
  
  function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
  }
  
  function parseJSON(response) {
    return response.json();
  }
  
  const CategorySearchCount = { search };
  export default CategorySearchCount;