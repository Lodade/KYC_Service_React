let root = document.getElementById("root");
let element = (
  <EntirePage />
);

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
      </div>
      <DisplayArea ms={mainSection} ss={subSection} />
    </div>
  );
  return page;
}

function DisplayArea(props) {
  let piece;
  if (props.ms == 2) {
    if (props.ss == 1) {
      piece = <Explore_Dashboard/>;
    }
    if (props.ss == 2) {
      piece = <Explore_ViewProduct/>;
    }
  }
  let page = (
    <div id="displayArea">
      {piece}
    </div>
  );
  return page;
}

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

ReactDOM.render(
  element,
  root
);
