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
        const colorInputMargin = { marginLeft: '10px' };
        return (
            <div>
                <h3>
                    Theme
                </h3>
                <div className="form-check">

                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            checked
                        />
                        Light
                    </label>
                </div>
                <div className="form-check">

                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                        />
                        Dark
                    </label>
                </div>
                <br />
                <h3>
                    Colors
                </h3>
                <label htmlFor="colorOne">First Choice
                    <input style={colorInputMargin} type="color" id="colorOne" name="colorOne" />
                </label>
                <br />
                <label htmlFor="colorTwo">Second Choice
                    <input style={colorInputMargin} type="color" id="colorTwo" name="colorTwo" />
                </label>
            </div>
        );
    }
}

export default connect(
    (state) => ({ auth: state.auth }),
    ({
    })
)(SettingsPage);
