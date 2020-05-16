import React, { Component } from 'react';
import './Arenapage.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

let ARENA_DROPDOWN_QUERY = gql`
  query gameVariantIdQuery($player_name: String!) {
    arenaGameBases (player_name: $player_name) {
      GameBaseVariantId
    }
  }  
`;

let SELECTED_VARIANT_QUERY = gql`
  query ArenaQuery ($player_name: String!, $GameBaseVariantId: String!) {
    arenaStats (player_name: $player_name, GameBaseVariantId: $GameBaseVariantId) {
      TotalGamesWon
      TotalGamesLost
      TotalGamesTied
      TotalGamesCompleted
      TotalKills
      TotalDeaths
      TotalAssists
      WeaponWithMostKills { 
        WeaponId {
          StockId
        }
        TotalKills
        TotalDamageDealt
        TotalShotsFired
        TotalShotsLanded
      }
      TotalAssassinations
      TotalMeleeKills
      TotalGroundPoundKills
      TotalShoulderBashKills
      TotalGrenadeKills
      TotalPowerWeaponKills
      TotalHeadshots
      TotalWeaponDamage
      TotalShotsFired
      TotalShotsLanded
      Impulses { 
        Id
        Count
      }
      MedalAwards {
        MedalId
        Count
      }
      FlexibleStats {
        MedalStatCounts {
          Id
          Count
        }
      }
    }
  }
`

class Arenapage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGameVariant: ''
    }
  }

  selectArenaVariant = (e) => {
    e.preventDefault()
    let optionIndex = e.target.selectedIndex
    let selectOptions = e.target.options
    let gameVarId = selectOptions[optionIndex].id
    this.setState({ currentGameVariant: gameVarId})
  }
  
  render() {
    const player_name = this.props.currentPlayer
    const GameBaseVariantId = this.state.currentGameVariant
    return (
      <div>
          <label htmlFor='filter'>Sort By:</label>
          <select onChange={(event) => this.selectArenaVariant(event)} name='filter' className='arena-filter-options'>
            <Query query={ARENA_DROPDOWN_QUERY} variables={{ player_name }} key={player_name}>
              {
                ({ loading, error, data }) => {
                  if (loading) return <option>Loading...</option>
                  if (error) console.log(error)
                  const parsedGameVariantMetadata = JSON.parse(localStorage.getItem('gameBaseVariantsMetadata')).gameBaseVariantsMetadata
                  return (data.arenaGameBases.map(id => {
                    return <option id={id.GameBaseVariantId} key={id.GameBaseVariantId}>
                      {parsedGameVariantMetadata.find(item => item.id === id.GameBaseVariantId).name}
                    </option>
                  }))
                }
              }
            </Query>
          </select>
        <h1>ARENA PAGE IS HERE BITCH!!!</h1>
        <Link to='/homepage'>
          <button>LINK BACK TO HOMEPAGE</button>
        </Link>

        {
          this.state.currentGameVariant && <Query query={SELECTED_VARIANT_QUERY} variables={{ player_name, GameBaseVariantId}}>
            {
              ({ loading, error, data }) => {
                if (loading) return ''
                if (error) console.log(error)
                console.log(data)
                console.log(player_name)
                return (
                  <main className='arena-main'>
                    <div className='arena-details-box box-a'>
                      <p>{data.arenaStats.TotalKills}</p>
                    </div>
                    <div className='arena-details-box box-b'>

                    </div>
                    <div className='arena-details-box box-c'>
                      <p>{data.arenaStats.TotalGamesWon}</p>
                    </div>
                    <div className='arena-details-box box-d'>
                      <p>{data.arenaStats.TotalGamesLost}</p>
                    </div>
                    <div className='arena-details-box box-e'>

                    </div>
                    <div className='arena-details-box box-f'>

                    </div>
                    <div className='arena-details-box box-g'>

                    </div>
                    <div className='arena-details-box box-h'>

                    </div>
                    <div className='arena-details-box box-i'>

                    </div>

                  </main>)
              }
            }
          </Query>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentPlayer: state.currentPlayer,
  currentImgUrlSpartan: state.currentImgUrlSpartan,
  currentImgUrlEmblem: state.currentImgUrlEmblem
});

export default connect(mapStateToProps)(Arenapage);
