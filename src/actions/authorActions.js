import * as types from './actionTypes';
import authorApi from '../api/mockAuthorApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function updateAuthorSuccess(author) {
  return { type: types.UPDATE_AUTHORS_SUCCESS, author };
}

export function createAuthorSuccess(author) {
  return { type: types.CREATE_AUTHORS_SUCCESS, author };
}

export function removeAuthorSuccess(authorId) {
  return { type: types.REMOVE_AUTHORS_SUCCESS, authorId };
}

export function saveAuthor(author) {
  return function (dispatch, getState) {
    dispatch(beginAjaxCall());
    return authorApi.saveAuthor(author).then(savedAuthor => {
      author.id ? dispatch(updateAuthorSuccess(savedAuthor)) :
        dispatch(createAuthorSuccess(savedAuthor));
    }).catch(error =>{
      dispatch(ajaxCallError(error));
      throw(error);
    });
  };
}

export function loadAuthors() {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return authorApi.getAllAuthors().then(authors => {
      dispatch(loadAuthorsSuccess(authors));
    }).catch(error =>{
      throw(error);
    });
  };
}

export function removeAuthor(authorId) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return authorApi.deleteAuthor(authorId).then(() => {
      dispatch(removeAuthorSuccess(authorId));
    }).catch(error =>{
      throw(error);
    });
  };
}
