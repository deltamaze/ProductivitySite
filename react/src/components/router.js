import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import SignInPage from './signin';
import PrivateRoute from './privateRoute';
import Home from './home';
import CreatePrivateGame from './createPrivateGame';
import CalendarPage from '../pages/calander';
import EventPage from '../pages/event';
import JournalPage from '../pages/journal';
import NotePage from '../pages/note';
import PlannerPage from '../pages/planner';
import ProjectPage from '../pages/project';
import RecurringPage from '../pages/recurring';

// 404Screen
const NotFoundScreen = () => <h1>404</h1>;
// Counter


let CounterScreen = props => (
  <div>
    <h1>Counter: {props.counter}</h1>
    <button onClick={props.increment}>Increment</button>
    <button onClick={props.decrement}>Decrement</button>
  </div>
);
CounterScreen = connect(
  state => ({ counter: state.counter }),
  dispatch => ({
    increment: () => dispatch({ type: 'INC' }),
    decrement: () => dispatch({ type: 'DEC' })
  })
)(CounterScreen);

// pagesrouter

class PageRouter extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    // this.props.fetchAuth();
  }


  renderSwitch() {
    if (this.props.auth.uid === '') {
      return (
        <div>Loading...</div>
      );
    } if (this.props.auth.uid !== '') {
      return (
        <div className="content px-4">
          <Switch>
            <PrivateRoute path="/" exact component={Home} />
            <PrivateRoute path="/counter" component={CounterScreen} />
            <Route path="/signin" component={SignInPage} />
            <PrivateRoute path="/createPrivateGame" component={CreatePrivateGame} />
            <PrivateRoute path="/calendar" component={CalendarPage} />
            <PrivateRoute path="/event" component={EventPage} />
            <PrivateRoute path="/journal" component={JournalPage} />
            <PrivateRoute path="/planner" component={PlannerPage} />
            <PrivateRoute path="/recurring" component={RecurringPage} />
            <PrivateRoute path="/project" component={ProjectPage} />
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
  state => ({ auth: state.auth }),
  ({
  })
)(PageRouter);
