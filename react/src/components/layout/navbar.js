import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

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
        let returnVal = path;
        // if at root, set as Home
        if (returnVal === '/') {
            return 'Home ';
        }
        // remove initial slash
        returnVal = returnVal.substr(1);
        // upper the first character
        returnVal = returnVal.charAt(0).toUpperCase() + returnVal.slice(1);
        return returnVal;
    }

    syncStatusText() {
        if (!this.props.syncedStatus.synced) {
            return 'Syncing ...';
        }
        if (!this.props.syncedStatus.connected) {
            return 'Lost connection to the Database';
        }
        return 'Synced';
    }

    render() {
        return (
            <div className="top-row px-4">
                <span className="left-justify" style={{ marginRight: 'auto' }}>
                    {this.formatPathDate(this.props.location.pathname)}
                </span>

                <span>{this.syncStatusText()}</span>
            </div>
        );
    }
}

export default connect(
    (state) => ({ syncedStatus: state.syncedStatus }),
    ({
    })
)(withRouter(NavBar));
