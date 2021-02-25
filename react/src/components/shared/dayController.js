import React from 'react';
import { connect } from 'react-redux';
import { getDayNumber } from '../../utilities/dateHelper';
import { setMonth } from '../../store/actions/monthCollectionActions';
import debounce from '../../utilities/debounce';
import { generateMonthPayload, getDayElement } from '../../utilities/monthHelper';
import DaySelector from './daySelector';

class DayController extends React.Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this); // to grab event data, need to bind
        this.setMonthWithDebounce = debounce(this.props.setMonth, 1000);
        this.state = {
            mainTextArea: ''
        };
    }

    componentDidMount() {
        this.syncLocalStateToFirebaseData();
    }

    componentDidUpdate(prevProps) {
        // change of day, or uid, do a local state sync to firebase,
        // or when firebase month ref gets updated
        if (this.props.selectedDate.date !== prevProps.selectedDate.date
            || this.props.auth.uid != prevProps.auth.uid
            || this.props.month.monthRef !== prevProps.month.monthRef) {
            this.syncLocalStateToFirebaseData();
        }
    }

    handleChange(event) {
        this.setState({
            mainTextArea: event.target.value // handle input and update text box
        });
        const day = getDayNumber(this.props.selectedDate.date);
        const newMonth = generateMonthPayload(day,
            this.props.element,
            event.target.value,
            this.props.month.monthData);
        // package us a new month object to post back to firebase
        this.setMonthWithDebounce(newMonth, this.props.month.monthRef, this.props.auth.uid);
    }

    syncLocalStateToFirebaseData() {
        const day = getDayNumber(this.props.selectedDate.date);

        this.setState({
            mainTextArea:
                getDayElement(day,
                    this.props.month.monthData,
                    this.props.element) // handle input and update text box
        });
    }

    render() {
        return (
            <>
                {(this.props.month.monthData === 'Loading') ? (
                    <div>Loading...</div>
                )
                    : (
                        <>
                            <DaySelector />
                            <textarea
                                id="mainTextAreaInput"
                                value={this.state.mainTextArea}
                                onChange={this.handleChange}
                                placeholder={this.props.element == 'planner' ? 'Describe the days plans here...' : 'Describe your thoughts for the day here...'}
                            />
                        </>
                    )}
            </>
        );
    }
}

export default connect(
    (state) => ({ auth: state.auth, selectedDate: state.selectedDate, month: state.month }),
    ({
        setMonth
    })
)(DayController);
