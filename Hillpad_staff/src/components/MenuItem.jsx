/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class MenuItem extends Component {
    
    render() { 
        const { entryName, entryURL, entryIcon, badge, active=false } = this.props;
        
        return (
            <>
                <li className={`menu-item ${active ? 'active' : ''}`}>
                    <Link to={entryURL} className="menu-link">
                        <i className={`menu-icon tf-icons bx ${entryIcon}`}></i>
                        <div data-i18n={entryName}>
                            {entryName}&nbsp;
                            {
                                badge &&
                                badge > 0 &&
                                <span className="badge bg-label-danger rounded-pill">{badge}</span>
                            }
                        </div>
                    </Link>
                </li>
            </>
        );
    }
}
 
export default MenuItem;
