/*
This function returns the react object which holds the TopNavBar,
the SideNavBar and the DisplayArea, which are the three
main components of the application where all subsequent 
elements are added as subobjects
*/
const ResultsContext = React.createContext();

function EntirePage() {
  const [mainSection, changeMS] = React.useState(2);
  const [subSection, changeSS] = React.useState(1);
  const [showResults, changeShow] = React.useState(false);
  const set = { showResults, changeShow };

  let page = (
    <div>
      <TopNavBar />
      <ResultsContext.Provider value={set}>
        <SideNavBar changeSS={changeSS} />
        <DisplayArea ms={mainSection} ss={subSection} />
      </ResultsContext.Provider>
    </div>
  );
  return page;
}