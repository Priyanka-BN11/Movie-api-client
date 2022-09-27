import { combineReducers } from "redux";
import { SET_FILTER, SET_MOVIES, SET_USER, UPDATE_USER  } from "../actions/actions";
//reducer
function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            return action.value;
        default:
            return state;
                
    }
}
//reducer
function movies(state = [], action){
    switch(action.type) {
        case SET_MOVIES:
            console.log('SET_MOVIES reducer is reached');
            return action.value;
        default:
            return state;
    }
}
//reducer
function user(state = [], action){
    switch(action.type){
        case SET_USER:
            console.log('SET_USER reducer is reached');
            return action.value;
        default: 
            return state;    
    }
}
// combining the reducers with the combineReducers
// function moviesApp(state = {}, action) {
//     return {
//         visibilityFilter: visibilityFilter(state.visibilityFilter,action),
//         movies: movies(state.movies, action)
//     }
// }

//combineReducers
const moviesApp = combineReducers({
    movies,
    visibilityFilter,
    user
});
export default moviesApp;