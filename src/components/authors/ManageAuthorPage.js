import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authorActions from '../../actions/authorActions';
import AuthorForm from './AuthorForm';
import toastr from 'toastr';

export class ManageAuthorPage extends React.Component {
  constructor(props, context){
    super(props, context);

    this.state = {
      author: Object.assign({}, this.props.author),
      errors: {},
      saving: false
    };

    this.updateAuthorState = this.updateAuthorState.bind(this);
    this.saveAuthor = this.saveAuthor.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.author.id != nextProps.author.id) {
      //Necessary to populate form when existing author is loaded directly
      this.setState({ author: Object.assign({}, nextProps.author)});
    }
  }

  authorFormIsValid(){
    let formIsValid = true;
    let errors = {};

    if(this.state.author.firstName.length < 0){
      errors.title = 'First name is required.';
      formIsValid = false;
    }

    if(this.state.author.lastName.length < 0){
      errors.title = 'Last name is required.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  updateAuthorState(event) {
    const field = event.target.name;
    let author = this.state.author;
    if(event.target.name == 'enabled'){
      author[field] = !author[field];
    } else {
      author[field] = event.target.value;
    }

    return this.setState({author: author});
  }

  saveAuthor(event) {
    event.preventDefault();

    if(!this.authorFormIsValid()){
      return;
    }

    this.setState({saving: true});

    this.props.actions.saveAuthor(this.state.author)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect(){
    this.setState({saving: false});
    toastr.success('Author Save');
    this.context.router.push('/authors');
  }

  render() {
    return (
      <AuthorForm
        onChange={this.updateAuthorState}
        onSave={this.saveAuthor}
        author={this.state.author}
        errors={this.state.errors}
        saving={this.state.saving}
      />
    );
  }

}

ManageAuthorPage.propTypes = {
  author: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

ManageAuthorPage.contextTypes = {
  router: PropTypes.object
};

function getAuthorById(authors, authorId) {
  const author = authors.filter(authors => authors.id == authorId);
  if (author.length) return author[0]; //since filter returns an array, have to grab the first item.
  return null;
}

function mapStateToProps(state, ownProps) {
  const authorId = ownProps.params.id;//from the path /author/:id

  let author = {id: '', firstName: '', lastName: '', yearsExpirience: 0, enabled: true};

  if (authorId && state.authors.length > 0){
    author = getAuthorById(state.authors, authorId);
  }

  return {
    author: author
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authorActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
