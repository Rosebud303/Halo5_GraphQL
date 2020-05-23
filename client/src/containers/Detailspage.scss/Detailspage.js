import React from "react";
import "./Detailspage.scss";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query } from "react-apollo";

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

const Detailspage = () => {
  return (
    <div>
      <header></header>
      <h1>Details Page Coming Soon...</h1>
      <Link to='/homepage'>
        <button>LINK BACK TO HOMEPAGE</button>
      </Link>
      <section className='arena-section'>
        {/* <Query query=> */}
        <div>
          <div className='accumulative-arena-wl'></div>
          <div className='accumulative-arena-kda'></div>
          <div className='arena-rank'></div>
        </div>
        {/* </Query> */}
      </section>
      <section className='warzone-section'>
        <div></div>
        <div></div>
        <div></div>
      </section>
      <section className='details-page-sections'></section>
    </div>
  );
};

export default Detailspage;
