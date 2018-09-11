import { resultService } from '../_services';
import {resultConstants} from '../_constants';

export const resultActions = {
    getAllSurveyExperienceResults,
};


function getAllSurveyExperienceResults() {
    return dispatch => {
        dispatch(request());

        resultService.getAllSurveyExperienceResults()
            .then(
                results => dispatch(success(results)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: resultConstants.GETALL_REQUEST } }
    function success(results) { return { type: resultConstants.GETALL_SUCCESS, results } }
    function failure(error) { return { type: resultConstants.GETALL_FAILURE, error } }
}

