/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import NavListItem from './navListItem';
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
            {(this.props.auth.uid == 'Connecting' || this.props.auth.uid == 'NotLoggedIn') ? (
              <NavListItem route="signin" label="Log In" icon="account-login" />
            ) : (// react fragment shorthand below,update babel first...
              <>
                <NavListItem route="planner" label="Planner" icon="list" />
                <NavListItem route="calendar" label="Calendar" icon="calendar" />
                <NavListItem route="recurring" label="Recurring" icon="reload" />
                <NavListItem route="event" label="Events" icon="flag" />
                <NavListItem route="project" label="Project Tracker" icon="project" />
                <NavListItem route="note" label="Notes" icon="align-left" />
                <NavListItem route="journal" label="Journal" icon="book" />
                <NavListItem route="signoff" label="LogOff" icon="account-logout" />
              </>
            )}

          </ul>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({ auth: state.auth }),
  ({
  })
)(SideBar);