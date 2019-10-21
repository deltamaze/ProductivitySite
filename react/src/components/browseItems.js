import React from 'react';
import { connect } from 'react-redux';

class BrowseItems extends React.Component {
  componentDidMount() {
  }


  render() {
    return (<>BrowseItems, {this.props.itemType}</>
    );
  }
}

export default connect(
  () => ({ }),
  ({
  })
)(BrowseItems);
