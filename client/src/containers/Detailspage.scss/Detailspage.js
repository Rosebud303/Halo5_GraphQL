import React, { Component } from "react";
import "./Detailspage.scss";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { connect } from 'react-redux'

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
    return (
      <div>
        <header></header>
        <h1>Details Page Coming Soon...</h1>
        <Link to='/homepage'>
          <button>LINK BACK TO HOMEPAGE</button>
        </Link>
        <section className='arena-section'>
          <Query query={ACCUMULATTIVE_ARENA_QUERY} variables={{ player_name }}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) console.log(error);
              const {
                HighestCsrAttained,
                HighestCsrPlaylistId,
                HighestCsrSeasonId,
                ArenaPlaylistStatsSeasonId,
                TotalGamesWon,
                TotalGamesLost,
                TotalGamesTied,
                TotalGamesCompleted,
                TotalKills,
                TotalDeaths,
                TotalAssists,
                TopGameBaseVariants,
                WeaponWithMostKills,
                TotalShotsFired,
                TotalShotsLanded,
                TotalAssassinations,
                TotalMeleeKills,
                TotalGroundPoundKills,
                TotalShoulderBashKills,
                MedalAwards } = data.accumulativeArenaStats
              return (<div>
                <div className='accumulative-arena-wl'>
                  <p>Total Wins: {TotalGamesWon}</p>
                  <p>Total Losses: {TotalGamesLost}</p>
                  <p>Total Games Tied: {TotalGamesTied}</p>
                  <p>Total Games Completed: {TotalGamesCompleted}</p>
                  <p>KDA: </p>
                  <p>Total Kills: {TotalKills}</p>
                  <p>Total Deaths: {TotalDeaths}</p>
                  <p>Total Assists: {TotalAssists}</p>
                </div>
                <div className='top-arena-variants'>
                  <p>**Top Game Base Variants (w/ names and wins)</p>
                  <p>**Top Weapon (w/ name, kills, damage, accuracy, image</p>
                </div>
                <div className='performance-stats'>
                  <p>Accuracy Percentage: {(TotalShotsLanded / TotalShotsFired).toFixed(4) * 100}%</p>
                  <p>Assassinations: {TotalAssassinations}</p>
                  <p>Melee Kills: {TotalMeleeKills}</p>
                  <p>Ground Pound Kills: {TotalGroundPoundKills}</p>
                  <p>Shoulder Bash Kills: {TotalShoulderBashKills}</p>
                </div>
                <div className='csr-section'>
                  <p>**Extrapolate csr data</p>
                </div>
              </div>
              )
            }}
          </Query>
        </section>
        <section className='warzone-section'>
          <Query query={ACCUMULATIVE_WARZONE_QUERY} variables={{ player_name }}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) console.log(error);
              return (<div>
                <div></div>
                <div></div>
                <div></div>
              </div>
              )
            }}
          </Query>
        </section>
        <section className='details-page-sections'></section>
      </div >
    );
  }
};

const mapStateToProps = (state) => ({
  currentPlayer: state.currentPlayer,
});

export default connect(mapStateToProps)(Detailspage);
