/* eslint-disable react/prop-types */
import React, { Component } from 'react';


class MenuItem extends Component {
    
    render() { 
        const { iconName, itemName } = this.props;
        
        return (
            <>
                <li className="menu-item">
                    <a href="/" className="menu-link">
                        <i className={`menu-icon tf-icons bx ${iconName}`}></i>
                        <div data-i18n="Courses">{itemName}</div>
                    </a>
                </li>
            </>
        );
    }
}
 
export default MenuItem;
