

function MenuItem({itemName, iconName}) {
    
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

export default MenuItem;