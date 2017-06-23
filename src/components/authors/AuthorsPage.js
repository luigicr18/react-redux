import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorList from './AuthorList';
import {browserHistory} from 'react-router';
import toastr from 'toastr';

class AuthorsPage extends React.Component{
  constructor(props, context){
    super(props, context);
    this.redirectToAddAuthorsPage = this.redirectToAddAuthorsPage.bind(this);
    this.removeAuthor = this.removeAuthor.bind(this);
  }

  authorRow(author, index) {
    return <div key={index}>{author.title}</div>;
  }

  redirectToAddAuthorsPage() {
    browserHistory.push('/author');
  }

  removeAuthor(authorId) {
    this.props.actions.removeAuthor(authorId)
      .then(() => toastr.success('Author remove it!'))
      .catch(error => {
        toastr.error(error);
      });
  }

  render () {
    const {authors} = this.props;
    const {courses} = this.props;
    return (
      <div>
        <h1>Authors</h1>
        <input
          type="submit"
          className="btn btn-primary"
          value="Add Author"
          onClick={this.redirectToAddAuthorsPage}/>
        <AuthorList authors={authors} onRemove={this.removeAuthor} courses={this.props.courses} />
      </div>
    );
  }
}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    authors: state.authors,
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return{
    //This is how we can declare without bindActionCreators
    //createCourse: (course => dispatch(courseActions.createCourse(course)))
    actions: bindActionCreators(authorActions, dispatch)
    //also we can creare directly the action
    //createCourse: bindActionCreators(authorActions.createCourse, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
