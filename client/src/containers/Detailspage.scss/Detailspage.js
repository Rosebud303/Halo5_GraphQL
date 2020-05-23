import React from "react";
import "./Detailspage.scss";
import { Link } from "react-router-dom";
import gql from "graphql-tag";

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
      <section className='details-page-sections'>
        <div className='accumulative-arena-wl'></div>
        <div className='accumulative-arena-kda'></div>
        <div className='arena-rank'></div>
      </section>
      <section className='details-page-sections'>
        <div></div>
        <div></div>
        <div></div>
      </section>
      <section className='details-page-sections'></section>
    </div>
  );
};

export default Detailspage;
