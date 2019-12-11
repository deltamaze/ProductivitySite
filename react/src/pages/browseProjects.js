import React from 'react';
import BrowseItems from '../components/browseItems';

class BrowseProjectsPage extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <BrowseItems itemType="project" />
    );
  }
}

export default BrowseProjectsPage;
