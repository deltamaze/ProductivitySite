import React from 'react';
import { connect } from 'react-redux';
import { fetchAuth } from '../../store/actions/authActions';
import { fetchMonth } from '../../store/actions/monthCollectionActions';
import { fetchEvents } from '../../store/actions/eventCollectionActions';
import { getMonthYear } from '../../utilities/dateHelper';
import { fetchItemIndex } from '../../store/actions/itemCollectionActions';
import { fetchSettings } from '../../store/actions/settingsActions';
import { fetchConnectedStatus } from '../../store/actions/syncedStatusAction';

class FirebaseServiceStarter extends React.Component {
    componentDidMount() {
        this.props.fetchAuth();
        this.updateMonth();
        this.fetchAuthorizedServices();
        this.setTheme();
        this.props.fetchConnectedStatus();
    }

    componentDidUpdate(prevProps) {
        // change of month
        if (getMonthYear(this.props.selectedDate.date) !== getMonthYear(prevProps.selectedDate.date)
            || this.props.auth.uid != prevProps.auth.uid) { // change of uid status, fetch month
            this.updateMonth();
        }
        if (this.props.auth.uid != prevProps.auth.uid) {
            this.fetchAuthorizedServices(); // logged in
        }
        if (this.props.settings.settingsData.theme != prevProps.settings.settingsData.theme) {
            this.setTheme();
        }
        // TODO determine if user logged out, clear all listeners if so
    }

    setTheme() {
        if (this.props.settings.settingsData.theme == 'Dark') {
            document.body.classList.add('darkMode');
        } else {
            document.body.classList.remove('darkMode');
        }
    }

    fetchAuthorizedServices() {
        if (this.props.auth.uid == 'Connecting' || this.props.auth.uid == 'NotLoggedIn') {
            return;
        }
        this.props.fetchItemIndex(this.props.auth.uid);
        this.props.fetchEvents(this.props.auth.uid);
        this.props.fetchSettings(this.props.auth.uid);
    }

    updateMonth() {
        if (this.props.auth.uid == 'Connecting' || this.props.auth.uid == 'NotLoggedIn') {
            return;
        }
        this.props.fetchMonth(this.props.auth.uid, getMonthYear(this.props.selectedDate.date));
    }

    render() {
        return (
            null
        );
    }
}

export default connect(
    (state) => ({ auth: state.auth, selectedDate: state.selectedDate, settings: state.settings }),
    ({
        fetchAuth, fetchMonth, fetchItemIndex, fetchEvents, fetchSettings, fetchConnectedStatus
    })
)(FirebaseServiceStarter);
