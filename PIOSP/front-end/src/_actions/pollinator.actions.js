import { pollinatorService } from '../_services';
import { pollinatorConstants } from '../_constants';

export const pollinatorActions = {
    checkFillPolliantorCollection,
    fillPolliantorCollection
};


function checkFillPolliantorCollection() {
    return dispatch => {
        dispatch(request());

        pollinatorService.checkFillPolliantorCollection()
            .then(
                pollinators => dispatch(success(pollinators)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: pollinatorConstants.CHECKFILL_REQUEST } }
    function success(pollinators) { return { type: pollinatorConstants.CHECKFILL_SUCCESS, pollinators } }
    function failure(error) { return { type: pollinatorConstants.CHECKFILL_FAILURE, error } }
}

function fillPolliantorCollection() {
    return dispatch => {
        dispatch(request());

        pollinatorService.fillPolliantorCollection()
            .then(
                checked => dispatch(success(checked)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: pollinatorConstants.CHECKFILL_REQUEST } }
    function success(checked) { return { type: pollinatorConstants.CHECKFILL_SUCCESS, checked } }
    function failure(error) { return { type: pollinatorConstants.CHECKFILL_FAILURE, error } }
}

