import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// eslint-disable-next-line react/prefer-stateless-function
class Home extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    // this.props.fetchAuth();
  }

  render() {
    return (
      <div>
        <Link className="btn" to="/">Quick Play!</Link>
        <br />
        <br />
        <Link className="btn btn-primary" to="/createPrivateGame">Make Private Game</Link>
        <br />
        <br />
        <Link className="btn btn-primary" to="/">Join Private Game</Link>
      </div>
    );
  }
}

export default connect(
  (state) => ({ auth: state.auth }),
  ({
  })
)(Home);
