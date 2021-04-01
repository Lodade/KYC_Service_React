/*
This function returns the react object which holds the TopNavBar,
the SideNavBar and the DisplayArea, which are the three
main components of the application where all subsequent 
elements are added as subobjects
*/
function EntirePage() {
    const [mainSection, changeMS] = React.useState(2);
    const [subSection, changeSS] = React.useState(1);
    const [showResults, toggleResults] = React.useState(false);

    async function changePage(sub, show){
      changeSS(sub);
      toggleResults(show);
    }

    let page = (
      <div>
        <TopNavBar />
        <SideNavBar changePage={changePage}/>
        <DisplayArea ms={mainSection} ss={subSection} changePage={changePage} showResults={showResults}/>
      </div>
    );
    return page;
  }