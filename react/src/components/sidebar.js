/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { connect } from 'react-redux';
import NavListItem from './navListItem';

class SideBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapseMenu: true
    };
  }

  componentDidMount() {
    // this.props.fetchAuth();
  }

  toggleCollapse() {
    this.setState((prevState) => ({ collapseMenu: !prevState.collapseMenu }));
  }

  render() {
    return (
      <div className="sidebar">
        <div className="top-row pl-4 navbar navbar-dark">
          <a className="navbar-brand" id="mainLogo" to="/">SimplePlanner</a>
          <button className="navbar-toggler" onClick={() => this.toggleCollapse()}>
            <span className="navbar-toggler-icon" />
          </button>
        </div>

        <div className={this.state.collapseMenu ? 'collapse' : ''} onClick={() => this.toggleCollapse()}>
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
                <NavListItem route="notes" label="Notes" icon="align-left" />
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
