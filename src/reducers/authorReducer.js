import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function authorReducer (state = initialState.authors, action) {
  switch(action.type){
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;

    case types.CREATE_AUTHORS_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.author)
      ];

    case types.UPDATE_AUTHORS_SUCCESS: {
      return [
        ...state.filter(author => author.id !== action.author.id),
        Object.assign({}, action.author)
      ];
    }

    case types.REMOVE_AUTHORS_SUCCESS: {
      return [
        ...state.filter(author => author.id !== action.authorId)
      ];
    }

    default:
      return state;
  }
}