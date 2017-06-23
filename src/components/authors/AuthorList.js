import React from 'react';
import PropTypes from 'prop-types';
import AuthorListRow from './AuthorListRow';

const AuthorList = ({authors, onRemove, courses}) => {


  return (
    <table className="table">
      <thead>
      <tr>
        <th>Author</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Years Experience</th>
        <th>Enabled</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {authors.map( author =>
        <AuthorListRow key={author.id} author={author} onRemove={onRemove} courses={courses} />
      )}
      </tbody>
    </table>
  );
};

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default AuthorList;
