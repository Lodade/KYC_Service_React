let root = document.getElementById("root");
let element = (
  <div>
    <div className="topNavBar">
      <a>Home</a>
      <a>Explore</a>
      <a>Analyze</a>
      <a>Manage</a>
    </div>
    <div className="sideNavBar">
      <a>Dashboard</a>
      <a onClick={async () => {await pageManager.changePage(2,2)}}>View Product</a>
      <a>View Related</a>
      <a>View Similar</a>
      <a>Find By Criteria</a>
    </div>
  </div>
);
ReactDOM.render(
  element,
  root
);
