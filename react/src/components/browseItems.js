import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addItem } from '../services/itemIndexEntity/action';

class BrowseItems extends React.Component {
  componentDidMount() {
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
                onClick={() => this.props.addItem(
                  { itemPath: '/', itemTitle: 'NewItem', itemType: this.props.itemType },
                  this.props.auth.uid
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
                .map((value) => <li key={value.id}><Link to="note">{value.data().itemTitle}</Link><button type="button" className="btn btn-sm" onClick={this.props.dismissAlert}>delete</button></li>)
            }
          </>
        )}
      </>


    );
  }
}

export default connect(
  (state) => ({ auth: state.auth, itemIndex: state.itemIndex }),
  ({
    addItem
  })
)(BrowseItems);
