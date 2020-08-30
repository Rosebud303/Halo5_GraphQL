import React, { Component } from 'react';
import './Warzonepage.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import { setWarzoneId } from '../../actions';
import Header from '../../components/Header/Header';
import { GAME_VARIANT_WARZONE_QUERY } from '../../Queries/GraphQLQueries';
import EmptyContent from '../../components/EmptyContent/EmptyContent';

class Warzonepage extends Component {
  constructor() {
    super();
    this.state = {
      gameVariantId: 'dfd51ee3-9060-46c3-b131-08d946c4c7b9',
    };
    this.parsedGameBaseVariants = JSON.parse(localStorage.getItem('gameBaseVariantsMetadata'));
    this.parsedWeaponsMetadata = JSON.parse(localStorage.getItem('weaponsMetadata'));
    this.parsedMedalsMetadata = JSON.parse(localStorage.getItem('medalsMetadata'));
  }

  reduceTotals = (data, property) => {
    return data.reduce((acc, cur) => {
      acc += cur[property];
      return acc;
    }, 0);
  };

  findMostEffectiveWeapon = (data) => {
    return data.sort((a, b) => {
      return b.WeaponWithMostKills.TotalKills - a.WeaponWithMostKills.TotalKills;
    })[0].WeaponWithMostKills;
  };

  findMostObtainedMedals = (data) => {
    let allMedals = data.reduce((acc, cur) => {
      cur.MedalAwards.forEach((item) => {
        if (!acc[item.MedalId]) {
          acc[item.MedalId] = 0;
        }
        acc[item.MedalId] += item.Count;
      });
      return acc;
    }, {});
    let medalIds = Object.keys(allMedals);
    let sortedMedals = medalIds
      .sort((a, b) => {
        return allMedals[b] - allMedals[a];
      })
      .slice(0, 6);
    return sortedMedals.map((item) => {
      let foundMedal = this.parsedMedalsMetadata.find((medal) => medal.id === item);
      return {
        Count: allMedals[item],
        Name: foundMedal.name,
        SpriteLocation: foundMedal.spriteLocation,
      };
    });
  };

  createContent = (wholeData, id) => {
    const { reduceTotals, findMostEffectiveWeapon, findMostObtainedMedals, parsedGameBaseVariants, parsedWeaponsMetadata } = this;
    const data = wholeData.scenarioStats.filter((item) => item.GameBaseVariantId === id);
    const foundWeapon = parsedWeaponsMetadata.find((weapon) => weapon.id === findMostEffectiveWeapon(data).WeaponId.StockId);

    return (
      <div>
        <div className='wz-variant-medals'>
          <h3>{parsedGameBaseVariants.find((variant) => variant.id === id).name} Medals:</h3>
          <div className='wz-displayed-medals'>
            {findMostObtainedMedals(data).map((medal) => {
              const medalStyles = {
                backgroundImage: `url(${medal.SpriteLocation.spriteSheetUri})`,
                backgroundPosition: `-${medal.SpriteLocation.left}px -${medal.SpriteLocation.top}px`,
                backgroundSize: 'auto',
                width: '74px',
                height: '74px',
              };
              return (
                <div>
                  x{medal.Count}
                  <div style={medalStyles}></div>
                </div>
              );
            })}
          </div>
        </div>
        <div className='wz-info-area'>
          <div>
            <div className='wz-box'>
              <h2>Record</h2>
              <p>Wins: {reduceTotals(data, 'TotalGamesWon')}</p>
              <p>Losses: {reduceTotals(data, 'TotalGamesLost')}</p>
              <p>Ties: {reduceTotals(data, 'TotalGamesTied')}</p>
            </div>
            <div className='wz-box'>
              <h2>Performance</h2>
              <p>Kills: {reduceTotals(data, 'TotalKills')}</p>
              <p>Headshots: {reduceTotals(data, 'TotalHeadshots')}</p>
              <p>Shots Fired: {reduceTotals(data, 'TotalShotsFired')}</p>
              <p>Shots Landed: {reduceTotals(data, 'TotalShotsLanded')}</p>
              <p>Total Damage Dealt: {reduceTotals(data, 'TotalWeaponDamage').toFixed(2)}</p>
            </div>
          </div>
          <div className='wz-tool-detail'>
            <h2>Top Weapon: {foundWeapon.name}</h2>
            <div className='tool-info'>
              <p>Kills: {findMostEffectiveWeapon(data).TotalKills}</p>
              <p>Headshots: {findMostEffectiveWeapon(data).TotalHeadshots}</p>
              <p>Shots Fired: {findMostEffectiveWeapon(data).TotalShotsFired}</p>
              <p>Shots Landed: {findMostEffectiveWeapon(data).TotalShotsLanded}</p>
              <p>Total Damage Dealt: {findMostEffectiveWeapon(data).TotalDamageDealt.toFixed(2)}</p>
            </div>
            <img src={foundWeapon.largeIconImageUrl} alt='players best weapon' />
          </div>
        </div>
      </div>
    );
  };

  filterAllWzVariants = (data, id) => {
    console.log(data)
    return data.scenarioStats.filter(variant => variant.GameBaseVariantId === id)
  }

  render() {
    const { createContent, props: { currentPlayer, setWarzoneId, } } = this;
    let player_name = currentPlayer;
    const firefightVariantId = 'dfd51ee3-9060-46c3-b131-08d946c4c7b9';
    const assaultVariantId = '42f97cca-2cb4-497a-a0fd-ceef1ba46bcc';
    const regularVariantId = 'f6de5351-3797-41e9-8053-7fb111a3a1a0';
    const noDataMessage = 'Not enough Warzone games played, please search for another Spartan.'
    const noDataMessageRegular = 'Not enough Regular Warzone Maps/Matches played'
    const noDataMessageFireFight = 'Not enough Firefight Warzone Maps/Matches played'
    const noDataMessageAssault = 'Not enough Assault Warzone Maps/Matches played'

    return (
      <div className='warzone-page'>
        <Header header={'Warzone Page'} button1={'overview'} button2={'arena'} button3={'information center'} button4={'libraries'} />
        <Query query={GAME_VARIANT_WARZONE_QUERY} variables={{ player_name }}>
          {({ loading, error, data }) => {
            if (loading) return '';
            if (!data.scenarioStats.length) return <div className='empty-wz'><EmptyContent message={noDataMessage} /></div>;
            return (
              <div className='accordion-section'>
                <figure>
                  <label>Fire Fight</label>
                  <img className='game-variant-image' src='https://i.imgur.com/x0qQq4E.jpg' alt='Warzone Firefight Background' />
                  <input type='radio' name='radio-set' defaultChecked='checked' />
                  <figcaption>
                    {this.filterAllWzVariants(data, firefightVariantId).length &&
                      (<Link to='/warzone/variant'>
                        <span onClick={(e) => setWarzoneId(e.target.id)} id={firefightVariantId}>
                          (Firefight Maps)
                        </span>
                      </Link>)}
                    {this.filterAllWzVariants(data, firefightVariantId).length ? createContent(data, firefightVariantId) : <div className='wz-variant-error'><EmptyContent message={noDataMessageFireFight} /></div>}
                  </figcaption>
                  <figure>
                    <label>Assault</label>
                    <img className='game-variant-image' src='https://i.imgur.com/rV8gvLj.jpg' alt='Warzone Assault Background' />
                    <input type='radio' name='radio-set' defaultChecked='checked' placeholder='Warzone Assault' />
                    <figcaption>
                      {this.filterAllWzVariants(data, assaultVariantId).length &&
                        (<Link to='/warzone/variant'>
                          <span onClick={(e) => setWarzoneId(e.target.id)} id={assaultVariantId}>
                            (Assault Maps)
                          </span>
                        </Link>)}
                      {this.filterAllWzVariants(data, assaultVariantId).length ? createContent(data, assaultVariantId) : <div className='wz-variant-error'><EmptyContent message={noDataMessageAssault} /></div>}
                    </figcaption>
                    <figure>
                      <label>Regular</label>
                      <img className='game-variant-image' src='https://i.imgur.com/QdthRRG.jpg' alt='Warzone Regular Background' />
                      <input type='radio' name='radio-set' defaultChecked='checked' />
                      <figcaption>
                        {this.filterAllWzVariants(data, regularVariantId).length &&
                          (<Link to='/warzone/variant'>
                            <span onClick={(e) => setWarzoneId(e.target.id)} id={regularVariantId}>
                              (Regular Maps)
                            </span>
                          </Link>)}
                        {this.filterAllWzVariants(data, regularVariantId).length ? createContent(data, regularVariantId) : <div className='wz-variant-error'><EmptyContent message={noDataMessageRegular} /></div>}
                      </figcaption>
                      <figure className='opening-selection'>
                        <div id='arrow-background'>
                        </div>
                        <img id='arrow-indicator' src='https://i.imgur.com/MwPGEJ6.gif' alt='Warzone Regular Background' />
                        <img className='game-variant-image' src='https://i.imgur.com/COPRcuJ.jpg' alt='Warzone Opening Background' />
                        <input type='radio' name='radio-set' id='accordion-selector-last' defaultChecked='checked' />
                        <figcaption>
                        </figcaption>
                      </figure>
                    </figure>
                  </figure>
                </figure>
              </div>
            );
          }}
        </Query>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentPlayer: state.currentPlayer,
  currentImgUrlSpartan: state.currentImgUrlSpartan,
  currentImgUrlEmblem: state.currentImgUrlEmblem,
});

const mapDispatchToProps = (dispatch) => ({
  setWarzoneId: (id) => dispatch(setWarzoneId(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Warzonepage);
