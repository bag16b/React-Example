import React from 'react';
import { Link } from 'react-router';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export default class Header extends React.Component {
  render() {
        if(this.getCookie("username") === ""){
            return(<div></div>);
        }
    return (
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>4/20 Book Shopper</Navbar.Brand>
          </Navbar.Header>
          <Nav>
            <LinkContainer to="/books">
              <NavItem>Books</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <NavItem><Glyphicon glyph="shopping-cart" /> Shopping Cart</NavItem>
            <NavDropdown id="user-dropdown" title={<Glyphicon glyph="option-horizontal" />} noCaret>
              <MenuItem onClick={(e) => {
                e.preventDefault();
                this.setCookie("username", "", -10);
                }}>Logout</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar>
    );
  }

  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
  }
  checkCookie() {
    var username = this.getCookie("username");
    if (username != "") {
        return username;
    } else {
        return "";
    }
  }
  setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
}