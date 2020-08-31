import React, { Component } from 'react';
import './Detailspage.scss';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';
import Header from '../../components/Header/Header';
import { ACCUMULATIVE_ARENA_QUERY, ACCUMULATIVE_WARZONE_QUERY } from '../../Queries/GraphQLQueries';
import EmptyContent from '../../components/EmptyContent/EmptyContent';

class Detailspage extends Component {
  constructor() {
    super();
    this.state = {
      arenaMedals: [],
      warzoneMedals: [],
    };
    this.parsedMedalsMetadata = JSON.parse(localStorage.getItem('medalsMetadata'));

  }

  findBestMedals = (medalsArray) => {
    let medalWithDifficulty = medalsArray.map((medal) => {
      let foundMedal = this.parsedMedalsMetadata.find((found) => found.id === medal.MedalId) || {};
      const { id, name, description, difficulty, spriteLocation } = foundMedal
      if (difficulty === 0) return '';
      return {
        Id: id,
        Name: name,
        Description: description,
        Difficulty: difficulty,
        Location: spriteLocation,
        Count: medal.Count,
      };
    });
    return medalWithDifficulty.sort((a, b) => a.Difficulty - b.Difficulty).slice(0, 10);
  };

  contentCreator = (queriedData) => {
    return this.findBestMedals(queriedData).map(({ Location: { spriteSheetUri, left, top }, Count, Name, Description }) => {
      const medalStyles = {
        backgroundImage: `url(${spriteSheetUri})`,
        backgroundPosition: `-${left}px -${top}px`,
        backgroundSize: 'auto',
        width: '74px',
        height: '74px',
        margin: '8px',
        size: '50%',
      };
      return (
        <div className='single-medal-container'>
          <div id='div-medal' className='div-medal' style={medalStyles}>
            <p className='medal-count'>x{Count}</p>
          </div>
          <p id='medal-info' className='medal-info'>
            {Name} - {Description}
          </p>
        </div>
      );
    })
  }

  render() {
    const player_name = this.props.currentPlayer;
    const parsedCsrMetadata = JSON.parse(localStorage.getItem('csrMetadata'));
    const parsedWeaponsMetadata = JSON.parse(localStorage.getItem('weaponsMetadata'));

    return (<>
      <Header header={'Details Page'} button1={'warzone'} button2={'arena'} button3={'information center'} button4={'libraries'} />
      <div className='details-page-container'>
        <main className='details-page-body'>
          <Query query={ACCUMULATIVE_ARENA_QUERY} variables={{ player_name }}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) console.log(error);
              console.log(data)
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
              if (!TotalGamesCompleted) return (
                <div className='overview-no-data-container'>
                  <EmptyContent />
                </div>
              )

              const foundWeapon = parsedWeaponsMetadata.find((weapon) => weapon.id === WeaponWithMostKills.WeaponId.StockId);
              const foundRank = parsedCsrMetadata.find((rank) => parseInt(rank.id) === HighestCsrAttained.DesignationId);
              const foundTier = foundRank.tiers.find((tier) => parseInt(tier.id) === HighestCsrAttained.Tier).iconImageUrl;

              return (
                <>
                  <section className='details-page-section arena-section'>
                    <h1 className='details-page-heading'>ARENA STATISTICS</h1>
                    <div className='grouped-details-info csr-container'>
                      <h4>{`${foundRank.name} ${HighestCsrAttained.Tier}`}</h4>
                      <img className='details-page-csr' src={foundTier} alt='Players rank tier' />
                    </div>
                    <div id='top-separator' className='grouped-details-info'>
                      <div className='details-text-aligner'>
                        <p>Arena Win Rate: </p><span className='green-text'>{(TotalGamesWon / TotalGamesCompleted * 100).toFixed(2)}%</span>
                      </div>
                      <div className='details-text-aligner'>
                        <p>Total Wins: </p><span className='green-text'>{TotalGamesWon.toLocaleString()}</span>
                      </div>
                      <div className='details-text-aligner'>
                        <p>Total Losses: </p><span className='red-text'>{TotalGamesLost.toLocaleString()}</span>
                      </div>
                      <div className='details-text-aligner'>
                        <p>Total Games Tied: </p><span className='neutral-text'>{TotalGamesTied}</span>
                      </div>
                      <div className='details-text-aligner'>
                        <p>Total Games Completed: </p><span className='neutral-text'>{TotalGamesCompleted.toLocaleString()}</span>
                      </div>
                      <div className='details-text-aligner'>
                        <p>Arena KDA: </p><span className='green-text'>{((TotalKills + TotalAssists / 3) / TotalDeaths).toFixed(3)}</span>
                      </div>
                      <div className='details-text-aligner'>
                        <p>Total Kills: </p><span className='green-text'>{TotalKills.toLocaleString()}</span>
                      </div>
                      <div className='details-text-aligner'>
                        <p>Total Deaths: </p><span className='red-text'>{TotalDeaths.toLocaleString()}</span>
                      </div>
                      <div className='details-text-aligner'>
                        <p>Total Assists: </p><span className='neutral-text'>{Number(TotalAssists).toLocaleString()}</span>
                      </div>
                      <div className='details-text-aligner'>
                        <p>Shooting Accuracy: </p><span className='green-text'>{(TotalShotsLanded / TotalShotsFired * 100).toFixed(2)}%</span>
                      </div>
                      <div className='details-text-aligner'>
                        <p>Assassinations: </p><span className='neutral-text'>{TotalAssassinations.toLocaleString()}</span>
                      </div>
                      <div className='details-text-aligner'>
                        <p>Melee Kills: </p><span className='neutral-text'>{TotalMeleeKills.toLocaleString()}</span>
                      </div>
                      <div className='details-text-aligner'>
                        <p>Ground Pound Kills: </p><span className='neutral-text'>{TotalGroundPoundKills.toLocaleString()}</span>
                      </div>
                      <div className='details-text-aligner'>
                        <p>Shoulder Bash Kills: </p><span className='neutral-text'>{TotalShoulderBashKills.toLocaleString()}</span>
                      </div>
                    </div>
                    <div id='top-separator' className='grouped-details-info'>
                      <h2 className='details-weapon-heading'>Your Most Deadly Arena Weapon</h2>
                      <img className='warzone-weapon-image details-best-wep-img' src={foundWeapon.largeIconImageUrl} alt='Weapon' />
                      <div className='best-wep-info'>
                        <p id='details-weapon-name'>{foundWeapon.name}</p>
                        <p className='warzone-box-details'>Kills - {WeaponWithMostKills.TotalKills.toLocaleString()}</p>
                        <p className='warzone-box-details'>Damage Dealt - {parseInt(WeaponWithMostKills.TotalDamageDealt).toLocaleString()}</p>
                        <p className='warzone-box-details'>Shots Fired - {WeaponWithMostKills.TotalShotsFired.toLocaleString()}</p>
                      </div>
                    </div>
                  </section>
                  <Query query={ACCUMULATIVE_WARZONE_QUERY} variables={{ player_name }}>
                    {({ loading, error, data }) => {
                      if (loading) return <p>Loading...</p>;
                      if (error) console.log(error);
                      const {
                        TotalKills,
                        TotalDeaths,
                        TotalAssists,
                        TotalShotsFired,
                        TotalShotsLanded,
                        TotalGamesWon,
                        TotalGamesLost,
                        TotalGamesCompleted,
                        WeaponWithMostKills,
                      } = data.warzoneStats;
                      const foundWeapon = parsedWeaponsMetadata.find((weapon) => weapon.id === WeaponWithMostKills.WeaponId.StockId);
                      const emblemStyle = { backgroundImage: `url(${this.props.currentImgUrlEmblem})` }

                      return (
                        <>
                          <section className='details-page-section warzone-section'>
                            <h1 className='details-page-heading'>WARZONE STATISTICS</h1>
                            <div className='grouped-details-info warzone-images-container'>
                              <img id='details-spartan-pic' alt='Users Spartan' src={this.props.currentImgUrlSpartan} />
                              <h2 className='details-spartan-name'>{this.props.currentPlayer}</h2>
                              <div className='details-spartan-container' style={emblemStyle}>
                              </div>
                            </div>
                            <div id='top-separator' className='grouped-details-info'>
                              <div className='details-text-aligner'>
                                <p>Warzone Win Rate: </p><span className='green-text'>{(TotalGamesWon / TotalGamesCompleted * 100).toFixed(2)}%</span>
                              </div>
                              <div className='details-text-aligner'>
                                <p>Total Wins: </p><span className='green-text'>{TotalGamesWon.toLocaleString()}</span>
                              </div>
                              <div className='details-text-aligner'>
                                <p>Total Losses: </p><span className='red-text'>{TotalGamesLost.toLocaleString()}</span>
                              </div>
                              <div className='details-text-aligner'>
                                <p>Total Games Completed: </p><span className='neutral-text'>{(TotalGamesWon + TotalGamesLost + TotalGamesTied).toLocaleString()}</span>
                              </div>
                              <div className='details-text-aligner'>
                                <p>Warzone KDA: </p><span className='green-text'>{((TotalKills + TotalAssists / 3) / TotalDeaths).toFixed(3)}</span>
                              </div>
                              <div className='details-text-aligner'>
                                <p>Total Kills: </p><span className='green-text'>{TotalKills.toLocaleString()}</span>
                              </div>
                              <div className='details-text-aligner'>
                                <p>Total Deaths: </p><span className='red-text'>{TotalDeaths.toLocaleString()}</span>
                              </div>
                              <div className='details-text-aligner'>
                                <p>Total Assists: </p><span className='neutral-text'>{TotalAssists.toLocaleString()}</span>
                              </div>
                              <div className='details-text-aligner'>
                                <p>Shooting Accuracy: </p><span className='green-text'>{((TotalShotsLanded / TotalShotsFired) * 100).toFixed(2)}%</span>
                              </div>
                            </div>
                            <div id='top-separator' className='grouped-details-info'>
                              <h2 className='details-weapon-heading'>Your Most Deadly Warzone Weapon</h2>
                              <img className='warzone-weapon-image details-best-wep-img' src={foundWeapon.largeIconImageUrl} alt='Weapon' />
                              <div className='best-wep-info'>
                                <p id='details-weapon-name'>{foundWeapon.name}</p>
                                <p className='warzone-box-details'>Kills - {WeaponWithMostKills.TotalKills.toLocaleString()}</p>
                                <p className='warzone-box-details'>Damage Dealt - {parseInt(WeaponWithMostKills.TotalDamageDealt).toLocaleString()}</p>
                                <p className='warzone-box-details'>Shots Fired - {WeaponWithMostKills.TotalShotsFired.toLocaleString()}</p>
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
