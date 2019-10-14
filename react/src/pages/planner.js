import React from 'react';
import { connect } from 'react-redux';
import { setDate } from '../services/targetDate/action';
import { getFormattedDate } from '../utilities/dateFormatter';

// eslint-disable-next-line react/prefer-stateless-function
class PlannerPage extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    // this.props.fetchAuth();
  }

  incrementDate(direction, date) {
    const day = direction * (1000 * 60 * 60 * 24);
    const msDate = parseInt(date, 10);
    const parsedDate = new Date((msDate - day));
    this.props.setDate(parsedDate);
  }

  render() {
    return (
      <>
        <ul className="list-group list-group-horizontal">
          <li className="list-group-item">&lt;&lt;</li>
          <li className="list-group-item">{getFormattedDate(this.props.targetDate.date)}</li>
          <li className="list-group-item"><button onClick={() => this.incrementDate(1, this.props.targetDate.date)}>&gt;&gt;</button></li>
        </ul>
      </>
    );
  }
}

export default connect(
  (state) => ({ auth: state.auth, targetDate: state.targetDate }),
  ({
    setDate
  })
)(PlannerPage);
