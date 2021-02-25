import React from 'react';
import { connect } from 'react-redux';

class SettingsPage extends React.Component {
    // constructor(props) {
    //   super(props);
    // }
    componentDidMount() {
        // this.props.fetchAuth();
    }

    render() {
        return (
            <div>
                SettingsPage
            </div>
        );
    }
}

export default connect(
    (state) => ({ auth: state.auth }),
    ({
    })
)(SettingsPage);
