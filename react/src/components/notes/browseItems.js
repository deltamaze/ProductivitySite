import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { addItemWithRedirect, deleteItem } from '../../store/actions/itemCollectionActions';
import ConfirmModal from '../modal/confirmModal';

class BrowseItems extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalShow: false,
            targetItemId: '',
            targetItemTitle: ''
        };
    }

    showConfirmDeleteModal(itemId, itemTitle) {
        this.setState({
            modalShow: true,
            targetItemId: itemId,
            targetItemTitle: itemTitle
        });
    }

    // todo, convert addItem button to react-bootstrap
    // todo, disable add item button for few seconds
    // todo, add trash-icon to delete button
    // todo, change from list to table, to have delete buttons inline
    render() {
        return (
            <>
                {(this.props.itemIndex.items === 'Loading') ? (
                    <div>Loading...</div>
                )
                    : (
                        <>
                            <div>
                                <button
                                    className="btn btn-sm btn-success "
                                    onClick={() => this.props.addItemWithRedirect(
                                        {
                                            itemPath: '/',
                                            itemTitle: 'NewItem',
                                            itemType: this.props.itemType
                                        },
                                        this.props.auth.uid,
                                        (newId) => {
                                            this.props.history
                                                .push(`${this.props.itemType}/${newId}`);
                                        }
                                    )}
                                >
                                    Add New {this.props.itemType.charAt(0).toUpperCase()
                                        + this.props.itemType.slice(1)}
                                </button>

                            </div>
                            {
                                this.props.itemIndex.items
                                    .filter(
                                        (value) => value.data().itemType === this.props.itemType
                                    )
                                    .map((value) => (
                                        <li className="marginBottom15" key={value.id}>
                                            <Link to={`${this.props.itemType}/${value.id}`}>
                                                {value.data().itemTitle}
                                            </Link>
                                            <Button
                                                className="marginLeft20"
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={
                                                    () => this.showConfirmDeleteModal(
                                                        value.id, value.data().itemTitle
                                                    )
                                                }
                                            >Delete
                                            </Button>
                                        </li>
                                    ))
                            }
                        </>
                    )}
                <ConfirmModal
                    show={this.state.modalShow}
                    onHide={() => this.setState({ modalShow: false })}
                    onHideWithDelete={
                        () => {
                            this.setState({ modalShow: false });
                            this.props.deleteItem(this.state.targetItemId, this.props.auth.uid);
                        }
                    }
                    itemTitle={this.state.targetItemTitle}
                />
            </>
        );
    }
}

export default connect(
    (state) => ({ auth: state.auth, itemIndex: state.itemIndex }),
    ({
        addItemWithRedirect, deleteItem
    })
)(withRouter(BrowseItems));
