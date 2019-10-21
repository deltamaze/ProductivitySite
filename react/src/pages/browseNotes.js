import React from 'react';
import BrowseItems from '../components/browseItems';

class BrowseNotesPage extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
  }

  render() {
    return (
      <BrowseItems itemType="Notes" />
    );
  }
}

export default BrowseNotesPage;
