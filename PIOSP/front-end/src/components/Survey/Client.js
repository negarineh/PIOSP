/* eslint-disable no-undef */
function search(cb) {
    return fetch(`save`, {
      accept: "application/json",
      method: "GET"
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
    console.log(response.json);
    return response.json();
  }
  
  const Client = { search };
  export default Client;