import React from 'react';
import BrowseItems from '../components/browseItems';

class BrowseNotesPage extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <BrowseItems itemType="note" />
    );
  }
}

export default BrowseNotesPage;
