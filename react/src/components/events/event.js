/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import EventModal from './eventModal';
import { toggleUpsertModal } from '../../store/actions/eventCollectionActions';

class EventPage extends React.Component {
    showEventModal(eventId) {
        this.props.toggleUpsertModal(true);
    }

    showDeleteEventModal(eventId) {
        // call action to update store
    }

    render() {
        return (
            <div>
                <Button
                    className=""
                    variant="success"
                    size="sm"
                    onClick={() => this.showEventModal('0', 'New Event')}
                >
                    New Event
                </Button>
                {/* <Button
          className=""
          variant="outline-danger"
          size="sm"
          onClick={() => this.showDeleteEventModal(value.id, value.data().itemTitle)}
        >
                      Delete
        </Button> */}

                <EventModal
                    eventId={
                        this.props.events.targetEventId
                    }
                    show={this.props.events.upsertModalShow}
                    onHide={() => this.props.toggleUpsertModal(false)}
                    onHideWithUpsert={
                        () => {
                            this.props.toggleUpsertModal(false);
                        }
                    }
                    eventTitle={this.props.events.title}

                />

            </div>
        );
    }
}

export default connect(
    (state) => ({ auth: state.auth, events: state.events }),
    ({
        toggleUpsertModal
    })
)(EventPage);
