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
    }
  }
`;

const MAP_QUERY = gql`
  query MapQuery ($player_name: String!, $GameBaseVariantId: String!, $MapId: String!) {
    mapStats(player_name: $player_name, GameBaseVariantId: $GameBaseVariantId, MapId: $MapId) {
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

class WarzoneDropbox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMapVariantId: '',
      currentMapVariantName: ''
    }
  }
  
  selectMapVariant = async (e) => {
    e.preventDefault()
    let optionIndex = e.target.selectedIndex
    let emptyOption = e.target[0]
    let selectOptions = e.target.options
    let mapVarId = selectOptions[optionIndex].id
    let mapVarIdName = selectOptions[optionIndex].text
    await this.setState({ currentMapVariantId: '', currentMapVariantName: e.target.options[emptyOption] })
    this.setState({ currentMapVariantId: mapVarId, currentMapVariantName: mapVarIdName})
  }

  render() {
    const player_name = this.props.currentPlayer
    const GameBaseVariantId = this.props.warzoneGameVariantId
    const MapId = this.state.currentMapVariantId
    return (
      <div>
        <h1>Warzone Game Variant</h1>      
            <Query query={WARZONE_DROPDOWN_QUERY} variables={{ player_name, GameBaseVariantId }}>
              {
                ({ loading, error, data }) => {
                  if (loading) return <option>Loading...</option>
                  if (error) console.log(error)
                  const parsedMapsMetadata = JSON.parse(localStorage.getItem('mapsMetadata')).mapsMetadata
                  return (<div>
                    <label htmlFor='filter'> Personal Warzone Playlist:</label>
                    <select onChange={(event) => this.selectMapVariant(event)} name='filter' className='warzone-dropdown'>
                      <option>No Selection</option>
                      {data.scenarioStats.filter(gameVariant => gameVariant.GameBaseVariantId === this.props.warzoneGameVariantId).map(id => {
                        return <option id={id.MapId} key={id.MapId}>
                          {parsedMapsMetadata.find(item => item.id === id.MapId).name}
                        </option>                            
                      })}
                    </select>
                  </div>)
                }
              }
            </Query>
            <Query query={MAP_QUERY} variables={{ player_name, GameBaseVariantId, MapId }}>
              {
                ({ loading, error, data }) => {
                  if (loading) return <p>Loading...</p>
                  if (error) console.log(error)
                  console.log(data)
                  return ''
                }
              }
            </Query>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentPlayer: state.currentPlayer
});

export default connect(mapStateToProps)(WarzoneDropbox);