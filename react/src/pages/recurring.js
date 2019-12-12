import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';


class RecurringPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      eventModalShow: false,
      targetRecurEventId: '',
      targetRecurEventTitle: ''
    };
  }
  componentDidMount() {
    // this.props.fetchAuth();
  }

  showEventModal(eventId, itemTitle) {
    this.setState({
      modalShow: true,
      targetItemId: itemId,
      targetItemTitle: itemTitle
    });
  }
  showEventModal(itemId, itemTitle) {
    this.setState({
      modalShow: true,
      targetItemId: itemId,
      targetItemTitle: itemTitle
    });
  }

  render() {
    return (
      <div>
        RecurringPage
        <Button
          className=""
          variant="outline-danger"
          size="sm"
          onClick={() => this.showConfirmDeleteModal(value.id, value.data().itemTitle)}
        >
                      New Recursive Event
        </Button>
      </div>
    );
  }
}

export default connect(
  (state) => ({ auth: state.auth }),
  ({
  })
)(RecurringPage);
