import React from 'react';
import { connect } from 'react-redux';

// eslint-disable-next-line react/prefer-stateless-function
class NotePage extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    // this.props.fetchAuth();
  }

  render() {
    return (
      <div>
        BrowseNotePage
      </div>
    );
  }
}

export default connect(
  (state) => ({ auth: state.auth }),
  ({
  })
)(NotePage);
