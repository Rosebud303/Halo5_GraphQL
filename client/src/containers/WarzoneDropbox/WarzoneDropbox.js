import React, { Component } from 'react';
import './WarzoneDropbox.scss';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import Header from '../../components/Header/Header';
import { WARZONE_DROPDOWN_QUERY, MAP_QUERY } from '../../Queries/GraphQLQueries';
import EmptyContent from '../../components/EmptyContent/EmptyContent';

class WarzoneDropbox extends Component {
  constructor() {
    super();
    this.state = {
      currentMapVariantId: '',
      currentMapVariantName: '',
    };
  }

  selectMapVariant = async (e) => {
    e.preventDefault();
    let optionIndex = e.target.selectedIndex;
    let emptyOption = e.target[0];
    let selectOptions = e.target.options;
    let mapVarId = selectOptions[optionIndex].id;
    let mapVarIdName = selectOptions[optionIndex].text;
    await this.setState({
      currentMapVariantId: '',
      currentMapVariantName: e.target.options[emptyOption],
    });
    this.setState({
      currentMapVariantId: mapVarId,
      currentMapVariantName: mapVarIdName,
    });
  };

  render() {
    const { props: { currentPlayer, warzoneGameVariantId }, state: { currentMapVariantId, currentMapVariantName }, selectMapVariant } = this
    const player_name = currentPlayer;
    const GameBaseVariantId = warzoneGameVariantId;
    const MapId = currentMapVariantId;
    const dropboxMessage = 'To get started, make a selection from the maps dropbox above this notice.  The options included are tailored around maps your profile has played on this Warzone variant.'

    return (
      <div className='whole-page'>
        <div>
          <Header title={currentMapVariantName} header={'Warzone Variant'} button1={'warzone'} button2={'arena'} button3={'information center'} button4={'libraries'} />
          <Query query={WARZONE_DROPDOWN_QUERY} variables={{ player_name, GameBaseVariantId }}>
            {({ loading, error, data }) => {
              if (loading) return <option>Loading...</option>;
              if (error) console.log(error);
              const parsedMapsMetadata = JSON.parse(localStorage.getItem('mapsMetadata'));

              return (
                <div className='wz-drop-down'>
                  <label id='playlist' htmlFor='filter'> Personal Warzone Playlist:</label>
                  <select onChange={(event) => selectMapVariant(event)} name='filter' className='warzone-dropdown'>
                    <option>No Selection</option>
                    {data.wzVariantStats
                      .filter((gameVariant) => gameVariant.GameBaseVariantId === warzoneGameVariantId)
                      .map((id) => {
                        return (
                          <option id={id.MapId} key={id.MapId}>
                            {parsedMapsMetadata.find((item) => item.id === id.MapId).name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              );
            }}
          </Query>
        </div>
        <Query query={MAP_QUERY} variables={{ player_name, GameBaseVariantId, MapId }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) console.log(error);
            const parsedMapsMetadata = JSON.parse(localStorage.getItem('mapsMetadata'));
            const parsedWeaponsMetadata = JSON.parse(localStorage.getItem('weaponsMetadata'));
            const foundMap = parsedMapsMetadata.find((map) => map.id === MapId);
            const foundWeapon = parsedWeaponsMetadata.find((weapon) => {
              if (data.mapStats) {
                return weapon.id === data.mapStats.WeaponWithMostKills.WeaponId.StockId;
              }
            });

            return !data.mapStats ? (
              <p></p>
            ) : (
                <div className='main-container'>
                  <div className='dropbox-container'>
                    <div className='imageHolder'>
                      <h3 id='imageHolderName'>{currentMapVariantName}</h3>
                      {MapId && <img src={foundMap.imageUrl} className='images' alt='selected halo 5 map' />}
                    </div>
                    <div className='dropbox-data-content'>
                      <p className='heading-details'>Record/Stats</p>
                      <p>Total Games Won: {data.mapStats.TotalGamesWon}</p>
                      <p>Total Games Lost: {data.mapStats.TotalGamesLost}</p>
                      <p>Total Games Tied: {data.mapStats.TotalGamesTied}</p>
                      <p>Total Kills: {data.mapStats.TotalKills}</p>
                      <p>Total Headshots: {data.mapStats.TotalHeadshots}</p>
                      <p>Total Weapon Damage: {data.mapStats.TotalWeaponDamage.toFixed(2)}</p>
                      <p>Total Shots Fired: {data.mapStats.TotalShotsFired}</p>
                      <p>Total Shots Landed: {data.mapStats.TotalShotsLanded}</p>
                    </div>
                  </div>
                  <div className='second-row'>
                    <div className='weapon-info'>
                      <p className='heading-details'>Most Used Tool</p>
                      <p>
                        {foundWeapon.name} Kills: {data.mapStats.WeaponWithMostKills.TotalKills}
                      </p>
                      <p>
                        {foundWeapon.name} Headshots: {data.mapStats.WeaponWithMostKills.TotalHeadshots}
                      </p>
                      <p>
                        {foundWeapon.name} Damage Dealt: {data.mapStats.WeaponWithMostKills.TotalDamageDealt.toFixed(2)}
                      </p>
                      <p>
                        {foundWeapon.name} Shots Fired: {data.mapStats.WeaponWithMostKills.TotalShotsFired}
                      </p>
                      <p>
                        {foundWeapon.name} Shots Landed: {data.mapStats.WeaponWithMostKills.TotalShotsLanded}
                      </p>
                    </div>
                    <div className='weapon-container-b'>
                      <h3>{foundWeapon.name}</h3>
                      <img src={foundWeapon.largeIconImageUrl} alt='players best weapon' />
                    </div>
                  </div>
                </div>
              );
          }}
        </Query>
        <div className='notice-container'>
          {!currentMapVariantName && <EmptyContent message={dropboxMessage} />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentPlayer: state.currentPlayer,
});

export default connect(mapStateToProps)(WarzoneDropbox);
