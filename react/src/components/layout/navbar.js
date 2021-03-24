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
        // remove second and everything after second slash
        // TODO add more logic to determine if it has a second slash
        // TODO maybe breadcrumb this out https://getbootstrap.com/docs/4.3/components/breadcrumb/
        // returnVal = returnVal.substring(0, returnVal.indexOf('/'));
        // cap first character
        returnVal = returnVal.charAt(0).toUpperCase() + returnVal.slice(1);
        return returnVal;
    }

    render() {
        return (
            <div className="top-row px-4">
                <span className="left-justify" style={{ marginRight: 'auto' }}>
                    {this.formatPathDate(this.props.location.pathname)}
                </span>

                <span
                    style={{ fontsize: '20px' }}
                    className={
                        this.props.syncedStatus.synced ? 'oi oi-cloud' : 'oi oi-cloud-upload'
                    }
                    aria-hidden="true"
                />
            </div>
        );
    }
}

export default connect(
    (state) => ({ syncedStatus: state.syncedStatus }),
    ({
    })
)(withRouter(NavBar));
