function SideNavBar(props) {
    let element = (
        <div className="sideNavBar">
            <a onClick={() => props.changePage(1, false)}>Dashboard</a>
            <a onClick={() => props.changePage(2, false)}>View Product</a>
            <a>View Related</a>
            <a>View Similar</a>
            <a>Find By Criteria</a>
            <a onClick={() => props.changePage(6, false)}>Page Integrator</a>
        </div>
    );
    return element;
}