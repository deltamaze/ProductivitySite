import React from 'react';
import { connect } from 'react-redux';
import { dismissAlert, setAlert } from '../services/alerts/action';

// eslint-disable-next-line react/prefer-stateless-function
class AlertBanner extends React.Component {
  componentDidMount() {
    window.onerror = (message, file, line, column, errorObject) => {
      const errorMessage = `Error =>${message}    Info => ${errorObject}`;
      this.props.setAlert(errorMessage);
      // the error can still be triggered as usual
      // we just wanted to know what's happening on the client side
      return false;
    };
  }

  componentDidCatch(error, info) { // catches rendering errors
    // Display fallback UI
    const errorMessage = `Error =>${error}    Info => ${info}`;
    this.props.setAlert(errorMessage);
  }


  render() {
    if (!this.props.alert.dismissed) {
      return (
        <div className="alert alert-danger alert-dismissible" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>Unexpected Error Occured =&gt; {this.props.alert.alertMsg}</p>
          <button type="button" className="close" aria-label="Close" onClick={this.props.dismissAlert}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }
    return this.props.children; // else condition
  }
}
export default connect(
  (state) => ({ alert: state.alert }),
  ({
    dismissAlert, setAlert
  })
)(AlertBanner);
