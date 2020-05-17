import React, { Component } from 'react';
import './Arenapage.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

let ARENA_DROPDOWN_QUERY = gql`
  query GameVariantIdQuery($player_name: String!) {
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
      currentGameVariant: '',
      currentGameVariantName: ''
    }
  }

  selectArenaVariant = (e) => {
    e.preventDefault()
    let optionIndex = e.target.selectedIndex
    let emptyOption = e.target[0]
    let selectOptions = e.target.options
    let gameVarId = selectOptions[optionIndex].id
    let gameVarIdName = selectOptions[optionIndex].text
    this.setState({ currentGameVariant: '' , currentGameVariantName: e.target.options[emptyOption] })
    this.setState({ currentGameVariant: gameVarId , currentGameVariantName: gameVarIdName })
  }
  
  render() {
    const player_name = this.props.currentPlayer
    const GameBaseVariantId = this.state.currentGameVariant
    
    return (
      <div>
        <h3>Personal Playlist</h3>
        <label htmlFor='filter'>Choose from Arena Playlist:</label>
        <select onChange={(event) => this.selectArenaVariant(event)} name='filter' className='arena-filter-options'>
          <option>No Selection</option>
          <Query query={ARENA_DROPDOWN_QUERY} variables={{ player_name }} key={player_name}>
            {
              ({ loading, error, data }) => {
                if (loading) return <option>Loading...</option>
                if (error) console.log(error)
                const parsedGameVariantMetadata = JSON.parse(localStorage.getItem('gameBaseVariantsMetadata')).gameBaseVariantsMetadata
                return data.arenaGameBases.map(id => {
                  return <option id={id.GameBaseVariantId} key={id.GameBaseVariantId}>
                    {parsedGameVariantMetadata.find(item => item.id === id.GameBaseVariantId).name}
                  </option>
                })
              }
            }
          </Query>
        </select>
        <Link to='/homepage'>
          <button>LINK BACK TO HOMEPAGE</button>
        </Link>

        {
          this.state.currentGameVariant && <Query query={SELECTED_VARIANT_QUERY} variables={{ player_name, GameBaseVariantId}}>
            {
              ({ loading, error, data }) => {
                if (loading) return ''
                if (error) console.log(error)
                return (
                  <div>
                    <h2 className='game-variant-name'>{this.state.currentGameVariantName}</h2>
                    <main className='arena-main'>
                      <div className='arena-details-box box-a'>
                        <h4 className='box-title'>Win/Loss Stats</h4>
                        <div>
                          <p className='box-details'>Total Games Won: {data.arenaStats.TotalGamesWon.toLocaleString()}</p>
                          <p className='box-details'>Total Games Lost: {data.arenaStats.TotalGamesLost.toLocaleString()}</p>
                          <p className='box-details'>Total Games Tied: {data.arenaStats.TotalGamesTied.toLocaleString()}</p>
                          <p className='box-details'>Total Games Completed: {data.arenaStats.TotalGamesCompleted.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className='arena-details-box box-b'>
                        <h4 className='box-title'>KDA Stats</h4>
                        <p className='box-details'>KDA Ratio: {((data.arenaStats.TotalKills + (data.arenaStats.TotalAssists / 3)) / data.arenaStats.TotalDeaths).toFixed(4)}</p>
                        <p className='box-details'>Total Kills: {data.arenaStats.TotalKills.toLocaleString()}</p>
                        <p className='box-details'>Total Deaths: {data.arenaStats.TotalDeaths.toLocaleString()}</p>
                        <p className='box-details'>Total Assists: {data.arenaStats.TotalAssists.toLocaleString()}</p>
                      </div>
                      <div className='arena-details-box box-c'>
                        <h4 className='box-title'>Best Performing Weapon</h4>
                        <p>Weapon Name: The Dildo</p>
                        <img alt='Weapon Image' />
                        <p className='box-details'>Total Kills: {data.arenaStats.WeaponWithMostKills.TotalKills.toLocaleString()}</p>
                        <p className='box-details'>Total Damage Dealt: {data.arenaStats.WeaponWithMostKills.TotalDamageDealt.toLocaleString()}</p>
                        <p className='box-details'>Total Shots Fired: {data.arenaStats.WeaponWithMostKills.TotalShotsFired.toLocaleString()}</p>
                        <p className='box-details'>Total Shots Landed: {data.arenaStats.WeaponWithMostKills.TotalShotsLanded.toLocaleString()}</p>
                      </div>
                      <div className='arena-details-box box-d'>
                        <h4 className='box-title'>Shooting Stats</h4>
                        <p className='box-details'>Total Headshots: {data.arenaStats.TotalHeadshots}</p>
                        <p className='box-details'>Total Damage Done (All Weapons): {data.arenaStats.TotalWeaponDamage.toLocaleString()}</p>
                        <p className='box-details'>Total Shots Fired: {data.arenaStats.TotalShotsFired.toLocaleString()}</p>
                        <p className='box-details'>Total Shots Landed: {data.arenaStats.TotalShotsLanded.toLocaleString()}</p>
                      </div>
                      <div className='arena-details-box box-e'>
                      <h4 className='box-title'>Impulse Stats</h4>

                      </div>
                      <div className='arena-details-box box-f'>
                      <h4 className='box-title'>Medals</h4>

                      </div>
                      <div className='arena-details-box box-g'>
                      <h4 className='box-title'>Flexible Stats</h4>

                      </div>
                      <div className='arena-details-box box-h'>
                      <h4 className='box-title'>Style Kills</h4>
                      <p className='box-details'>Total Assassinations: {data.arenaStats.TotalAssassinations.toLocaleString()}</p>
                      <p className='box-details'>Total Melee: {data.arenaStats.TotalMeleeKills.toLocaleString()}</p>
                      <p className='box-details'>Total Ground Pound: {data.arenaStats.TotalGroundPoundKills.toLocaleString()}</p>
                      <p className='box-details'>Total Shoulder Bash: {data.arenaStats.TotalShoulderBashKills.toLocaleString()}</p>
                      <p className='box-details'>Total Grenade: {data.arenaStats.TotalGrenadeKills.toLocaleString()}</p>
                      <p className='box-details'>Total Power Weapon: {data.arenaStats.TotalPowerWeaponKills.toLocaleString()}</p>

                      </div>
                      <div className='arena-details-box box-i'>
                        <img src={this.props.currentImgUrlSpartan} />
                      </div>
                    </main>
                  </div>
                )
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
