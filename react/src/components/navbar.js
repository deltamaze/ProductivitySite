/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// eslint-disable-next-line react/prefer-stateless-function
class NavBar extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    // this.props.fetchAuth();
  }

  renderNavItems() {
    if (this.props.auth.uid === '') {
      return (<ul className="navbar-nav"><li className="nav-item">Loading...</li></ul>);
    } if (this.props.auth.username === '') {
      return (
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/signin">Set Username</Link>
          </li>
        </ul>
      );
    }
    if (this.props.auth.username !== '') {
      return (
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Menu</Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Welcome back {this.props.auth.username}
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <Link className="nav-link" to="/signin">Change Username</Link>
            </div>
          </li>
        </ul>
      );
    }
    return null;
  }


  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="/">ReactReduxStarter</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            {this.renderNavItems()}
          </div>
        </nav>
      </div>
    );
  }
}

export default connect(
  state => ({ auth: state.auth }),
  ({
  })
)(NavBar);
