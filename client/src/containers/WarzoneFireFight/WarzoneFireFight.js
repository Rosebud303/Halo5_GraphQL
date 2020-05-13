import React, { Component } from 'react';
import './WarzoneFireFight.scss';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const WARZONE_QUERY = gql`
  query WarzoneQuery ($player_name: String!) {
    warzoneStats(player_name: $player_name) {
      ScenarioStats{
        GameBaseVariantId
        MapId
      }
    }
  }
`;

class WarzoneFireFight extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const player_name = this.props.currentPlayer
    const firefightId = 'dfd51ee3-9060-46c3-b131-08d946c4c7b9'
    return (
      <div>
        <h1>Fire Fight bruhz</h1>
        <form>
          <label htmlFor='filter'> Personal Warzone Playlist:</label>
          <select name='filter' className='fire-fight-dropdown'>
            <Query query={WARZONE_QUERY} variables={{ player_name }}>
            {
              ({ loading, error, data }) => {
                    if (loading) return <p>loading...</p>
                    if (error) console.log(error)
                    const parsedMapsMetadata = JSON.parse(localStorage.getItem('mapsMetadata')).mapsMetadata
                    return ( data.warzoneStats.ScenarioStats.filter(gameVariant => gameVariant.GameBaseVariantId == firefightId ).map( id => {
                      return <option id={id.MapId}>
                          {
                          parsedMapsMetadata.find( item => item.id == id.MapId).name
                          }
                      </option>
                    }))
              }
            }
            </Query>
          </select>
        </form>

      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currentPlayer: state.currentPlayer
});

export default connect(mapStateToProps)(WarzoneFireFight);
