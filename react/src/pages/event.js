import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import ConfirmModal from '../components/confirmModal';

class EventPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalShow: false,
      targetItemId: '',
      targetItemTitle: ''
    };
  }

  componentDidMount() {
    // this.props.fetchAuth();
    // console.log(this.props);
  }

  render() {
    return (
      <>
        {(this.props.events.eventData === 'Loading') ? (
          <div>Loading...</div>
        ) : (
          <>
            <div>
              {/* <button
                className="btn btn-sm btn-success "
                onClick={() => this.props.addItemWithRedirect(
                  { itemPath: '/', itemTitle: 'NewItem', itemType: this.props.itemType },
                  this.props.auth.uid,
                  (newId) => {
                    this.props.history.push(`note/${newId}`);
                  }
                )}
              >
            Add New {this.props.itemType.charAt(0).toUpperCase() + this.props.itemType.slice(1)}
              </button> */}

            </div>
            {
              this.props.events.eventData
                .map((value) => (
                  <li className="marginBottom15" key={value.id}>
                    <Button
                      className="marginLeft20"
                      variant="outline-danger"
                      size="sm"
                      onClick={() => this.showConfirmDeleteModal(value.id, value.data().eventTitle)}
                    >
                      Delete
                    </Button>
                  </li>
                ))
            }
          </>
        )}
        <ConfirmModal
          show={this.state.modalShow}
          onHide={() => this.setState({ modalShow: false })}
          onHideWithDelete={
            () => {
              this.setState({ modalShow: false });
              this.props.deleteItem(this.state.targetItemId, this.props.auth.uid);
            }
          }
          itemTitle={this.state.targetItemTitle}
        />
      </>


    );
  }
}

export default connect(
  (state) => ({ auth: state.auth, events: state.events }),
  ({
  })
)(EventPage);
