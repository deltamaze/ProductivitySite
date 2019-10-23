import React from 'react';
import BrowseItems from '../components/browseItems';

class BrowseNotesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTextBox: false
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <BrowseItems itemType="note" />
    );
  }
}

export default BrowseNotesPage;
