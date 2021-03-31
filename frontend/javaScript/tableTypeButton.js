function TableTypeButton(props) {
  let element = /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "dashboardButton",
    onClick: async () => {
      props.updateTableType(props.type);
    }
  }, props.buttonText);
  return element;
}