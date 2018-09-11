import {pollinatorConstants} from '../_constants';

export function pollinators(state = {} , action ){
    switch (action.type){
        case pollinatorConstants.CHECKFILL_REQUEST:
            return {
                loading: true
            };
        case pollinatorConstants.CHECKFILL_SUCCESS:
            return {
                items: action.pollinators
            };
        case pollinatorConstants.CHECKFILL_FAILURE:
            return {
                items: action.error
            };
        case pollinatorConstants.FILL_REQUEST:
        return {
                loading: true
            };
        case pollinatorConstants.FILL_SUCCESS:
        return {
                items: action.checks
            };
        case pollinatorConstants.FILL_FAILURE:
        return {
                items: action.error
            };
        default:
            return state;
    }
}