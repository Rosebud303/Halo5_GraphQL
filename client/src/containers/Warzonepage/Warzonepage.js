import React, { Component } from 'react';
import './Warzonepage.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

let ACCUMULATIVE_WARZONE_QUERY = gql`
  query AccumulativeWzQuery($player_name: String!) {
    warzoneStats(player_name: $player_name) {
      TotalKills
      TotalHeadshots
      TotalWeaponDamage
      TotalShotsFired
      TotalShotsLanded
      TotalGamesWon
      TotalGamesLost
      TotalGamesTied
      WeaponWithMostKills {
        TotalKills
        TotalHeadshots
        TotalShotsFired
        TotalShotsLanded
        TotalDamageDealt
        WeaponId {
          StockId
        }
      }
      MedalAwards {
        MedalId
        Count
      }
    }
  }
`

let GAME_VARIANT_WARZONE_QUERY = gql`
  query GameVariantWzQuery($player_name: String!, $GameBaseVariantId: String!) {
    scenarioStats(player_name: $player_name, GameBaseVariantId: $GameBaseVariantId) {
      GameBaseVariantId
      MapId
      TotalKills
      TotalHeadshots
      TotalWeaponDamage
      TotalShotsFired
      TotalShotsLanded
      TotalGamesWon
      TotalGamesLost
      TotalGamesTied
      WeaponWithMostKills {
        TotalKills
        TotalHeadshots
        TotalShotsFired
        TotalShotsLanded
        TotalDamageDealt
        WeaponId {
          StockId
        }
      }
      MedalAwards {
        MedalId
        Count
      }
    }
  }
`

class Warzonepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameVariantId: 'dfd51ee3-9060-46c3-b131-08d946c4c7b9'
    }
  }

  render() {
    let player_name = this.props.currentPlayer
    let GameBaseVariantId = this.state.gameVariantId
    const firefightVariantId = 'dfd51ee3-9060-46c3-b131-08d946c4c7b9'
    const assaultVariantId = '42f97cca-2cb4-497a-a0fd-ceef1ba46bcc'
    const regularVariantId = 'f6de5351-3797-41e9-8053-7fb111a3a1a0'
    return (
      <div>
        <h1>Warzone Page Coming Soon...</h1>
        <Link to='/homepage'>
          <button>LINK BACK TO HOMEPAGE</button>
        </Link>
        <div>
            <Query query={GAME_VARIANT_WARZONE_QUERY} variables={{ player_name, GameBaseVariantId}}>
              {
                ({ loading,error,data }) => {
                  if (loading) return ''
                  if (error) console.log(error)
                  let parsedGameBaseVariants = JSON.parse(localStorage.getItem("gameBaseVariantsMetadata")).gameBaseVariantsMetadata
                  const reducedTotals = (property) => {
                    return data.scenarioStats.reduce((acc, cur) => {
                      acc += cur[property]
                      return acc
                    }, 0)
                  }
                  const findMostEffectiveWeapon = () => {
                    return data.scenarioStats.sort((a, b) => {
                      return b.WeaponWithMostKills.TotalKills - a.WeaponWithMostKills.TotalKills
                    })[0].WeaponWithMostKills
                  }
                  return (
                    <div>
                      <p>Total Kills: {reducedTotals('TotalKills')}</p>
                      <p>Total Headshots: {reducedTotals('TotalHeadshots')}</p>
                      <p>Total Shots Fired: {reducedTotals('TotalShotsFired')}</p>
                      <p>Total Shots Landed: {reducedTotals('TotalShotsLanded')}</p>
                      <p>Total Damage Dealt: {reducedTotals('TotalDamageDealt')}</p>
                      <p>Best wep: {findMostEffectiveWeapon().WeaponId.StockId}</p>


                    </div>
                  )

                }
              }
            </Query>
        </div>  
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentPlayer: state.currentPlayer,
  currentImgUrlSpartan: state.currentImgUrlSpartan,
  currentImgUrlEmblem: state.currentImgUrlEmblem
});

export default connect(mapStateToProps)(Warzonepage);

