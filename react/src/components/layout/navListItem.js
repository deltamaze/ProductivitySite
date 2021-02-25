import React from 'react';
import { Link } from 'react-router-dom';

class NavListItem extends React.Component {
    // constructor(props) {
    //   super(props);
    // }
    componentDidMount() {
        // this.props.fetchAuth();
    }

    render() {
        return (
            <li className="nav-item px-3">
                <Link className="nav-link" to={`/${this.props.route}`}>
                    <span className={`oi oi-${this.props.icon}`} aria-hidden="true" />{this.props.label}
                </Link>
            </li>
        );
    }
}

export default NavListItem;
