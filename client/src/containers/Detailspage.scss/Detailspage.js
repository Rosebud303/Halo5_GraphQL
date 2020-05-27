import React, { Component } from "react";
import "./Detailspage.scss";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { connect } from 'react-redux'
import axios from "axios";
import { api_key, proxyurl } from "../../apikey";

let ACCUMULATTIVE_ARENA_QUERY = gql`
  query ArenaQuery($player_name: String!) {
    accumulativeArenaStats(player_name: $player_name) {
      HighestCsrAttained {
        Tier
        DesignationId
        PercentToNextTier
      }
      HighestCsrPlaylistId
      HighestCsrSeasonId
      ArenaPlaylistStatsSeasonId
      TotalGamesWon
      TotalGamesLost
      TotalGamesTied
      TotalGamesCompleted
      TotalKills
      TotalDeaths
      TotalAssists
      TopGameBaseVariants {
        GameBaseVariantId
        GameBaseVariantRank
        NumberOfMatchesWon
      }
      WeaponWithMostKills {
        WeaponId {
          StockId
        }
        TotalKills
        TotalDamageDealt
        TotalShotsFired
        TotalShotsLanded
      }
      TotalShotsFired
      TotalShotsLanded
      TotalAssassinations
      TotalMeleeKills
      TotalGroundPoundKills
      TotalShoulderBashKills
      MedalAwards {
        MedalId
        Count
      }
    }
  }
`;

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
`;

class Detailspage extends Component {

  render() {
    const player_name = this.props.currentPlayer
    const parsedCsrMetadata = JSON.parse(localStorage.getItem("csrMetadata"));
    const parsedGameVariantsMetadata = JSON.parse(localStorage.getItem("gameBaseVariantsMetadata"));
    const parsedMedalsMetadata = JSON.parse(localStorage.getItem("medalsMetadata"));
    const parsedSeasonsMetadata = JSON.parse(localStorage.getItem("seasonsMetadata"));
    const parsedWeaponsMetadata = JSON.parse(localStorage.getItem("weaponsMetadata"));

    return (
      <main className='details-page-body'>
        <section className='details-page-row'>
          {/* <h1 className='details-page-heading'>Details Page Coming Soon...</h1> */}
          <Link className='homepage-links' to='/homepage'>
            <p className='detail-link'>BACK TO HOMEPAGE</p>
          </Link>
          {/* <div className='details-page-section'> */}
          {/* <header></header> */}
          {/* </div> */}
        </section>
        <section className='details-page-row arena-section'>
          <Query query={ACCUMULATTIVE_ARENA_QUERY} variables={{ player_name }}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) console.log(error);
              const { HighestCsrAttained, HighestCsrPlaylistId, HighestCsrSeasonId, ArenaPlaylistStatsSeasonId, TotalGamesWon, TotalGamesLost, TotalGamesTied, TotalGamesCompleted, TotalKills, TotalDeaths, TotalAssists, TopGameBaseVariants, WeaponWithMostKills, TotalShotsFired, TotalShotsLanded, TotalAssassinations, TotalMeleeKills, TotalGroundPoundKills, TotalShoulderBashKills, MedalAwards } = data.accumulativeArenaStats
              const foundWeapon = parsedWeaponsMetadata.find(weapon => weapon.id === WeaponWithMostKills.WeaponId.StockId)
              const foundRank = parsedCsrMetadata.find(rank => rank.id == HighestCsrAttained.DesignationId)
              const foundTier = foundRank.tiers.find(tier => tier.id == HighestCsrAttained.Tier).iconImageUrl
              return (<>
                <h1 className='details-page-heading'>ARENA STATS SECTION</h1>
                <div className='details-page-section'>
                  <div className='grouped-details-info csr-container'>
                    <img src={foundRank.bannerImageUrl} />
                    <img className='tier-image' src={foundTier} />
                  </div>
                  <div className='grouped-details-info'>
                    <p>Total Wins: {TotalGamesWon.toLocaleString()}</p>
                    <p>Total Losses: {TotalGamesLost.toLocaleString()}</p>
                    <p>Total Games Tied: {TotalGamesTied}</p>
                    <p>Total Games Completed: {TotalGamesCompleted.toLocaleString()}</p>
                    <p>KDA: </p>
                    <p>Total Kills: {TotalKills.toLocaleString()}</p>
                    <p>Total Deaths: {TotalDeaths.toLocaleString()}</p>
                    <p>Total Assists: {Number(TotalAssists).toLocaleString()}</p>
                  </div>
                  <div className='grouped-details-info'>
                    <p>Accuracy Percentage: {(TotalShotsLanded / TotalShotsFired).toFixed(4) * 100}%</p>
                    <p>Assassinations: {TotalAssassinations.toLocaleString()}</p>
                    <p>Melee Kills: {TotalMeleeKills.toLocaleString()}</p>
                    <p>Ground Pound Kills: {TotalGroundPoundKills.toLocaleString()}</p>
                    <p>Shoulder Bash Kills: {TotalShoulderBashKills.toLocaleString()}</p>
                  </div>
                  <div className='grouped-details-info'>
                    <img className='warzone-weapon-image' src={foundWeapon.largeIconImageUrl} alt='Weapon' />
                    <div className='best-wep-info'>
                      <p>{foundWeapon.name}</p>
                      <p className='warzone-box-details'>Kills: {WeaponWithMostKills.TotalKills.toLocaleString()}</p>
                      <p className='warzone-box-details'>Damage Dealt: {parseInt(WeaponWithMostKills.TotalDamageDealt).toLocaleString()}</p>
                      <p className='warzone-box-details'>Shots Fired: {WeaponWithMostKills.TotalShotsFired.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </>
              )
            }}
          </Query>
        </section>
        <section className='details-page-row warzone-section'>
          <Query query={ACCUMULATIVE_WARZONE_QUERY} variables={{ player_name }}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) console.log(error);
              const { TotalKills, TotalHeadshots, TotalWeaponDamage, TotalShotsFired, TotalShotsLanded, TotalGamesWon, TotalGamesLost, TotalGamesTied, WeaponWithMostKills, MedalAwards } = data.warzoneStats
              const foundWeapon = parsedWeaponsMetadata.find(weapon => weapon.id === WeaponWithMostKills.WeaponId.StockId)

              return (<>
                <h1 className='details-page-heading'>WARZONE STATS SECTION</h1>
                <div className='details-page-section'>
                  <div className='grouped-details-info'>
                    <p>Total Wins: {TotalGamesWon.toLocaleString()}</p>
                    <p>Total Losses: {TotalGamesLost.toLocaleString()}</p>
                    <p>Total Games Tied: {TotalGamesTied}</p>
                    <p>Total Games Completed: {(TotalGamesWon + TotalGamesLost + TotalGamesTied).toLocaleString()}</p>
                  </div>
                  <div className='grouped-details-info'>
                    <p>Total Kills: {TotalKills.toLocaleString()}</p>
                    <p>Accuracy Percentage: {(TotalShotsLanded / TotalShotsFired * 100).toFixed(2)}%</p>
                  </div>
                  <div className='grouped-details-info'>
                    <img className='warzone-weapon-image' src={foundWeapon.largeIconImageUrl} alt='Weapon' />
                    <div className='best-wep-info'>
                      <p>{foundWeapon.name}</p>
                      <p className='warzone-box-details'>Kills: {WeaponWithMostKills.TotalKills.toLocaleString()}</p>
                      <p className='warzone-box-details'>Damage Dealt: {parseInt(WeaponWithMostKills.TotalDamageDealt).toLocaleString()}</p>
                      <p className='warzone-box-details'>Shots Fired: {WeaponWithMostKills.TotalShotsFired.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </>
              )
            }}
          </Query>
        </section>
        <h1 className='details-page-heading'>MEDALS STATS SECTION</h1>
        <section className='details-page-row'>
          <div className='medals-section'>
            <p>**INSERT TOP MEDALS HERE**</p>
          </div>
        </section>
      </main >
    );
  }
};

const mapStateToProps = (state) => ({
  currentPlayer: state.currentPlayer,
});

export default connect(mapStateToProps)(Detailspage);
