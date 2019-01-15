import React from 'react';
import 'whatwg-fetch';
import { Link } from 'react-router';

//import IssueAdd from './IssueAdd.jsx';
//import IssueFilter from './IssueFilter.jsx';

const IssueRow = (props) => {
  function onDeleteClick() {
    props.deleteIssue(props.issue._id);
  }

  return (
    <tr>
      <td><Link to={`/books/${props.issue._id}`}>{props.issue._id.substr(-4)}</Link></td>
      <td>{props.issue.Title}</td>
      <td>{props.issue.Genre}</td>
    </tr>
  );
};

IssueRow.propTypes = {
  issue: React.PropTypes.object.isRequired,
  deleteIssue: React.PropTypes.func.isRequired,
};

function recentBooks(prop) {
  const issueRows = props.issues.map(issue =>
    <IssueRow key={issue._id} issue={issue} deleteIssue={props.deleteIssue} />
  );
  var date = new Date();
  //if(props.issue.date)

}




function IssueTable(props) {
  const issueRows = props.issues.map(issue =>
    <IssueRow key={issue._id} issue={issue} deleteIssue={props.deleteIssue} />
  );
  return (
    <table className="bordered-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Genre</th>
        </tr>
      </thead>
      <tbody>{issueRows}</tbody>
    </table>
  );
}




IssueTable.propTypes = {
  issues: React.PropTypes.array.isRequired,
  deleteIssue: React.PropTypes.func.isRequired,
};



export default class BookList extends React.Component {
  constructor() {
    super();
    this.state = { issues: [] };

    //this.createIssue = this.createIssue.bind(this);
    //this.setFilter = this.setFilter.bind(this);
    this.deleteIssue = this.deleteIssue.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

 /* componentDidUpdate(prevProps) {
    const oldQuery = prevProps.location.query;
    const newQuery = this.props.location.query;
    if (oldQuery.status === newQuery.status
        && oldQuery.effort_gte === newQuery.effort_gte
        && oldQuery.effort_lte === newQuery.effort_lte) {
      return;
    }
    this.loadData();
  }*/

  /*setFilter(query) {
    this.props.router.push({ pathname: this.props.location.pathname, query });
  }*/

  loadData() {
    fetch(`/api/issues${this.props.location.search}`).then(response => {
      if (response.ok) {
        response.json().then(data => {
          data.records.forEach(issue => {
            issue.created = new Date(issue.created);
            if (issue.completionDate) {
              issue.completionDate = new Date(issue.completionDate);
            }
          });
          this.setState({ issues: data.records });
        });
      } else {
        response.json().then(error => {
          alert(`Failed to fetch issues ${error.message}`);
        });
      }
    }).catch(err => {
      alert(`Error in fetching data from server: ${err}`);
    });
  }

 /* createIssue(newIssue) {
    fetch('/api/issues', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newIssue),
    }).then(response => {
      if (response.ok) {
        response.json().then(updatedIssue => {
          updatedIssue.created = new Date(updatedIssue.created);
          if (updatedIssue.completionDate) {
            updatedIssue.completionDate = new Date(updatedIssue.completionDate);
          }
          const newIssues = this.state.issues.concat(updatedIssue);
          this.setState({ issues: newIssues });
        });
      } else {
        response.json().then(error => {
          alert(`Failed to add issue: ${error.message}`);
        });
      }
    }).catch(err => {
      alert(`Error in sending data to server: ${err.message}`);
    });
  }*/

  deleteIssue(id) {
    fetch(`/api/issues/${id}`, { method: 'DELETE' }).then(response => {
      if (!response.ok) alert('Failed to delete issue');
      else this.loadData();
    });
  }

  

  render() {
    //this.checkCookie();
    return (
      <div>
        <IssueTable issues={this.state.issues} deleteIssue={this.deleteIssue} />
      </div>
    );
  }
}

BookList.propTypes = {
  location: React.PropTypes.object.isRequired,
  router: React.PropTypes.object,
};
