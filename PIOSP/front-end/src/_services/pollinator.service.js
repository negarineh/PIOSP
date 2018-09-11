import { authHeader } from '../_helpers';

export const pollinatorService = {
    fillPolliantorCollection,
    checkFillPolliantorCollection
};

function fillPolliantorCollection() { 
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/fill', requestOptions).then(handleResponse);
}

function checkFillPolliantorCollection() { 
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/checkFill', requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}