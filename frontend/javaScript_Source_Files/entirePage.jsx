/*
This function returns the react object which holds the TopNavBar,
the SideNavBar and the DisplayArea, which are the three
main components of the application where all subsequent 
elements are added as subobjects
*/
function EntirePage() {
    const [mainSection, changeMS] = React.useState(2);
    const [subSection, changeSS] = React.useState(1);
  
    let page = (
      <div>
        <TopNavBar />
        <div className="sideNavBar">
          <a onClick={() => changeSS(1)}>Dashboard</a>
          <a onClick={() => changeSS(2)}>View Product</a>
          <a>View Related</a>
          <a>View Similar</a>
          <a>Find By Criteria</a>
          <a onClick={() => changeSS(6)}>Page Integrator</a>
        </div>
        <DisplayArea ms={mainSection} ss={subSection} />
      </div>
    );
    return page;
  }