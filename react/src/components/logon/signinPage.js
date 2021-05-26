import React from 'react';
import { connect } from 'react-redux';
import { login, loginGuest } from '../../store/actions/authActions';

class SignInPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            googleLoginImage: '../../assets/btn_google_signin_dark_normal_web.png'
        };
    }

    updateGoogleLoginImage(newImagePath) {
        this.setState({ googleLoginImage: newImagePath });
    }



    renderConnectingMsg() {
        if (this.props.auth.uid == 'Connecting') {
            return <div>Connecting to Auth Service...</div>;
        } if (this.props.auth.uid == 'NotLoggedIn') {
            return (
                // eslint-disable-next-line
                <>
                    <img
                        src={this.state.googleLoginImage}
                        onMouseOver={() => this.updateGoogleLoginImage('../../assets/btn_google_signin_dark_focus_web.png')}
                        onMouseOut={() => this.updateGoogleLoginImage('../../assets/btn_google_signin_dark_normal_web.png')}
                        onMouseDown={() => this.updateGoogleLoginImage('../../assets/btn_google_signin_dark_pressed_web.png')}
                        onClick={this.props.login}
                        border="0"
                        alt="LoginWithGoogle"
                    />
                    < br />
                    < br />

                    <button className="btn btn-outline-dark" onClick={this.props.loginGuest}>Explore Demo</button>
                </>
            );
        }
        return <div>You are signed in.</div>;
    }

    render() {
        return (
            <div>
                <h1>Login Page</h1>
                {this.renderConnectingMsg()}
            </div>
        );
    }
}

export default connect(
    (state) => ({ auth: state.auth }),
    ({
        login, loginGuest
    })
)(SignInPage);
