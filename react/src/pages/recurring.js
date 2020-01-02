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
      targetRecurEventId: '0',
      title: '',
      description: '',
      frequency: 1,
      frequencyType: 'day',
      weekPartSelection: [],
      specifyTime: false,
      startDate: Date.now(),
      endDate: undefined,
      targetRecurEventTitle: '',
      // yearlyTargetMonth: getMonthName(new Date.now()),
      specialStartCriteria: undefined
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
    //if eventId is 
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
