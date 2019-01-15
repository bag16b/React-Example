import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect, browserHistory, withRouter } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import BookList from './BookList.jsx';
import IssueEdit from './IssueEdit.jsx';
import BookView from './BookView.jsx';
import Register from './Register.jsx';
import SignIn from './SignIn.jsx';
import Header from './Header.jsx';

const contentNode = document.getElementById('contents');
const NoMatch = () => <p>Page Not Found</p>;

/*

<Navbar.Header>
        <Navbar.Brand>
          <a href="#">&#9776; React-Bootstrap
          <img src={logo} style={{width:100, marginTop: -7}} />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>

*/

const App = (props) => (
  <div>
    <div className="header">
      <Header/>
    </div>
    <div className="container-fluid">
      {props.children}
    </div>
    <div className="footer">
      Based on PRO MERN Stack by Vasan Subramanian,Chapter 9 Template available at this <a href="https://github.com/vasansr/pro-mern-stack">
      GitHub repository</a>.
    </div>
  </div>
);

App.propTypes = {
  children: React.PropTypes.object.isRequired,
};

const RoutedApp = () => (
  <Router history={browserHistory} >
    <Redirect from="/" to="/register" />
    <Route path="/" component={App} >
      <Route path="books" component={withRouter(BookList)} />
      <Route path="books/:id" component={BookView}/>
      <Route path="register" component={withRouter(Register)} />
      <Route path="login" component={withRouter(SignIn)} />
      <Route path="*" component={NoMatch} />
    </Route>
  </Router>
);

ReactDOM.render(<RoutedApp />, contentNode);

if (module.hot) {
  module.hot.accept();
}