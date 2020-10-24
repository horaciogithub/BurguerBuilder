import React, { Component } from "react";
import Auxiliary from "../../hoc/Auxiliary";
import Toolbar from "../Navigation/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import Classes from "./Layout.css";

class Layout extends Component {
  state = {
    showSideDrawer: true,
  };

  render() {
    return (
      <Auxiliary>
        <Toolbar />
        <SideDrawer open={this.state.showSideDrawer} closed={() => this.setState({ showSideDrawer: false })}/>
        <main className={Classes.Content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}

export default Layout;
