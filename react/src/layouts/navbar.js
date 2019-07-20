import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../services/auth/action';

// eslint-disable-next-line react/prefer-stateless-function
class NavBar extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    // this.props.fetchAuth();
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
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/counter">Counter</Link>
              </li>
              <li className="nav-item">
                {
                  this.props.auth.userToken == ''
                    ? <Link className="nav-link" to="/signin">Login</Link>
                    : <Link className="nav-link" onClick={this.props.logout} to="/signin">Logout</Link>
                }
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default connect(
  state => ({ auth: state.auth }),
  ({
    logout
  })
)(NavBar);
