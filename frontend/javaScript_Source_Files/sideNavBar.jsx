function SideNavBar(props) {
    let element = (
        <div className="sideNavBar">
            <a onClick={() => props.changeSS(1)}>Dashboard</a>
            <a onClick={() => props.changeSS(2)}>View Product</a>
            <a>View Related</a>
            <a>View Similar</a>
            <a>Find By Criteria</a>
            <a onClick={() => props.changeSS(6)}>Page Integrator</a>
        </div>
    );
    return element;
}