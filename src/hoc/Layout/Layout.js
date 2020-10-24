import React, { Component } from "react";
import Auxiliary from "../Auxiliary/Auxiliary";
import Toolbar from "../../components/Navigation/Toolbar";
import SideDrawer from "../../components/SideDrawer/SideDrawer";
import Classes from "./Layout.css";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  render() {
    return (
      <Auxiliary>
        <Toolbar
          drawerToggleClicked={() =>
            this.setState((prevState) => {
              return { showSideDrawer: !prevState.showSideDrawer}
            })
          }
        />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={() => this.setState({ showSideDrawer: false })}
        />
        <main className={Classes.Content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}

export default Layout;
