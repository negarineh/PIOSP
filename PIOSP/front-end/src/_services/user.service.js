import { authHeader } from '../_helpers';
import cookie from 'react-cookies';
import { authHeaderp } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete,
    getAllSurveyResults,
    attend
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch('/login', requestOptions)
        .then(response => {
            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/alladmins', requestOptions).then(handleResponse);
}

function getById(email) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
    };

    return fetch('/adminInfo', requestOptions)
        .then(response => {
            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user)

            return user;
        });
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('/signup', requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch('/updateadmin', requestOptions).then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader(),            
    };

    return fetch(`/removeadmin/${id}` , requestOptions).then(handleResponse);
    // return fetch(`/removeadmin?id=${id}` , requestOptions).then(handleResponse);

}

function getAllSurveyResults() { 
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/reportAnswers', requestOptions).then(handleResponse);
}

function attend() {
    const requestOptions = {
        method: 'GET',
        // headers: { 'Content-Type': 'application/json' },
        headers: authHeaderp()
        // body: JSON.stringify(email)
    };

    return fetch('/confirm?:email?:active_link', requestOptions)
        .then(response => {
            if (!response.ok) { 
                return Promise.reject(response.statusText);
            }

            return cookie.load('jwt');
        })
        .then(token => {
            // login successful if there's a jwt token in the response
            if (cookie.load('jwt')) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', JSON.stringify(cookie.load('jwt')));
            }

            return cookie.load('jwt');
        });
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}