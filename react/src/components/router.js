import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import SignInPage from '../pages/signin';
import PrivateRoute from './privateRoute';
import CalendarPage from '../pages/calander';
import EventPage from '../pages/event';
import JournalPage from '../pages/journal';
import BrowseNotePage from '../pages/browseNotes';
import NotePage from '../pages/note';
import PlannerPage from '../pages/planner';
import ProjectPage from '../pages/project';
import RecurringPage from '../pages/recurring';
import SignOffPage from '../pages/signoff';

// 404Screen
const NotFoundScreen = () => <h1>404</h1>;
// Counter

// pagesrouter

class PageRouter extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    // this.props.fetchAuth();
  }


  renderSwitch() {
    if (this.props.auth.uid === 'Connecting') {
      return (
        <div>Loading...</div>
      );
    } if (this.props.auth.uid !== 'Connecting') {
      return (
        <div className="content px-4">
          <Switch>
            <PrivateRoute path="/" exact component={SignInPage} />
            <Route path="/signin" component={SignInPage} />
            <PrivateRoute path="/signoff" component={SignOffPage} />
            <PrivateRoute path="/calendar" component={CalendarPage} />
            <PrivateRoute path="/event" component={EventPage} />
            <PrivateRoute path="/journal" component={JournalPage} />
            <PrivateRoute path="/planner" component={PlannerPage} />
            <PrivateRoute path="/recurring" component={RecurringPage} />
            <PrivateRoute path="/projects" component={ProjectPage} />
            <PrivateRoute path="/notes" component={BrowseNotePage} />
            <PrivateRoute path="/note" component={NotePage} />
            <Route path="*" component={NotFoundScreen} />
          </Switch>
        </div>
      );
    }
    return null;
  }


  render() {
    return (
      this.renderSwitch()
    );
  }
}


export default connect(
  (state) => ({ auth: state.auth }),
  ({
  })
)(PageRouter);
