import React from 'react';
import { connect } from 'react-redux';
import { removeNoteListener, fetchNote, setNoteContent } from '../services/noteEntity/action';
import { setItem } from '../services/itemIndexEntity/action';
import debounce from '../utilities/debounce';

class Note extends React.Component {
  constructor(props) {
    super(props);

    this.noteRef = undefined;
    this.noteListener = undefined;

    this.setNoteWithDebouce = debounce(this.props.setNoteContent, 1000);
    this.setTitleWithDebouce = debounce(this.props.setItem, 1000);
    this.state = {
      mainTextArea: '',
      titleTextBox: ''
    };

    this.handleChange = this.handleChange.bind(this); // to grab event data, need to bind
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  componentDidMount() {
    this.fetchAuthorizedServices();
    this.syncNoteTextToFirebaseData();
    this.syncTitleTextToFirebaseData();
  }

  componentDidUpdate(prevProps) {
    // change in login
    if (this.props.auth.uid != prevProps.auth.uid) {
      this.fetchAuthorizedServices();
    }
    // firebase notes loaded
    if (prevProps.note.noteData === 'Loading' && prevProps.note.noteData != this.props.note.noteData) {
      this.syncNoteTextToFirebaseData();
    }
    // itemIndex loaded
    if (prevProps.itemIndex.items === 'Loading' && prevProps.itemIndex.items != this.props.itemIndex.items) {
      this.syncTitleTextToFirebaseData();
    }
  }

  componentWillUnmount() {
    this.props.removeNoteListener();
  }

  getThisItem() {
    const thisItem = this.props.itemIndex.items
      .filter((value) => value.id === this.props.match.params.itemId);
    // if undefined then navigate back to item list
    if (thisItem.length === 0) {
      console.log('TODO');
    }
    return thisItem[0];
  }

  fetchAuthorizedServices() {
    if (this.props.auth.uid == 'Connecting' || this.props.auth.uid == 'NotLoggedIn') {
      return;
    }
    this.props.fetchNote(this.props.auth.uid, this.props.match.params.itemId);
  }


  handleChange(event) {
    this.setState({
      mainTextArea: event.target.value // handle input and update textbox
    });

    this.setNoteWithDebouce(
      { content: event.target.value },
      this.props.match.params.itemId,
      this.props.auth.uid
    );
  }

  handleTitleChange(event) {
    this.setState({
      titleTextBox: event.target.value // handle input and update textbox
    });
    const thisItem = this.getThisItem();
    const itemPayload = {
      itemPath: thisItem.data().itemPath,
      itemTitle: event.target.value,
      itemType: 'note'
    };

    this.setTitleWithDebouce(
      itemPayload,
      this.props.match.params.itemId,
      this.props.auth.uid
    );
  }

  syncNoteTextToFirebaseData() {
    if (this.props.note.noteData === 'Loading') {
      return;
    }
    if (this.props.note.noteData === undefined) {
      return;
    }
    this.setState({
      mainTextArea: this.props.note.noteData.content
    });
  }

  syncTitleTextToFirebaseData() {
    if (this.props.itemIndex.items === 'Loading') {
      return;
    }
    if (this.props.itemIndex.items === undefined) {
      return;
    }
    const thisItem = this.getThisItem();
    const thisItemTitle = thisItem.data().itemTitle;

    this.setState({
      titleTextBox: thisItemTitle
    });
  }

  render() {
    return (
      <>
        {(this.props.note.noteData === 'Loading') ? (
          <div>Loading...</div>
        ) : (
          <>
            <input
              id="mainTexBoxInput"
              type="text"
              value={this.state.titleTextBox}
              onChange={this.handleTitleChange}
            />
            <textarea
              id="mainTextAreaInput"
              value={this.state.mainTextArea}
              onChange={this.handleChange}
            />
          </>
        )}
      </>
    );
  }
}
export default connect(
  (state) => ({ auth: state.auth, note: state.note, itemIndex: state.itemIndex }),
  ({
    removeNoteListener, fetchNote, setNoteContent, setItem
  })
)(Note);
