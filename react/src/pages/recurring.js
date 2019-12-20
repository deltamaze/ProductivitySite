import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import RecurringEventModal from '../components/recurringEventModal';

class RecurringPage extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      eventModalShow: false,
      eventDeleteModalShow: false,
      targetRecurEventId: '',
      targetRecurEventTitle: ''
    };
  }
  showEventModal(eventId, eventTitle) {
    console.log(eventId);
    this.setState({
      targetRecurEventId: eventId,
      targetRecurEventTitle: eventTitle,
      eventModalShow: true,
      eventDeleteModalShow: false,
    });
  }

  showDeleteEventModal(eventId, eventTitle) {
    this.setState({
      eventModalShow: false,
      eventDeleteModalShow: true,
      targetRecurEventId: eventId,
      targetRecurEventTitle: eventTitle
    });
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
          console.log(),
          this.state.targetRecurEventId
        }
          show={this.state.eventModalShow}
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
  (state) => ({ auth: state.auth }),
  ({
  })
)(RecurringPage);
