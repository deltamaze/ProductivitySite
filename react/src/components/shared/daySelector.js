import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { setDate } from '../../store/actions/dateSelectActions';
import { getFormattedShortDate, getDayOfWeekShort } from '../../utilities/dateHelper';
import { setMonth } from '../../store/actions/monthCollectionActions';

class DaySelector extends React.Component {
    constructor(props) {
        super(props);
        this.direction = {
            forward: 1,
            backwards: -1,
        };
    }

    routeChange() {
        const path = 'calendar';
        this.props.history.push(path);
    }

    incrementDate(direction, date) {
        const day = direction * (1000 * 60 * 60 * 24);
        let newDate = parseInt(date, 10);
        newDate += day;

        // update state for selectedDate
        this.props.setDate(newDate);
    }

    render() {
        return (
            <>
                <ul className="list-group list-group-horizontal dateControl">
                    <li className="list-group-item  dateControl">
                        <button
                            className="btn btn-outline-dark dateControl"
                            onClick={
                                () => this.incrementDate(
                                    this.direction.backwards,
                                    this.props.selectedDate.date
                                )
                            }
                        >&lt;&lt;
                        </button>
                    </li>
                    <li className="list-group-item  dateControl">
                        <button
                            className="btn btn-light dateControl"
                            onClick={() => this.routeChange()}
                        >
                            <table className="dateControl">
                                <thead>
                                    <tr>
                                        <th>
                                            {getFormattedShortDate(this.props.selectedDate.date)}
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>{getDayOfWeekShort(this.props.selectedDate.date)}</th>
                                    </tr>
                                </thead>
                            </table>
                        </button>
                    </li>
                    <li className="list-group-item  dateControl">
                        <button
                            className="btn btn-outline-dark dateControl"
                            onClick={() => this.incrementDate(
                                this.direction.forward,
                                this.props.selectedDate.date
                            )}
                        >&gt;&gt;
                        </button>
                    </li>
                </ul>
            </>
        );
    }
}

export default connect(
    (state) => ({ auth: state.auth, selectedDate: state.selectedDate }),
    ({
        setDate, setMonth
    })
)(withRouter(DaySelector));
