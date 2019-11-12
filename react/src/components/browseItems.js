import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addItemWithRedirect, deleteItem } from '../services/itemIndexEntity/action';
import ConfirmModal from './confirmModal';

class BrowseItems extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalShow: false,
      targetItemId: '',
      targetItemTitle: ''
    };
  }

  showConfirmDeleteModal(itemId, itemTitle) {
    this.setState({
      modalShow: true,
      targetItemId: itemId,
      targetItemTitle: itemTitle
    });
  }

  render() {
    return (
      <>
        {(this.props.itemIndex.items === 'Loading') ? (
          <div>Loading...</div>
        ) : (
          <>
            <div>
              <button
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
              </button>

            </div>
            {
              this.props.itemIndex.items
                .filter((value) => value.data().itemType === this.props.itemType)
                .map((value) => (
                  <li key={value.id}>
                    <Link to={`${this.props.itemType}/${value.id}`}>{value.data().itemTitle}</Link>
                    <button
                      type="button"
                      className="btn btn-sm"
                      onClick={() => this.showConfirmDeleteModal(value.id, value.data().itemTitle)}
                    >
                        delete
                    </button>
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
  (state) => ({ auth: state.auth, itemIndex: state.itemIndex }),
  ({
    addItemWithRedirect, deleteItem
  })
)(withRouter(BrowseItems));
