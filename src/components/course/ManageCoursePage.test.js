import expect from 'expect';
import React from 'react';
import {mount, shallow} from 'enzyme';
//import ManageCoursePage from './ManageCoursePage';
//import Provider from "react-redux/src/components/Provider";
import {ManageCoursePage} from './ManageCoursePage';
describe ('Manage Course Page', () =>{
  it('sets error message when trying to save empty title', () => {

    const props = {
      authors: [],
      actions: {saveCourse: () =>{return Promise.resolve();}},
      course : {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''}
    };

    //With mount a full DOM is created in memory.
    //const wrapper = mount(<Provider store="{store}"><ManageCoursePage/></Provider>);
    const wrapper = mount(<ManageCoursePage {...props}/>);
    const saveBotton = wrapper.find('input').last();
    expect(saveBotton.prop('type')).toBe('submit');
    saveBotton.simulate('click');
    expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
  });
});
