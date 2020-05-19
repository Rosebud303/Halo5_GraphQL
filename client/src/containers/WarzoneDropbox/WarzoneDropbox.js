import React, { Component } from 'react';
import './WarzoneDropbox.scss';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const WARZONE_DROPDOWN_QUERY = gql`
  query WarzoneQuery ($player_name: String!, $GameBaseVariantId: String!) {
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
`;

class WarzoneDropbox extends Component {

  selectMapVariant

  render() {
    const player_name = this.props.currentPlayer
    const GameBaseVariantId = this.props.warzoneGameVariantId
    return (
      <div>
        <h1>Warzone Game Variant</h1>
          <label htmlFor='filter'> Personal Warzone Playlist:</label>
          <select name='filter' className='warzone-dropdown'>
            <Query query={WARZONE_DROPDOWN_QUERY} variables={{ player_name, GameBaseVariantId }}>
              {
                ({ loading, error, data }) => {
                  if (loading) return <option>Loading...</option>
                  if (error) console.log(error)
                  const parsedMapsMetadata = JSON.parse(localStorage.getItem('mapsMetadata')).mapsMetadata
                  return (data.scenarioStats.filter(gameVariant => gameVariant.GameBaseVariantId === this.props.warzoneGameVariantId).map(id => {
                    return <option id={id.MapId} key={id.MapId}>
                      {parsedMapsMetadata.find(item => item.id === id.MapId).name}
                    </option>
                  })
                  
                  )
                }
              }
            </Query>
          </select>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentPlayer: state.currentPlayer
});

export default connect(mapStateToProps)(WarzoneDropbox);