import React from 'react';
import { connect } from 'react-redux';

class BrowseItems extends React.Component {
  componentDidMount() {
  }

  // TODO make onClick for Add New Item create the item, auto generate a Title, and navigate user to that item page
  render() {
    return (
      <>
        <div>
          <button className="btn btn-sm btn-success " onClick={() => console.log('test')}>
            Add New {this.props.itemType.charAt(0).toUpperCase() + this.props.itemType.slice(1)}
          </button>

        </div>
        <br />
        BrowseItems, {this.props.itemType}
        Files:
        {
          this.props.itemIndex.items
            .filter((value) => value.data().itemType === this.props.itemType)
            .map((value) => <li key={value.id}>{value.data().itemTitle}</li>)
        }
      </>
    );
  }
}

export default connect(
  (state) => ({ itemIndex: state.itemIndex }),
  ({
  })
)(BrowseItems);
