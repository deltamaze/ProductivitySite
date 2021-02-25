import React from 'react';
import BrowseItems from './browseItems';

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
