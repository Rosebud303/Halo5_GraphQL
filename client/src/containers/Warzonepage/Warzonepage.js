import React, { Component } from "react";
import "./Warzonepage.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import gql from "graphql-tag";
import { Query } from "react-apollo";

let GAME_VARIANT_WARZONE_QUERY = gql`
  query GameVariantWzQuery($player_name: String!) {
    scenarioStats(player_name: $player_name) {
      GameBaseVariantId
      MapId
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

class Warzonepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameVariantId: "dfd51ee3-9060-46c3-b131-08d946c4c7b9",
    };
    this.parsedGameBaseVariants = JSON.parse(
      localStorage.getItem("gameBaseVariantsMetadata")
    ).gameBaseVariantsMetadata;
    this.parsedWeaponsMetadata = JSON.parse(
      localStorage.getItem("weaponsMetadata")
    ).weaponsMetadata;
    this.parsedMedalsMetadata = JSON.parse(
      localStorage.getItem("medalsMetadata")
    ).medalsMetadata;
  }

  reduceTotals = (data, property) => {
    return data.reduce((acc, cur) => {
      acc += cur[property];
      return acc;
    }, 0);
  };

  findMostEffectiveWeapon = (data) => {
    return data.sort((a, b) => {
      return (
        b.WeaponWithMostKills.TotalKills - a.WeaponWithMostKills.TotalKills
      );
    })[0].WeaponWithMostKills;
  };

  findMostObtainedMedals = (data, parsedMedalsMetadata) => {
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
      let foundMedal = parsedMedalsMetadata.find((medal) => medal.id === item);
      return {
        Count: allMedals[item],
        Name: foundMedal.name,
        SpriteLocation: foundMedal.spriteLocation,
      };
    });
  };

  createContent = (wholeData, id) => {
    const {
      reduceTotals,
      findMostEffectiveWeapon,
      findMostObtainedMedals,
      parsedGameBaseVariants,
      parsedMedalsMetadata,
      parsedWeaponsMetadata,
    } = this;
    const data = wholeData.scenarioStats.filter(
      (item) => item.GameBaseVariantId === id
    );
    const foundWeapon = parsedWeaponsMetadata.find(
      (weapon) => weapon.id === findMostEffectiveWeapon(data).WeaponId.StockId
    );
    return (
      <div>
        <p>Total Wins: {reduceTotals(data, "TotalGamesWon")}</p>
        <p>Total Losses: {reduceTotals(data, "TotalGamesLost")}</p>
        <p>Total Ties: {reduceTotals(data, "TotalGamesTied")}</p>
        <p>Total Kills: {reduceTotals(data, "TotalKills")}</p>
        <p>Total Headshots: {reduceTotals(data, "TotalHeadshots")}</p>
        <p>Total Shots Fired: {reduceTotals(data, "TotalShotsFired")}</p>
        <p>Total Shots Landed: {reduceTotals(data, "TotalShotsLanded")}</p>
        <p>
          Total Damage Dealt:{" "}
          {reduceTotals(data, "TotalWeaponDamage").toFixed(2)}
        </p>
        <p>Best Killing Tool: {foundWeapon.name}</p>
        <p>
          {foundWeapon.name} Total Kills:{" "}
          {findMostEffectiveWeapon(data).TotalKills}
        </p>
        <p>
          {foundWeapon.name} Total Headshots:{" "}
          {findMostEffectiveWeapon(data).TotalHeadshots}
        </p>
        <p>
          {foundWeapon.name} Total Shots Fired:{" "}
          {findMostEffectiveWeapon(data).TotalShotsFired}
        </p>
        <p>
          {foundWeapon.name} Total Shots Landed:{" "}
          {findMostEffectiveWeapon(data).TotalShotsLanded}
        </p>
        <p>
          {foundWeapon.name} Total Damage Dealt:{" "}
          {findMostEffectiveWeapon(data).TotalDamageDealt.toFixed(2)}
        </p>
        <img src={foundWeapon.largeIconImageUrl} />
        <p>
          {
            parsedGameBaseVariants.find(
              (variant) => variant.id == this.state.gameVariantId
            ).name
          }
          : Medals
        </p>
        {findMostObtainedMedals(data, parsedMedalsMetadata).map((medal) => {
          const medalStyles = {
            backgroundImage: `url(${medal.SpriteLocation.spriteSheetUri})`,
            backgroundPosition: `-${medal.SpriteLocation.left}px -${medal.SpriteLocation.top}px`,
            backgroundSize: "auto",
            width: "74px",
            height: "74px",
            margin: "2rem",
          };
          return (
            <div>
              <div style={medalStyles}></div>: {medal.Count}
            </div>
          );
        })}
      </div>
    );
  };

  render() {
    const { parsedGameBaseVariants, createContent } = this;
    let player_name = this.props.currentPlayer;
    let GameBaseVariantId = this.state.gameVariantId;
    const firefightVariantId = "dfd51ee3-9060-46c3-b131-08d946c4c7b9";
    const assaultVariantId = "42f97cca-2cb4-497a-a0fd-ceef1ba46bcc";
    const regularVariantId = "f6de5351-3797-41e9-8053-7fb111a3a1a0";

    return (
      <div>
        <h1>Warzone Page Coming Soon...</h1>
        <Link to='/homepage'>
          <button>LINK BACK TO HOMEPAGE</button>
        </Link>
        <Query query={GAME_VARIANT_WARZONE_QUERY} variables={{ player_name }}>
          {({ loading, error, data }) => {
            if (loading) return "";
            if (error) console.log(error);
            return (
              <div className='accordion-section'>
                <figure>
                  <img
                    className='game-variant-image'
                    src='https://i.imgur.com/mZmEnAq.jpg'
                    alt='Warzone Firefight Background'
                  />
                  <input
                    type='radio'
                    name='radio-set'
                    defaultChecked='checked'
                  />
                  <figcaption>
                    <Link to='/warzone/firefight'>
                      <span id={firefightVariantId}>
                        {
                          parsedGameBaseVariants.find(
                            (variant) => variant.id === this.state.gameVariantId
                          ).name
                        }
                      </span>
                    </Link>
                    {createContent(data, firefightVariantId)}
                  </figcaption>
                  <figure>
                    <img
                      className='game-variant-image'
                      src='https://i.imgur.com/h37QJVi.jpg'
                      alt='Warzone Assault Background'
                    />
                    <input
                      type='radio'
                      name='radio-set'
                      defaultChecked='checked'
                    />
                    <figcaption>
                      <Link to='/warzone/assault'>
                        <span id={assaultVariantId}>Warzone Assault</span>
                      </Link>
                      {createContent(data, assaultVariantId)}
                    </figcaption>
                    <figure>
                      <img
                        className='game-variant-image'
                        src='https://i.imgur.com/7F4dFgn.jpg'
                        alt='Warzone Regular Background'
                      />
                      <input
                        type='radio'
                        name='radio-set'
                        id='accordion-selector-last'
                        defaultChecked='checked'
                      />
                      <figcaption>
                        <Link to='/warzone/regular'>
                          <span id={regularVariantId}>Warzone Regular</span>
                        </Link>
                        {createContent(data, regularVariantId)}
                      </figcaption>
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

export default connect(mapStateToProps)(Warzonepage);
