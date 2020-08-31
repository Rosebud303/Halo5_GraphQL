import React, { Component } from 'react';
import './Arenapage.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { ARENA_DROPDOWN_QUERY, SELECTED_VARIANT_QUERY, ARENA_CSR_QUERY } from '../../Queries/GraphQLQueries';
import EmptyContent from '../../components/EmptyContent/EmptyContent';

class Arenapage extends Component {
  constructor() {
    super();
    this.state = {
      currentGameVariant: '',
      currentGameVariantName: '',
    };
  }

  selectArenaVariant = async (e) => {
    e.preventDefault();
    let optionIndex = e.target.selectedIndex;
    let emptyOption = e.target[0];
    let selectOptions = e.target.options;
    let gameVarId = selectOptions[optionIndex].id;
    let gameVarIdName = selectOptions[optionIndex].text;
    await this.setState({
      currentGameVariant: '',
      currentGameVariantName: e.target.options[emptyOption],
    });
    this.setState({
      currentGameVariant: gameVarId,
      currentGameVariantName: gameVarIdName,
    });
  };

  render() {
    const player_name = this.props.currentPlayer;
    const GameBaseVariantId = this.state.currentGameVariant;
    const parsedWeaponsMetadata = JSON.parse(localStorage.getItem('weaponsMetadata'));
    const parsedMedalsMetadata = JSON.parse(localStorage.getItem('medalsMetadata'));
    const parsedCsrMetadata = JSON.parse(localStorage.getItem('csrMetadata'));
    const parsedSeasonsMetadata = JSON.parse(localStorage.getItem('seasonsMetadata'));
    const parsedGameVariantMetadata = JSON.parse(localStorage.getItem('gameBaseVariantsMetadata'));
    const arenaMessage = 'To get started, make a selection from the playlist at the top left of the page.  The playlists included are tailored around your players stats.'

    return (
      <div className='arena-page'>
        <header className='arena-header'>
          <div className='dropdown-container'>
            <p id='header-player-name'>{player_name}</p>
            <Query
              query={ARENA_DROPDOWN_QUERY}
              variables={{ player_name }}
              key={player_name}
            >
              {({ loading, error, data }) => {
                if (loading) return <option>Loading...</option>;
                if (error) console.log(error);
                if (!data.arenaGameBases.length) return (
                  <div className='arena-no-data-container'>
                    <p className='arena-no-data'>PLAYER HAS NO DATA!</p>
                    <p>Return to homepage to select a different spartan.</p>
                  </div>
                )

                return (
                  <div className='arena-dropbox-container'>
                    <label htmlFor='filter'>Choose From Playlist: </label>
                    <select
                      onChange={(event) => this.selectArenaVariant(event)}
                      name='filter'
                      className='arena-filter-options'
                    >
                      <option>No Selection</option>
                      {data.arenaGameBases.map((id) => {
                        return (
                          <option
                            id={id.GameBaseVariantId}
                            key={id.GameBaseVariantId}
                          >
                            {
                              parsedGameVariantMetadata.find(
                                (item) => item.id === id.GameBaseVariantId
                              ).name
                            }
                          </option>
                        );
                      })}
                    </select>
                  </div>
                );
              }}
            </Query>
          </div>
          <div>
            <h1 className='arena-title'>{this.state.currentGameVariantName || 'Arena Playlist'}</h1>
            {!this.state.currentGameVariantName && <p className='start-instructions'>(select playlist on the left to get started)</p>}
          </div>
          <div className='buttons-container'>
            <Link to='/homepage' className='homepage-links hpl2'>
              <p className='detail-link arena-button'>HOMEPAGE</p>
            </Link>
            <Link to='/overview' className='homepage-links hpl2'>
              <p className='detail-link arena-button'>OVERVIEW</p>
            </Link>
            <Link to='/warzone' className='homepage-links hpl2'>
              <p className='detail-link arena-button'>WARZONE PAGE</p>
            </Link>
            <Link to='/libraries' className='homepage-links hpl2'>
              <p className='detail-link arena-button'>INFORMATION CENTER</p>
            </Link>
          </div>
        </header>
        {!this.state.currentGameVariant && <EmptyContent message={arenaMessage} />}
        {this.state.currentGameVariant && (
          <Query
            query={SELECTED_VARIANT_QUERY}
            variables={{ player_name, GameBaseVariantId }}
          >
            {({ loading, error, data }) => {
              if (loading) return '';
              if (error) console.log(error);
              const { TotalGamesWon, TotalGamesLost, TotalGamesTied, TotalGamesCompleted, TotalKills, TotalDeaths, TotalAssists, WeaponWithMostKills, TotalAssassinations, TotalMeleeKills, TotalGroundPoundKills, TotalShoulderBashKills, TotalGrenadeKills, TotalPowerWeaponKills, TotalHeadshots, TotalWeaponDamage, TotalShotsFired, TotalShotsLanded, MedalAwards } = data.arenaStats
              const foundWeapon = parsedWeaponsMetadata.find((weapon) => weapon.id === WeaponWithMostKills.WeaponId.StockId);

              const findBestMedals = () => {
                let medalWithDifficulty = MedalAwards.map(medal => {
                  let foundMedal = parsedMedalsMetadata.find(found => found.id === medal.MedalId) || {}
                  const { difficulty, id, name, description, spriteLocation } = foundMedal
                  if (difficulty === 0) return ''
                  return {
                    Id: id,
                    Name: name,
                    Description: description,
                    Difficulty: difficulty,
                    Location: spriteLocation,
                    Count: medal.Count
                  }
                })
                return medalWithDifficulty.sort((a, b) => a.Difficulty - b.Difficulty).slice(0, 6)
              }

              return (
                <div className='arena-content-container'>
                  <main className='arena-main'>
                    <div className='arena-details-box box-a'>
                      <div className='wins-container shared-container'>
                        <h4 className='box-title'>Win Rate {(TotalGamesWon / TotalGamesCompleted * 100).toFixed(2)}%</h4>
                        <div>
                          <p className='box-details'>Wins: {TotalGamesWon.toLocaleString()}</p>
                          <p className='box-details'>Losses: {TotalGamesLost.toLocaleString()}</p>
                          <p className='box-details'>Ties: {TotalGamesTied.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className='kda-container shared-container'>
                        <h4 className='box-title'>KDA {((TotalKills + TotalAssists / 3) / TotalDeaths).toFixed(3)}</h4>
                        <div>
                          <p className='box-details'>Kills: {TotalKills.toLocaleString()}</p>
                          <p className='box-details'>Deaths: {TotalDeaths.toLocaleString()}</p>
                          <p className='box-details'>Assists: {TotalAssists.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className='arena-details-box box-b'>
                      <h4 className='box-title'>Style Kills</h4>
                      <div className='kills-details-container'>
                        <div className='kills-details-column-container'>
                          <p className='box-details'>Assassinations: {TotalAssassinations.toLocaleString()}</p>
                          <p className='box-details'>Melee: {TotalMeleeKills.toLocaleString()}</p>
                          <p className='box-details'>Grenade: {TotalGrenadeKills.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className='box-details'>Power Weapon: {TotalPowerWeaponKills.toLocaleString()}</p>
                          <p className='box-details'>Ground Pound: {TotalGroundPoundKills.toLocaleString()}</p>
                          <p className='box-details'>Shoulder Bash: {TotalShoulderBashKills.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    <div className='arena-details-box box-c weapon-container'>
                      <h4 className='box-title'>Best Performing Weapon</h4>
                      <p className='hover-instructions'>(hover for details)</p>
                      <img className='weapon-image' src={foundWeapon.largeIconImageUrl} alt='Weapon' />
                      <div className='best-wep-info'>
                        <p className='best-wep-title'>{foundWeapon.name}</p>
                        <p className='box-details'>Kills: {WeaponWithMostKills.TotalKills.toLocaleString()}</p>
                        <p className='box-details'>Damage Dealt: {parseInt(WeaponWithMostKills.TotalDamageDealt).toLocaleString()}</p>
                        <p className='box-details'>Shots Fired: {WeaponWithMostKills.TotalShotsFired.toLocaleString()}</p>
                        <p className='box-details'>Shots Landed: {WeaponWithMostKills.TotalShotsLanded.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className='arena-details-box box-d'>
                      <h4 className='box-title'>Shooting Stats</h4>
                      <div>
                        <p className='box-details'>Total Damage Done: {parseInt(TotalWeaponDamage).toLocaleString()}</p>
                        <p className='box-details'>Shooting Accuracy: {(TotalShotsLanded / TotalShotsFired * 100).toFixed(2)}%</p>
                        <p className='box-details'>Shots Fired: {TotalShotsFired.toLocaleString()}</p>
                        <p className='box-details'>Headshots: {TotalHeadshots.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className='arena-details-box box-f'>
                      <h4 className='box-title'>Top Medals</h4>
                      <p className='hover-instructions'>(hover for details)</p>
                      {findBestMedals().map(({ Location: { spriteSheetUri, left, top }, Count, Name, Description }) => {
                        const medalStyles = {
                          backgroundImage: `url(${spriteSheetUri})`,
                          backgroundPosition: `-${left}px -${top}px`,
                          backgroundSize: 'auto',
                          width: '74px',
                          height: '74px',
                          margin: '1rem',
                          size: '50%'
                        };
                        return (
                          <div className='single-medal-container'>
                            <div style={medalStyles}><p>x{Count}</p></div>
                            <p className='medal-info'><strong>{Name}</strong> - {Description}</p>
                          </div>
                        )
                      })}
                    </div>
                    <div className='arena-details-box box-h weapon-container'>
                      <h4 className='box-title'>Highest Rank Attained</h4>
                      <p className='hover-instructions'>(hover for details)</p>
                      <Query query={ARENA_CSR_QUERY} variables={{ player_name }}>
                        {({ loading, error, data }) => {
                          if (loading) return <p>Loading...</p>;
                          if (error) console.log(error);
                          const { HighestCsrAttained, HighestCsrPlaylistId, HighestCsrSeasonId } = data.arenaCsr
                          const foundRank = parsedCsrMetadata.find(rank => parseInt(rank.id) === HighestCsrAttained.DesignationId)
                          const foundTier = foundRank.tiers.find(tier => parseInt(tier.id) === HighestCsrAttained.Tier).iconImageUrl
                          const foundPlaylist = parsedSeasonsMetadata.find(playlist => playlist.id === HighestCsrSeasonId)
                          const foundGameMode = foundPlaylist.playlists.find(playlist => playlist.id === HighestCsrPlaylistId)

                          return (<>
                            <div className='csr-image-container'>
                              <img className='csr-images banner-image' src={foundRank.bannerImageUrl} alt='Players rank banner' />
                              <img className='csr-images tier-image' src={foundTier} alt='Players rank tier' />
                            </div>
                            <div className='best-wep-info'>
                              <p className='best-wep-title highest-rank-title'>{foundRank.name} {HighestCsrAttained.Tier}</p>
                              <p className='box-details best-season-info'>{foundPlaylist.name}</p>
                              <p className='box-details best-season-info'>{foundGameMode.name}</p>
                              <p className='smaller-season-info best-season-info'>({foundGameMode.description})</p>
                            </div>
                          </>)
                        }}
                      </Query>
                    </div>
                    <div className='arena-details-box box-i'>
                      <img className='arena-spartan' src={this.props.currentImgUrlSpartan} alt='Users spartan' />
                    </div>
                  </main>
                </div>
              );
            }}
          </Query>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentPlayer: state.currentPlayer,
  currentImgUrlSpartan: state.currentImgUrlSpartan,
  currentImgUrlEmblem: state.currentImgUrlEmblem,
});

export default connect(mapStateToProps)(Arenapage);
