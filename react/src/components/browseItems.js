import React from 'react';
import { Link } from 'react-router-dom';
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

  redirectToNewItem(itemId){
    console.log("called");
    console.log(itemId);
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
                  this.redirectToNewItem
                )}
              >
            Add New {this.props.itemType.charAt(0).toUpperCase() + this.props.itemType.slice(1)}
              </button>

            </div>
            <br />
        BrowseItems, {this.props.itemType}
        Files:
            {
              this.props.itemIndex.items
                .filter((value) => value.data().itemType === this.props.itemType)
                .map((value) => (
                  <li key={value.id}>
                    <Link to="note">{value.data().itemTitle}</Link>
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
)(BrowseItems);
