import React, { Component } from 'react';
import './WarzoneFireFight.scss';
import { connect } from 'react-redux';
import WarzoneDropbox from '../WarzoneDropbox/WarzoneDropbox';

class WarzoneFireFight extends Component {
  render() {
    const warzoneGameVariantId = 'dfd51ee3-9060-46c3-b131-08d946c4c7b9'

    return (
      <>
        <WarzoneDropbox warzoneGameVariantId={warzoneGameVariantId}/>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentPlayer: state.currentPlayer
});

export default connect(mapStateToProps)(WarzoneFireFight);
