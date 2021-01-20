let root = document.getElementById("root");
let element = (
  <EntirePage />
);
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
/*
This function returns the DisplayArea react object which
is where all the main interactive subobjects are added
excluding the navigation bars
*/
function DisplayArea(props) {
  let piece;
  if (props.ms == 3) {
    if (props.ss == 1) {

    }
  }
  if (props.ms == 2) {
    if (props.ss == 1) {
      piece = <Explore_Dashboard />;
    }
    if (props.ss == 2) {
      piece = <Explore_ViewProduct />;
    }
    if(props.ss == 6){
      piece = <PageIntegrator/>
    }
  }
  let page = (
    <div id="displayArea">
      {piece}
    </div>
  );
  return page;
}
/*
This function returns the TopNavBar react object which
at this point is the only main element of the three which will
not have subobjects to swap out
*/
function TopNavBar() {
  let part = (
    <div className="topNavBar">
      <a>Home</a>
      <a>Explore</a>
      <a>Analyze</a>
      <a>Manage</a>
    </div>
  );
  return part;
}
//This is where the EntirePage react element is rendered
ReactDOM.render(
  element,
  root
);
