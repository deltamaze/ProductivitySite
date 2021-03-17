import React from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { setSettings } from '../../store/actions/settingsActions';

class SettingsPage extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this); // to grab event data, need to bind
    }

    componentDidMount() {
    }

    // eslint-disable-next-line class-methods-use-this
    handleChange(event) {
        // create package
        const firebasePackage = {
            theme: this.props.settings.settingsData.theme,
            colorOne: this.props.settings.settingsData.colorOne,
            colorTwo: this.props.settings.settingsData.colorTwo
        };
        if (firebasePackage.theme == undefined) {
            firebasePackage.theme = '';
        }
        if (firebasePackage.colorOne == undefined) {
            firebasePackage.colorOne = '';
        }
        if (firebasePackage.colorTwo == undefined) {
            firebasePackage.colorTwo = '';
        }
        // depending on event target, load new value from event
        switch (event.target.id) {
            case 'radioLight':
                firebasePackage.theme = 'Light';
                break;
            case 'radioDark':
                firebasePackage.theme = 'Dark';
                break;
            case 'colorOne':
                firebasePackage.colorOne = event.target.value;
                break;
            case 'colorTwo':
                firebasePackage.colorTwo = event.target.value;
                break;

            default:
                break;
        }
        this.props.setSettings(firebasePackage, this.props.auth.uid);
    }

    presetClick(theme, colorOne, colorTwo) {
        const firebasePackage = {
            theme,
            colorOne,
            colorTwo
        };
        this.props.setSettings(firebasePackage, this.props.auth.uid);
    }

    render() {
        const colorInputMargin = { marginLeft: '10px' };
        return (
            <>
                {(this.props.settings === 'Loading') ? (
                    <div>Loading...</div>
                )
                    : (
                        <>
                            <h3>
                                Themes
                            </h3>
                            <ul>
                                <li style={{ marginBottom: '20px' }}>
                                    Default
                                    <Button
                                        className="marginLeft20"
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={
                                            () => this.presetClick(
                                                'Light', '#0026AD', '#4B0066'
                                            )
                                        }
                                    >Set
                                    </Button>
                                </li>
                                <li style={{ marginBottom: '20px' }}>
                                    Midnight
                                    <Button
                                        className="marginLeft20"
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={
                                            () => this.presetClick(
                                                'Dark', '#000000', '#202020'
                                            )
                                        }
                                    >Set
                                    </Button>
                                </li>
                                <li style={{ marginBottom: '20px' }}>
                                    Neon Dark
                                    <Button
                                        className="marginLeft20"
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={
                                            () => this.presetClick(
                                                'Dark', '#6305c2', '#00eeff'
                                            )
                                        }
                                    >Set
                                    </Button>
                                </li>
                                <li style={{ marginBottom: '20px' }}>
                                    Simple Light
                                    <Button
                                        className="marginLeft20"
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={
                                            () => this.presetClick(
                                                'Light', '#242424', '#242424'
                                            )
                                        }
                                    >Set
                                    </Button>
                                </li>
                                <li style={{ marginBottom: '20px' }}>
                                    Blackout
                                    <Button
                                        className="marginLeft20"
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={
                                            () => this.presetClick(
                                                'Dark', '#0C0C0C', '#0C0C0C'
                                            )
                                        }
                                    >Set
                                    </Button>
                                </li>
                            </ul>
                            <h3>
                                Custom
                            </h3>
                            <div className="form-check">

                                <label className="form-check-label" htmlFor="radioLight">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="radioLight"
                                        onChange={this.handleChange}
                                        checked={this.props.settings.settingsData.theme === 'Light'}
                                    />
                                    Light
                                </label>
                            </div>
                            <div className="form-check">

                                <label className="form-check-label" htmlFor="radioDark">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault"
                                        id="radioDark"
                                        onChange={this.handleChange}
                                        checked={this.props.settings.settingsData.theme === 'Dark'}
                                    />
                                    Dark
                                </label>
                            </div>
                            <br />
                            <h3>
                                Colors
                            </h3>
                            <label htmlFor="colorOne">First Choice
                                <input
                                    style={colorInputMargin}
                                    type="color"
                                    id="colorOne"
                                    name="colorOne"
                                    onChange={this.handleChange}
                                    value={this.props.settings.settingsData.colorOne || '#000000'}
                                />
                            </label>
                            <br />
                            <label htmlFor="colorTwo">Second Choice
                                <input
                                    style={colorInputMargin}
                                    type="color"
                                    id="colorTwo"
                                    name="colorTwo"
                                    onChange={this.handleChange}
                                    value={this.props.settings.settingsData.colorTwo || '#000000'}
                                />
                            </label>
                        </>
                    )}
            </>
        );
    }
}

export default connect(
    (state) => ({ auth: state.auth, settings: state.settings }),
    ({
        setSettings
    })
)(SettingsPage);
