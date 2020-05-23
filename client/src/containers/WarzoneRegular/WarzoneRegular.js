import React, { Component } from "react";
import "./WarzoneRegular.scss";
import { connect } from "react-redux";
import WarzoneDropbox from "../WarzoneDropbox/WarzoneDropbox";

class WarzoneRegular extends Component {
  render() {
    const warzoneGameVariantId = "f6de5351-3797-41e9-8053-7fb111a3a1a0";

    return (
      <>
        <WarzoneDropbox warzoneGameVariantId={warzoneGameVariantId} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentPlayer: state.currentPlayer,
});

export default connect(mapStateToProps)(WarzoneRegular);
