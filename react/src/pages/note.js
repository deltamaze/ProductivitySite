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
  }

  componentDidMount() {
    this.fetchAuthorizedServices();
  }

  componentDidUpdate(prevProps) {
    if (this.props.auth.uid != prevProps.auth.uid) {
      this.fetchAuthorizedServices(); // logged in
    }
  }

  componentWillUnmount() {
    this.props.removeNoteListener();
  }

  fetchAuthorizedServices() {
    if (this.props.auth.uid == 'Connecting' || this.props.auth.uid == 'NotLoggedIn') {
      return;
    }
    this.props.fetchNote(this.props.auth.uid, this.props.match.noteId);
    this.syncLocalStateToFirebaseData();
  }


  handleChange(event) {
    this.setState({
      mainTextArea: event.target.value // handle input and update textbox
    });

    this.setNoteWithDebouce(event.target.value, this.props.itemId, this.props.auth.uid);
  }

  syncLocalStateToFirebaseData() {
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
              id="titleTextBox"
              type="text"
              value={this.state.titleTextBox}
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
