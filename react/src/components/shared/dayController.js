import React from 'react';
import { connect } from 'react-redux';
import { getDayNumber } from '../../utilities/dateHelper';
import { setMonth } from '../../store/actions/monthCollectionActions';
import { setSyncedStatus, setNotSyncedStatus } from '../../store/actions/syncedStatusAction';
import debounce from '../../utilities/debounce';
import { generateMonthPayload, getDayElement } from '../../utilities/monthHelper';
import DaySelector from './daySelector';

class DayController extends React.Component {
    static plannerPlaceHolder() {
        // quote array
        const quotes = ['“By Failing to prepare, you are preparing to fail.” – Benjamin Franklin',
            '“Give me six hours to chop down a tree and I will spend the first four sharpening the axe.” – Abraham Lincoln',
            '“The more time you spend contemplating what you should have done…you lose valuable time planning what you can and will do.” – Lil Wayne',
            '“It takes as much energy to wish as it does to plan.” – Eleanor Roosevelt',
            '“A man who does not plan long ahead will find trouble at his door.” – Confucius',
            '“Always plan ahead. It wasn’t raining when Noah built the ark.” – Richard Cushing',
            '“Someone’s sitting in the shade today because someone planted a tree a long time ago.” – Warren Buffett',
            '“Our goals can only be reached through a vehicle of a plan, in which we must fervently believe, and upon which we must vigorously act. There is no other route to success.” – Pablo Picasso',
            '“Setting a goal is not the main thing. It is deciding how you will go about achieving it and staying with that plan.” – Tom Landry',
            '“Unless you have definite, precise, clearly set goals, you are not going to realize the maximum potential that lies within you.” – Zig Ziglar',
            '“Before anything else, preparation is the key to success.” – Alexander Graham Bell',
            '“It is not the strongest of the species that survive, not the most intelligent, but the one most responsive to change.” – Charles Darwin',
            '"Plans Are Worthless, But Planning Is Everything" - Dwight D. Eisenhower'
        ];
        // pick random quote
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        // ad to planner placeholder

        return (`Describe the days plans here...\n\n\n${randomQuote}`);
    }

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this); // to grab event data, need to bind
        this.setMonthWithDebounce = debounce(this.props.setMonth, 3000);
        this.state = {
            mainTextArea: ''
        };
    }

    componentDidMount() {
        this.syncLocalStateToFirebaseData();
        this.setSyncedStatus();
    }

    componentDidUpdate(prevProps) {
        // change of day, or uid, do a local state sync to firebase,
        // or when firebase month ref gets updated
        if (this.props.selectedDate.date !== prevProps.selectedDate.date
            || this.props.auth.uid != prevProps.auth.uid
            || this.props.month.monthRef !== prevProps.month.monthRef) {
            this.syncLocalStateToFirebaseData();
        }
        this.setSyncedStatus();
    }

    componentWillUnmount() {
        this.props.setSyncedStatus();
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
        // if local state != firebase state, notify syncedStatus
        this.setSyncedStatus();
        // package us a new month object to post back to firebase
        this.setMonthWithDebounce(newMonth, this.props.month.monthRef, this.props.auth.uid);
    }

    setSyncedStatus() {
        const day = getDayNumber(this.props.selectedDate.date);

        if (this.state.mainTextArea != getDayElement(day,
            this.props.month.monthData,
            this.props.element)) {
            this.props.setNotSyncedStatus();
        } else {
            this.props.setSyncedStatus();
        }
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
                                placeholder={
                                    this.props.element == 'planner'
                                        ? DayController.plannerPlaceHolder()
                                        : 'Describe your thoughts for the day here...'
                                }
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
        setMonth, setSyncedStatus, setNotSyncedStatus
    })
)(DayController);
