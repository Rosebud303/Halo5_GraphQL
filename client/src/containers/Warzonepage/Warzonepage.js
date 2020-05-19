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
            <Query query={GAME_VARIANT_WARZONE_QUERY} variables={{ player_name, GameBaseVariantId}}>
              {
                ({ loading,error,data }) => {
                  if (loading) return ''
                  if (error) console.log(error)
                  console.log(data)
                  let parsedGameBaseVariants = JSON.parse(localStorage.getItem('gameBaseVariantsMetadata')).gameBaseVariantsMetadata
                  let parsedWeaponsMetadata = JSON.parse(localStorage.getItem('weaponsMetadata')).weaponsMetadata
                  let parsedMedalsMetadata = JSON.parse(localStorage.getItem('medalsMetadata')).medalsMetadata
                  const reduceTotals = (property) => {
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
                  const findMostObtainedMedals = () => {
                    let allMedals = data.scenarioStats.reduce((acc,cur) => {
                      cur.MedalAwards.forEach(item => {
                        if (!acc[item.MedalId]) {
                          acc[item.MedalId] = 0
                        }
                        acc[item.MedalId] += item.Count
                      })
                      return acc
                    }, {})
                    let medalIds = Object.keys(allMedals)
                    let sortedMedals = medalIds.sort((a, b) => {
                     return allMedals[b] - allMedals[a]
                    }).slice(0, 6)
                    return sortedMedals.map(item => {
                      let foundMedal = parsedMedalsMetadata.find(medal => medal.id == item)
                      return {
                        Count: allMedals[item], 
                        Name: foundMedal.name,
                        SpriteLocation: foundMedal.spriteLocation
                      }
                    })
                  }
                  const foundWeapon = parsedWeaponsMetadata.find(weapon => weapon.id === findMostEffectiveWeapon().WeaponId.StockId)
                  return (
                    <div className='accordion-section'>
                      <figure>
                        <img className='game-variant-image' src='https://i.imgur.com/mZmEnAq.jpg' />
                        <input type='radio' name='radio-set' defaultChecked='checked' />
                        <figcaption>
                          <Link to='/warzone/firefight'>
                          <span>{parsedGameBaseVariants.find(variant => variant.id == this.state.gameVariantId).name}</span>
                          </Link>
                        <p>Total Wins: {reduceTotals('TotalGamesWon')}</p>
                        <p>Total Losses: {reduceTotals('TotalGamesLost')}</p>
                        <p>Total Ties: {reduceTotals('TotalGamesTied')}</p>
                        <p>Total Kills: {reduceTotals('TotalKills')}</p>
                        <p>Total Headshots: {reduceTotals('TotalHeadshots')}</p>
                        <p>Total Shots Fired: {reduceTotals('TotalShotsFired')}</p>
                        <p>Total Shots Landed: {reduceTotals('TotalShotsLanded')}</p>
                        <p>Total Damage Dealt: {reduceTotals('TotalWeaponDamage').toFixed(2)}</p>
                        </figcaption>
                        {/* <div>
                          <p>Best Killing Tool: {foundWeapon.name}</p>
                          <p>{foundWeapon.name} Total Kills: {findMostEffectiveWeapon().TotalKills}</p>
                          <p>{foundWeapon.name} Total Headshots: {findMostEffectiveWeapon().TotalHeadshots}</p>
                          <p>{foundWeapon.name} Total Shots Fired: {findMostEffectiveWeapon().TotalShotsFired}</p>
                          <p>{foundWeapon.name} Total Shots Landed: {findMostEffectiveWeapon().TotalShotsLanded}</p>
                          <p>{foundWeapon.name} Total Damage Dealt: {findMostEffectiveWeapon().TotalDamageDealt.toFixed(2)}</p>
                          <img src={foundWeapon.largeIconImageUrl}/>
                        </div>
                        <div>
                          <p>{parsedGameBaseVariants.find(variant => variant.id == this.state.gameVariantId).name}: Medals</p>
                          {findMostObtainedMedals().map(medal => {
                            const medalStyles = {
                              backgroundImage: `url(${medal.SpriteLocation.spriteSheetUri})`,
                              backgroundPosition: `-${medal.SpriteLocation.left}px -${medal.SpriteLocation.top}px`,
                              backgroundSize: 'auto',
                              width: '74px',
                              height: '74px',
                              margin: '2rem'}
                            return <div>
                                    <div style={medalStyles}></div>: {medal.Count}
                                  </div>
                          })}
                        </div> */}
                        <figure>
                          <img className='game-variant-image' src='https://i.imgur.com/h37QJVi.jpg' />
                          <input type='radio' name='radio-set' checked='checked' />
                          <figcaption>
                            <Link to='/warzone/assault'>
                              <span>Warzone Assault</span>
                            </Link>    
                          </figcaption>
                            <figure>
                            <img className='game-variant-image' src='https://i.imgur.com/7F4dFgn.jpg' />
                              <input type='radio' name='radio-set' id='accordion-selector-last' checked='checked' />
                              <figcaption>
                                <Link to='/warzone/regular'>
                                  <span>Warzone Regular</span>
                                </Link>  
                              </figcaption>
                            </figure>
                        </figure>
                      </figure>
                    </div>
                  )
                }
              }
            </Query> 
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

