import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';

const AuthorForm = ({author, onSave, onChange, saving, errors}) => {


  return (
    <form>
      <h1>Manage Author</h1>

      <TextInput
        name="firstName"
        label="First Name"
        value={author.firstName}
        onChange={onChange}
        error={errors.firstName} />

      <TextInput
        name="lastName"
        label="Last Name"
        value={author.lastName}
        onChange={onChange}
        error={errors.lastName} />

      <TextInput
        name="yearsExpirience"
        label="Years Expirience"
        value={author.yearsExpirience}
        onChange={onChange}
        error={errors.yearsExpirience} />
      <div className="form-group">
        <label>Enabled</label>
        <div className="field">
          <input
            name="enabled"
            type="checkbox"
            checked={author.enabled}
            value={author.enabled}
            onChange={onChange}
          />
        </div>
      </div>
      <div>
        <br/>
        <input
          type="submit"
          disabled={saving}
          value={saving? 'Saving...' : 'Save'}
          className="btn btn-primary"
          onClick={onSave} />
      </div>

    </form>
  );
};

AuthorForm.propTypes = {
  author: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  errors: PropTypes.object.isRequired
};

export default AuthorForm;
