import React, { Component } from "react";
import "./Arenapage.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Query } from "react-apollo";
import gql from "graphql-tag";

let ARENA_DROPDOWN_QUERY = gql`
  query GameVariantIdQuery($player_name: String!) {
    arenaGameBases(player_name: $player_name) {
      GameBaseVariantId
    }
  }
`;

let SELECTED_VARIANT_QUERY = gql`
  query ArenaQuery($player_name: String!, $GameBaseVariantId: String!) {
    arenaStats(player_name: $player_name GameBaseVariantId: $GameBaseVariantId) {
      TotalGamesWon
      TotalGamesLost
      TotalGamesTied
      TotalGamesCompleted
      TotalKills
      TotalDeaths
      TotalAssists
      WeaponWithMostKills {
        WeaponId {
          StockId
        }
        TotalKills
        TotalDamageDealt
        TotalShotsFired
        TotalShotsLanded
      }
      TotalAssassinations
      TotalMeleeKills
      TotalGroundPoundKills
      TotalShoulderBashKills
      TotalGrenadeKills
      TotalPowerWeaponKills
      TotalHeadshots
      TotalWeaponDamage
      TotalShotsFired
      TotalShotsLanded
      Impulses {
        Id
        Count
      }
      MedalAwards {
        MedalId
        Count
      }
      FlexibleStats {
        MedalStatCounts {
          Id
          Count
        }
      }
    }
  }
`;

class Arenapage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentGameVariant: "",
      currentGameVariantName: "",
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
      currentGameVariant: "",
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
    const parsedWeaponsMetadata = JSON.parse(localStorage.getItem("weaponsMetadata")).weaponsMetadata;
    const parsedMedalsMetadata = JSON.parse(localStorage.getItem("medalsMetadata")).medalsMetadata;

    return (
      <div>
        <h3>Personal Playlist</h3>
        <Query
          query={ARENA_DROPDOWN_QUERY}
          variables={{ player_name }}
          key={player_name}
        >
          {({ loading, error, data }) => {
            if (loading) return <option>Loading...</option>;
            if (error) console.log(error);
            const parsedGameVariantMetadata = JSON.parse(
              localStorage.getItem("gameBaseVariantsMetadata")
            ).gameBaseVariantsMetadata;

            return (
              <div>
                <label htmlFor='filter'>Choose from Arena Playlist:</label>
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
        <Link to='/homepage'>
          <button>LINK BACK TO HOMEPAGE</button>
        </Link>

        {this.state.currentGameVariant && (
          <Query
            query={SELECTED_VARIANT_QUERY}
            variables={{ player_name, GameBaseVariantId }}
          >
            {({ loading, error, data }) => {
              if (loading) return "";
              if (error) console.log(error);
              const { TotalGamesWon, TotalGamesLost, TotalGamesTied, TotalGamesCompleted, TotalKills, TotalDeaths, TotalAssists, WeaponWithMostKills, TotalAssassinations, TotalMeleeKills, TotalGroundPoundKills, TotalShoulderBashKills, TotalGrenadeKills, TotalPowerWeaponKills, TotalHeadshots, TotalWeaponDamage, TotalShotsFired, TotalShotsLanded, Impulses, MedalAwards, FlexibleStats } = data.arenaStats
              const foundWeapon = parsedWeaponsMetadata.find((weapon) => weapon.id === WeaponWithMostKills.WeaponId.StockId);
              //best wep = WeaponWithMostKills.WeaponId.StockId
              console.log(data)
              return (
                <div className='arena-content-container'>
                  <h2 className='game-variant-name'>
                    {this.state.currentGameVariantName}
                  </h2>
                  <main className='arena-main'>
                    <div className='arena-details-box box-a'>
                      <h4 className='box-title'>Win/Loss Stats</h4>
                      <div>
                        <p className='box-details'>Wins: {TotalGamesWon.toLocaleString()}</p>
                        <p className='box-details'>Losses: {TotalGamesLost.toLocaleString()}</p>
                        <p className='box-details'>Ties: {TotalGamesTied.toLocaleString()}</p>
                        <p className='box-details'>Games Completed: {TotalGamesCompleted.toLocaleString()}</p>
                      </div>
                    </div>
                    <div className='arena-details-box box-b'>
                      <h4 className='box-title'>KDA Stats</h4>
                      <p className='box-details'>KDA Ratio: {((TotalKills + TotalAssists / 3) / TotalDeaths).toFixed(4)}</p>
                      <p className='box-details'>Kills: {TotalKills.toLocaleString()}</p>
                      <p className='box-details'>Deaths: {TotalDeaths.toLocaleString()}</p>
                      <p className='box-details'>Assists: {TotalAssists.toLocaleString()}</p>
                    </div>
                    <div className='arena-details-box box-c'>
                      <h4 className='box-title'>Best Performing Weapon</h4>
                      <img src={foundWeapon.largeIconImageUrl} alt='Weapon' />
                      <p><strong><u>{foundWeapon.name}</u></strong></p>
                      <p className='box-details'>Kills: {WeaponWithMostKills.TotalKills.toLocaleString()}</p>
                      <p className='box-details'>Damage Dealt: {parseInt(WeaponWithMostKills.TotalDamageDealt).toLocaleString()}</p>
                      <p className='box-details'>Shots Fired: {WeaponWithMostKills.TotalShotsFired.toLocaleString()}</p>
                      <p className='box-details'>Shots Landed: {WeaponWithMostKills.TotalShotsLanded.toLocaleString()}</p>
                    </div>
                    <div className='arena-details-box box-d'>
                      <h4 className='box-title'>Shooting Stats</h4>
                      <p className='box-details'>Headshots: {TotalHeadshots}</p>
                      <p className='box-details'>Total Damage Done: {parseInt(TotalWeaponDamage).toLocaleString()}</p>
                      <p className='box-details'>Shots Fired:{TotalShotsFired.toLocaleString()}</p>
                      <p className='box-details'>Shots Landed:{TotalShotsLanded.toLocaleString()}</p>
                    </div>
                    <div className='arena-details-box box-e'>
                      <h4 className='box-title'>Impulse Stats</h4>
                    </div>
                    <div className='arena-details-box box-f'>
                      <h4 className='box-title'>Medals</h4>
                    </div>
                    <div className='arena-details-box box-g'>
                      <h4 className='box-title'>Flexible Stats</h4>
                    </div>
                    <div className='arena-details-box box-h'>
                      <h4 className='box-title'>Style Kills</h4>
                      <p className='box-details'>Assassinations: {TotalAssassinations.toLocaleString()}</p>
                      <p className='box-details'>Melee: {TotalMeleeKills.toLocaleString()}</p>
                      <p className='box-details'>Ground Pound: {TotalGroundPoundKills.toLocaleString()}</p>
                      <p className='box-details'>Shoulder Bash: {TotalShoulderBashKills.toLocaleString()}</p>
                      <p className='box-details'>Grenade: {TotalGrenadeKills.toLocaleString()}</p>
                      <p className='box-details'>Power Weapon: {TotalPowerWeaponKills.toLocaleString()}</p>
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
