/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// eslint-disable-next-line react/prefer-stateless-function
class NavBar extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    // this.props.fetchAuth();
  }
  // TODO, rename and get rid of all these eslint disables

  // eslint-disable-next-line class-methods-use-this
  formatPathDate(path) {
    let returVal = path;
    // if at root, set as Home
    if (returVal === '/') {
      return 'Home ';
    }
    // remove initial slash
    returVal = returVal.substr(1);
    // remove second and everythign after second slash
    // TODO add more logit to determine if it has a second slash
    // TODO maybe breadcrumb this out https://getbootstrap.com/docs/4.3/components/breadcrumb/
    // returVal = returVal.substring(0, returVal.indexOf('/'));
    // cap first character
    returVal = returVal.charAt(0).toUpperCase() + returVal.slice(1);
    return returVal;
  }

  render() {
    return (
      <div className="top-row px-4">
        <span className="left-justify">{this.formatPathDate(this.props.location.pathname)}
        </span>
      </div>
    );
  }
}

export default connect(
  () => ({ }),
  ({
  })
)(withRouter(NavBar));
