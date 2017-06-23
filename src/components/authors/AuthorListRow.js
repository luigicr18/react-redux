import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router';
import Confirm from 'react-confirm-bootstrap';
import {connect} from 'react-redux';
import SweetAlert from 'react-bootstrap-sweetalert';

class AuthorListRow extends React.Component{
  constructor(props, context) {
    super(props, context);
    //this.setState ({showModal : false});
    this.onConfirm = this.onConfirm.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
    this.deleteAuthor = this.deleteAuthor.bind(this);
    this.hideAlert = this.hideAlert.bind(this);
    this.findAuthorCourses = this.findAuthorCourses.bind(this);
  }


  componentWillMount() {
    this.setState ({showModal : false, showCancelRemove: false});
  }

  onConfirm(){
    this.setState ({showModal : true});
  }

  cancelDelete() {
    this.setState ({showModal : false});
  }

  findAuthorCourses() {
    let findCourse = this.props.courses.find(course => course.authorId === this.props.author.id);
    console.log('find: ', findCourse);
    if (findCourse != undefined) {
      return true;
    }
    return false;
  }

  deleteAuthor(){
    if (this.findAuthorCourses()) {
      this.setState ({showModal : false});
      this.setState ({showCancelRemove : true});
      return false;
    }
    this.props.onRemove(this.props.author.id);
    this.setState ({showModal : false});
  }

  hideAlert(){
    this.setState ({showCancelRemove : false});
  }

  render () {
    return (
      <tr>
        <td><Link to={'/author/' + this.props.author.id}>{this.props.author.firstName} {this.props.author.lastName}</Link></td>
        <td>{this.props.author.firstName}</td>
        <td>{this.props.author.lastName}</td>
        <td>{this.props.author.yearsExpirience}</td>
        <td><input type="checkbox" checked={this.props.author.enabled}/></td>
        <td>
          {this.state.showModal && <SweetAlert
            warning
            showCancel
            confirmBtnText="Yes, delete it!"
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="default"
            title="Are you sure?"
            onConfirm={this.deleteAuthor}
            onCancel={this.cancelDelete}
            id={this.props.author.id}
          >
            Are you sure do you want to delete this author?
          </SweetAlert>}
          {this.state.showCancelRemove && <SweetAlert
            danger
            title="Delete Cancel!"
            onConfirm={this.hideAlert}
          >
            Author is associated to a course. You can NOT delete an author associated!
          </SweetAlert>}
          <a href="#" id={this.props.author.id} onClick={this.onConfirm}>Remove</a>
        </td>
      </tr>

    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    authors: state.authors
  };
}

AuthorListRow.propTypes = {
  author: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired
};

export default connect(mapStateToProps)(AuthorListRow);
