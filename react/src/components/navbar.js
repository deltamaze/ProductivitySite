/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import { getFormattedDate } from '../utilities/dateFormatter';

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
      <div className="top-row px-4">
        <span className="left-justify">[Target Date=&gt;{getFormattedDate(this.props.targetDate.date)}]
        [Todays date=&gt;{getFormattedDate(Date.now())}]
        </span>
      </div>
    );
  }
}

export default connect(
  (state) => ({ auth: state.auth, targetDate: state.targetDate }),
  ({
  })
)(NavBar);
