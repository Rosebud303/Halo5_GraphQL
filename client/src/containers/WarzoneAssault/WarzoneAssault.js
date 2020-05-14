import React, { Component } from 'react';
import './WarzoneAssault.scss';
import { connect } from 'react-redux';
import WarzoneDropbox from '../WarzoneDropbox/WarzoneDropbox';

class WarzoneAssault extends Component {
  render() {
    const warzoneGameVariantId = '42f97cca-2cb4-497a-a0fd-ceef1ba46bcc'

    return (
      <>
        <WarzoneDropbox warzoneGameVariantId={warzoneGameVariantId} />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  currentPlayer: state.currentPlayer
});

export default connect(mapStateToProps)(WarzoneAssault);