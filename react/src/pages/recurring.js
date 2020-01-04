/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import RecurringEventModal from '../components/recurringEventModal';

class RecurringPage extends React.Component {
  showEventModal(eventId) {
    // call action to update store
    console.log(eventId);
  }

  showDeleteEventModal(eventId) {
    // call action to update store
    console.log(eventId);
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
          New Recurring Event
        </Button>
        {/* <Button
          className=""
          variant="outline-danger"
          size="sm"
          onClick={() => this.showDeleteEventModal(value.id, value.data().itemTitle)}
        >
                      Delete
        </Button> */}

        <RecurringEventModal
          eventId={
            this.props.recurringEvents.targetEventId
          }
          show={this.props.recurringEvents.upsertModalShow}
          onHide={() => this.setState({ eventModalShow: false })}
          onHideWithUpsert={
            () => {
              this.setState({ eventModalShow: false });
              // this.props.deleteItem(this.state.targetRecurEventId, this.props.auth.uid);
            }
          }
          eventTitle={this.state.targetRecurEventTitle}

        />

      </div>
    );
  }
}

export default connect(
  (state) => ({ auth: state.auth, recurringEvents: state.recurringEvents }),
  ({
  })
)(RecurringPage);
