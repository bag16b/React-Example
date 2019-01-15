import React from 'react';
import { Link } from 'react-router';
import { Router, Route, Redirect, browserHistory, withRouter } from 'react-router';
import { LinkContainer } from 'react-router-bootstrap'
import { Button, FormGroup, FormControl, ControlLabel, InputGroup, Form ,Col, ButtonToolbar} from 'react-bootstrap';

export default class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      issue: {
        email: '', password: '',
      },
      invalidFields: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    //this.loadData();
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

  onSubmit(event) {
    event.preventDefault();
    
    fetch(`/api/signIn/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state.issue),
    }).then(response => {
      if (response.ok) {
        response.json().then(user => {
          this.setCookie("username", user.username, 365);
        });
          this.props.router.push('/books');
      } else {
        response.json().then(error => {
          alert(`Failed to Log User In: ${error.message}`);
        });
      }
    }).catch(err => {
      alert(`Error in sending data to server: ${err.message}`);
    });
  }

  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }


  render() {
    const issue = this.state.issue;
    const validationMessage = Object.keys(this.state.invalidFields).length === 0 ? null
      : (<div className="error">Please correct invalid fields before submitting.</div>);
    return (
      <div>
        <Form horizontal onSubmit={this.onSubmit}>
        <FormGroup>
            <Col componentClass={ControlLabel} sm={5}>Email</Col>
            <Col sm={3}>
              <FormControl name="email" value={issue.email} onChange={this.onChange} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel} sm={5}>Password</Col>
            <Col sm={3}>
              <FormControl name="password" value={issue.password} onChange={this.onChange} />
            </Col>
          </FormGroup>
          {validationMessage}
          <FormGroup>
            <Col smOffset={5} sm={6}>
              <ButtonToolbar>
                <Button bsStyle="primary" type="submit">Submit</Button>
                <LinkContainer to="/issues">
                  <Button bsStyle="link">Back</Button>
                </LinkContainer>
              </ButtonToolbar>
            </Col>
          </FormGroup>
          <Link to="/register">Are you an idiot and clicked the link to sign in knowing full well you don't have an account and actually need one? Click here.</Link>
        </Form>
      </div>
    );
  }
}

SignIn.propTypes = {
  params: React.PropTypes.object.isRequired,
};
