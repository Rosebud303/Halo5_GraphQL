import React, { Component } from "react";
import "./WarzoneVariant.scss";
import { connect } from "react-redux";
import WarzoneDropbox from "../WarzoneDropbox/WarzoneDropbox";

class WarzoneFireFight extends Component {
  render() {
    const warzoneGameVariantId = this.props.currentWzVariantId;
    
    return (
      <>
        <WarzoneDropbox warzoneGameVariantId={warzoneGameVariantId} />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentPlayer: state.currentPlayer,
  currentWzVariantId: state.currentWzVariantId,
});

export default connect(mapStateToProps)(WarzoneFireFight);
