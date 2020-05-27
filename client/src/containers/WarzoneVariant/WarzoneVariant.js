import React, { Component } from "react";
import "./WarzoneVariant.scss";
import { connect } from "react-redux";
import WarzoneDropbox from "../WarzoneDropbox/WarzoneDropbox";

class WarzoneFireFight extends Component {
  render() {
    const warzoneGameVariantId = this.props.currentWzVariantId;
    const parsedGameVariantsMetadata = JSON.parse(localStorage.getItem("gameBaseVariantsMetadata"));
    const foundGameVariantName = parsedGameVariantsMetadata.find((variant) => variant.id === warzoneGameVariantId).name;
    
    return (
      <>
        <h1>{foundGameVariantName}</h1>
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
