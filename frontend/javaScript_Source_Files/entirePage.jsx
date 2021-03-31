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
        <SideNavBar changeSS={changeSS}/>
        <DisplayArea ms={mainSection} ss={subSection} />
      </div>
    );
    return page;
  }