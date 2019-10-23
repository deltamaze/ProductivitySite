import React from 'react';
import { connect } from 'react-redux';

class BrowseItems extends React.Component {
  componentDidMount() {
  }


  render() {
    return (
      <>BrowseItems, {this.props.itemType}
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
