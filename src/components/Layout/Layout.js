import React from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Classes from "./Layout.css";

const Layout = (props) => {
  return (
    <Auxiliary>
      <div>Toolbar, SideBar, Backdrop</div>
      <main className={Classes.Content}>{props.children}</main>
    </Auxiliary>
  );
};

export default Layout;
