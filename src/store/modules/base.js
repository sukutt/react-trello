import { Map } from 'immutable';
import { handleActions, createAction } from 'redux-actions';

const SET_HEADER_VISIBILITY = 'base/SET_HEADER_VISIBILITY';
const SET_HEADER_TRANSPARENCY = 'base/SET_HEADER_STYLE';

export const setHeaderVisibility = createAction(SET_HEADER_VISIBILITY);
export const setHeaderTransparency = createAction(SET_HEADER_TRANSPARENCY);

const initialState = Map({
    header: Map({
        visible: true,
        isTDLPage: false,
    })
});

export default handleActions({
    [SET_HEADER_VISIBILITY]: (state, action) => state.setIn(['header', 'visible'], action.payload),
    [SET_HEADER_TRANSPARENCY]: (state, action) => state.setIn(['header', 'isTDLPage'], action.payload),
}, initialState);