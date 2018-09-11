import { authHeader } from '../_helpers';

export const resultService = {
    getAllSurveyExperienceResults,

};

function getAllSurveyExperienceResults() { 
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('/reportExperienceAnswers', requestOptions).then(handleResponse);
}

function handleResponse(response) {
    if (!response.ok) { 
        return Promise.reject(response.statusText);
    }

    return response.json();
}