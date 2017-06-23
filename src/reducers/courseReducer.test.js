import expect from 'expect';
import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

describe('Course Reducer', () => {
  it('should add course when passed CREATE_COURSE_SUCCESS', () => {
    const initialState = [{id:'A', title: 'A'}, {id:'B', title:'B'}];
    const newCourse = {id:'C', title: 'C'};
    const action = actions.createCourseSuccess(newCourse);
    const newState = courseReducer(initialState, action);
    expect(newState.length).toEqual(3);
    expect(newState[0].title).toEqual('A');
    expect(newState[1].title).toEqual('B');
    expect(newState[2].title).toEqual('C');
  });

  it('should update course when passed UPDATE_COURSE_SUCCESS', () => {
    const initialState = [{id:'A', title: 'A'}, {id:'B', title:'B'}, {id:'C', title:'C'}];

    const course = {id:'B', title: 'New Title'};
    const action = actions.updateCourseSuccess(course);
    const newState = courseReducer(initialState, action);
    const updatedCourse = newState.find(a => a.id == course.id );
    const unTouchedCourse = newState.find(a => a.id == 'A' );

    expect(updatedCourse.title).toEqual('New Title');
    expect(unTouchedCourse.title).toEqual('A');

  });


});
