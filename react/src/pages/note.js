import React from 'react';
import { connect } from 'react-redux';
import { removeNoteListener, fetchNote, setNoteContent } from '../services/noteEntity/action';
import debounce from '../utilities/debounce';

class Note extends React.Component {
  constructor(props) {
    super(props);

    this.noteRef = undefined;
    this.noteListener = undefined;

    this.setNoteWithDebouce = debounce(this.props.setMonth, 1000);

    this.state = {
      mainTextArea: '',
      titleTextBox: ''
    };

    this.handleChange = this.handleChange.bind(this); // to grab event data, need to bind
  }

  componentDidMount() {
    this.fetchAuthorizedServices();
    this.syncNoteTextToFirebaseData();
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
  }

  componentWillUnmount() {
    this.props.removeNoteListener();
  }

  fetchAuthorizedServices() {
    if (this.props.auth.uid == 'Connecting' || this.props.auth.uid == 'NotLoggedIn') {
      return;
    }
    this.props.fetchNote(this.props.auth.uid, this.props.match.params.itemId);
  }


  handleChange(event) {
    this.setState({
      titleTextBox: event.target.value // handle input and update textbox
    });

    this.setNoteWithDebouce(
      event.target.value,
      this.props.match.params.itemId,
      this.props.auth.uid
    );
  }

  handleTitleChange(event) {
    this.setState({
      mainTextArea: event.target.value // handle input and update textbox
    });

    this.setTitleWithDebouce(
      event.target.value,
      this.props.match.params.itemId,
      this.props.auth.uid
    );
  }

  syncNoteTextToFirebaseData() {
    if (this.props.note.noteData === 'Loading') {
      return;
    }
    console.log(this.props.note.noteData);
    this.setState({
      mainTextArea: ''
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
  (state) => ({ auth: state.auth, note: state.note }),
  ({
    removeNoteListener, fetchNote, setNoteContent
  })
)(Note);
