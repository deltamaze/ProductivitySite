import React from 'react';
import { connect } from 'react-redux';

class BrowseItems extends React.Component {
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
      <>
        <div>
          <button className="btn btn-sm btn-success " onClick={() => this.setState({ showTextBox: true })}>
            Add New {this.props.itemType.charAt(0).toUpperCase() + this.props.itemType.slice(1)}
          </button>
          <div>
            {this.state.showTextBox // condition
              // eval True
              ? <div>Hello world</div>
              // eval False
              : null}
          </div>
        </div>
        <br />
        BrowseItems, {this.props.itemType}
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
