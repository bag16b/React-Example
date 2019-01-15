import React from 'react';
import { Link } from 'react-router';

import NumInput from './NumInput.jsx';
import DateInput from './DateInput.jsx';

export default class BookView extends React.Component {
  constructor() {
    super();
    this.state = {
      issue: {
        _id: '', ISBN: '', Title: '', Author: '', Genre: '', Summary: '',
      },
      invalidFields: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onValidityChange = this.onValidityChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.params.id !== this.props.params.id) {
      this.loadData();
    }
  }

  onChange(event, convertedValue) {
    const issue = Object.assign({}, this.state.issue);
    const value = (convertedValue !== undefined) ? convertedValue : event.target.value;
    issue[event.target.name] = value;
    this.setState({ issue });
  }

  onValidityChange(event, valid) {
    const invalidFields = Object.assign({}, this.state.invalidFields);
    if (!valid) {
      invalidFields[event.target.name] = true;
    } else {
      delete invalidFields[event.target.name];
    }
    this.setState({ invalidFields });
  }

  onSubmit(event) {
    event.preventDefault();

    if (Object.keys(this.state.invalidFields).length !== 0) {
      return;
    }

    fetch(`/api/issues/${this.props.params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.issue),
    }).then(response => {
      if (response.ok) {
        response.json().then(updatedIssue => {
          updatedIssue.created = new Date(updatedIssue.created);
          if (updatedIssue.completionDate) {
            updatedIssue.completionDate = new Date(updatedIssue.completionDate);
          }
          this.setState({ issue: updatedIssue });
          alert('Updated issue successfully.');
        });
      } else {
        response.json().then(error => {
          alert(`Failed to update issue: ${error.message}`);
        });
      }
    }).catch(err => {
      alert(`Error in sending data to server: ${err.message}`);
    });
  }

  loadData() {
    fetch(`/api/issues/${this.props.params.id}`).then(response => {
      if (response.ok) {
        response.json().then(issue => {
          this.setState({ issue });
        });
      } else {
        response.json().then(error => {
          alert(`Failed to fetch book: ${error.message}`);
        });
      }
    }).catch(err => {
      alert(`Error in fetching data from server: ${err.message}`);
    });
  }

  render() {
    const issue = this.state.issue;
    const validationMessage = Object.keys(this.state.invalidFields).length === 0 ? null
      : (<div className="error">Please correct invalid fields before submitting.</div>);
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          ID: {issue._id}
          <br />
          ISBN: {issue.ISBN}
          <br />
          Title: {issue.Title}
          <br />
          Author: {issue.Author}
          <br />
          Genre: {issue.Genre}
          <br />
          Summary: {issue.Summary}
          <br />
          <br />
          <br />
          <br />
          Rating: <select name="rating" value={issue.status} onChange={this.onChange}>
            <option value="One">One</option>
            <option value="Two">Two</option>
            <option value="Three">Three</option>
            <option value="Four">Four</option>
            <option value="Five">Five</option>
          </select>
          <br />
          Review: <input name="review" value={issue.owner} onChange={this.onChange} />
          <br />
          Add to Wishlist: <input name="wishlist" value={issue.title} type="checkbox" onChange={this.onChange} />
          <br />
          {validationMessage}
          <button type="submit">Submit</button>
          <Link to="/books">Back to book list</Link>
        </form>
      </div>
    );
  }
}

BookView.propTypes = {
  params: React.PropTypes.object.isRequired,
};
