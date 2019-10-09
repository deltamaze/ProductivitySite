/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// eslint-disable-next-line react/prefer-stateless-function
class SideBar extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    // this.props.fetchAuth();
  }

  render() {
    return (
      <div className="sidebar">
        <div className="top-row pl-4 navbar navbar-dark">
          <a className="navbar-brand" id="mainLogo" to="">Planner</a>
          <button className="navbar-toggler">
            <span className="navbar-toggler-icon" />
          </button>
        </div>

        <div className="">
          <ul className="nav flex-column">

            <li className="nav-item px-3">
              <Link className="nav-link" to="planner">
                <span className="oi oi-list" aria-hidden="true" /> Planner
              </Link>
            </li>
            <li className="nav-item px-3">
              <Link className="nav-link" to="calendar">
                <span className="oi oi-calendar" aria-hidden="true" /> Calendar
              </Link>
            </li>
            <li className="nav-item px-3">
              <Link className="nav-link" to="recurring">
                <span className="oi oi-reload" aria-hidden="true" /> Recurring
              </Link>
            </li>
            <li className="nav-item px-3">
              <Link className="nav-link" to="flaggedEvents">
                <span className="oi oi-flag" aria-hidden="true" /> Flagged Events
              </Link>
            </li>
            <li className="nav-item px-3">
              <Link className="nav-link" to="projects">
                <span className="oi oi-project" aria-hidden="true" />Project Tracker
              </Link>
            </li>
            <li className="nav-item px-3">
              <Link className="nav-link" to="notes">
                <span className="oi oi-align-left" aria-hidden="true" />Notes
              </Link>
            </li>
            <li className="nav-item px-3">
              <Link className="nav-link" to="journal">
                <span className="oi oi-book" aria-hidden="true" />Journal
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ auth: state.auth }),
  ({
  })
)(SideBar);
