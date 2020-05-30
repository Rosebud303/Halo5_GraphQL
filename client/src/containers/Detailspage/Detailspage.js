import React, { Component } from "react";
import "./Detailspage.scss";
import { Link } from "react-router-dom";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import { connect } from "react-redux";
import Header from "../../components/Header/Header";

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
  constructor() {
    super();
    this.state = {
      arenaMedals: [],
      warzoneMedals: [],
    };
    this.parsedMedalsMetadata = JSON.parse(localStorage.getItem("medalsMetadata"));

  }

  findBestMedals = (medalsArray) => {
    let medalWithDifficulty = medalsArray.map((medal) => {
      let foundMedal = this.parsedMedalsMetadata.find((found) => found.id === medal.MedalId) || {};
      if (foundMedal.difficulty === 0) return;
      return {
        Id: foundMedal.id,
        Name: foundMedal.name,
        Description: foundMedal.description,
        Difficulty: foundMedal.difficulty,
        Location: foundMedal.spriteLocation,
        Count: medal.Count,
      };
    });
    return medalWithDifficulty.sort((a, b) => a.Difficulty - b.Difficulty).slice(0, 10);
  };

  contentCreator = (queriedData) => {
    return this.findBestMedals(queriedData).map((medal) => {
      const medalStyles = {
        backgroundImage: `url(${medal.Location.spriteSheetUri})`,
        backgroundPosition: `-${medal.Location.left}px -${medal.Location.top}px`,
        backgroundSize: "auto",
        width: "74px",
        height: "74px",
        margin: "8px",
        size: "50%",
      };
      return (
        <div className='single-medal-container'>
          <div id='div-medal' className='div-medal' style={medalStyles}>
            <p className='medal-count'>x{medal.Count}</p>
          </div>
          <p id='medal-info' className='medal-info'>
            {medal.Name} - {medal.Description}
          </p>
        </div>
      );
    })
  }

  render() {
    const player_name = this.props.currentPlayer;
    const parsedCsrMetadata = JSON.parse(localStorage.getItem("csrMetadata"));
    const parsedWeaponsMetadata = JSON.parse(localStorage.getItem("weaponsMetadata"));

    return (<>
      <Header header={'Details Page'} button1={'warzone'} button2={'arena'} />
      <div className='details-page-container'>
        <main className='details-page-body'>
          <Query query={ACCUMULATTIVE_ARENA_QUERY} variables={{ player_name }}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) console.log(error);

              const {
                HighestCsrAttained,
                TotalGamesWon,
                TotalGamesLost,
                TotalGamesTied,
                TotalGamesCompleted,
                TotalKills,
                TotalDeaths,
                TotalAssists,
                WeaponWithMostKills,
                TotalShotsFired,
                TotalShotsLanded,
                TotalAssassinations,
                TotalMeleeKills,
                TotalGroundPoundKills,
                TotalShoulderBashKills,
                MedalAwards,
              } = data.accumulativeArenaStats;

              const foundWeapon = parsedWeaponsMetadata.find((weapon) => weapon.id === WeaponWithMostKills.WeaponId.StockId);
              const foundRank = parsedCsrMetadata.find((rank) => rank.id == HighestCsrAttained.DesignationId);
              const foundTier = foundRank.tiers.find((tier) => tier.id == HighestCsrAttained.Tier).iconImageUrl;

              return (
                <>
                  <section className='details-page-section arena-section'>
                    <h1 className='details-page-heading'>ARENA STATISTICS</h1>
                    <div className='grouped-details-info csr-container'>
                      <h4>{`${foundRank.name} ${HighestCsrAttained.Tier}`}</h4>
                      <img className='details-page-csr' src={foundTier} alt='Players rank tier' />
                    </div>
                    <div id='top-separator' className='grouped-details-info'>
                      <p>Total Wins: {TotalGamesWon.toLocaleString()}</p>
                      <p>Total Losses: {TotalGamesLost.toLocaleString()}</p>
                      <p>Total Games Tied: {TotalGamesTied}</p>
                      <p>Total Games Completed: {TotalGamesCompleted.toLocaleString()}</p>
                      <p>KDA: </p>
                      <p>Total Kills: {TotalKills.toLocaleString()}</p>
                      <p>Total Deaths: {TotalDeaths.toLocaleString()}</p>
                      <p>Total Assists: {Number(TotalAssists).toLocaleString()}</p>
                      <p>Shooting Accuracy: {(TotalShotsLanded / TotalShotsFired).toFixed(4) * 100}%</p>
                      <p>Assassinations: {TotalAssassinations.toLocaleString()}</p>
                      <p>Melee Kills: {TotalMeleeKills.toLocaleString()}</p>
                      <p>Ground Pound Kills: {TotalGroundPoundKills.toLocaleString()}</p>
                      <p>Shoulder Bash Kills: {TotalShoulderBashKills.toLocaleString()}</p>
                    </div>
                    <div id='top-separator' className='grouped-details-info'>
                      <img className='warzone-weapon-image details-best-wep-img' src={foundWeapon.largeIconImageUrl} alt='Weapon' />
                      <div className='best-wep-info'>
                        <p>{foundWeapon.name}</p>
                        <p className='warzone-box-details'>Kills: {WeaponWithMostKills.TotalKills.toLocaleString()}</p>
                        <p className='warzone-box-details'>Damage Dealt: {parseInt(WeaponWithMostKills.TotalDamageDealt).toLocaleString()}</p>
                        <p className='warzone-box-details'>Shots Fired: {WeaponWithMostKills.TotalShotsFired.toLocaleString()}</p>
                      </div>
                    </div>
                  </section>
                  <Query query={ACCUMULATIVE_WARZONE_QUERY} variables={{ player_name }}>
                    {({ loading, error, data }) => {
                      if (loading) return <p>Loading...</p>;
                      if (error) console.log(error);
                      const {
                        TotalKills,
                        TotalHeadshots,
                        TotalWeaponDamage,
                        TotalShotsFired,
                        TotalShotsLanded,
                        TotalGamesWon,
                        TotalGamesLost,
                        TotalGamesTied,
                        WeaponWithMostKills,
                      } = data.warzoneStats;
                      const foundWeapon = parsedWeaponsMetadata.find((weapon) => weapon.id === WeaponWithMostKills.WeaponId.StockId);
                      const emblemStyle = { backgroundImage: `url(${this.props.currentImgUrlEmblem})` }

                      return (
                        <>
                          <section className='details-page-section warzone-section'>
                            <h1 className='details-page-heading'>WARZONE STATISTICS</h1>
                            <div className='grouped-details-info test2'>
                              <img id='details-spartan-pic' src={this.props.currentImgUrlSpartan} />
                              <h2 className='details-spartan-name'>{this.props.currentPlayer}</h2>
                              <div className='details-spartan-container' style={emblemStyle}>
                              </div>
                            </div>
                            <div id='top-separator' className='grouped-details-info'>
                              <p>Total Wins: {TotalGamesWon.toLocaleString()}</p>
                              <p>Total Losses: {TotalGamesLost.toLocaleString()}</p>
                              <p>Total Games Tied: {TotalGamesTied}</p>
                              <p>Total Games Completed: {(TotalGamesWon + TotalGamesLost + TotalGamesTied).toLocaleString()}</p>
                              <p>Total Kills: {TotalKills.toLocaleString()}</p>
                              <p>Shooting Accuracy: {((TotalShotsLanded / TotalShotsFired) * 100).toFixed(2)}%</p>
                            </div>
                            <div id='top-separator' className='grouped-details-info'>
                              <img className='warzone-weapon-image details-best-wep-img' src={foundWeapon.largeIconImageUrl} alt='Weapon' />
                              <div className='best-wep-info'>
                                <p>{foundWeapon.name}</p>
                                <p className='warzone-box-details'>Kills: {WeaponWithMostKills.TotalKills.toLocaleString()}</p>
                                <p className='warzone-box-details'>Damage Dealt: {parseInt(WeaponWithMostKills.TotalDamageDealt).toLocaleString()}</p>
                                <p className='warzone-box-details'>Shots Fired: {WeaponWithMostKills.TotalShotsFired.toLocaleString()}</p>
                              </div>
                            </div>
                          </section>
                          <section className='details-page-section details-medals-section'>
                            <h1 className='details-page-heading'>MEDALS</h1>
                            <p className='details-hover-instructions'>(hover over medal for details)</p>
                            <div className='medals-detail-section'>
                              <div className='details-medals-column'>
                                <h2>ARENA</h2>
                                <div className='medals-details'>{this.contentCreator(MedalAwards)}</div>
                              </div>
                              <div className='details-medals-column'>
                                <h2>WARZONE</h2>
                                <div className='medals-details'>{this.contentCreator(data.warzoneStats.MedalAwards)}</div>
                              </div>
                            </div>
                          </section>
                        </>
                      );
                    }}
                  </Query>
                </>
              );
            }}
          </Query>
        </main>
      </div>
    </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentPlayer: state.currentPlayer,
  currentImgUrlSpartan: state.currentImgUrlSpartan,
  currentImgUrlEmblem: state.currentImgUrlEmblem,
});

export default connect(mapStateToProps)(Detailspage);
