import {resultConstants} from '../_constants';

export function results(state = {} , action ){
    switch (action.type){
        case resultConstants.GETALL_REQUEST:
            return {
                loading: true
            };
        case resultConstants.GETALL_SUCCESS:
            return {
                items: action.results
            };
        case resultConstants.GETALL_FAILURE:
            return {
                items: action.error
            };
        default:
            return state;
    }
}