
/* eslint-disable no-undef */
function search(query, page, size, cb) {
    return fetch(`reportId`, {
      headers: {"Content-Type": "application/json"},
      method: "POST",
      body:JSON.stringify({
              email: query,
              page: page,
              size: size
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
  
  const AdminSearch = { search };
  export default AdminSearch;