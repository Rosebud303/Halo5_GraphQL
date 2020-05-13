import React, { Component } from 'react';
import './WarzoneAssault.scss';
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

class WarzoneAssault extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const player_name = this.props.currentPlayer
    const assaultId = '42f97cca-2cb4-497a-a0fd-ceef1ba46bcc'
    return (
      <div>
        <h1>Warzone Assault Bruhz</h1>
        <form>
          <label htmlFor='filter'> Personal Warzone Playlist:</label>
          <select name='filter' className='assault-dropdown'>
            <Query query={WARZONE_QUERY} variables={{ player_name }}>
              {
                ({ loading, error, data }) => {
                  if (loading) return <p>loading...</p>
                  if (error) console.log(error)
                  const parsedMapsMetadata = JSON.parse(localStorage.getItem('mapsMetadata')).mapsMetadata
                  return (data.warzoneStats.ScenarioStats.filter(gameVariant => gameVariant.GameBaseVariantId == assaultId).map(id => {
                    return <option id={id.MapId}>
                      {
                        parsedMapsMetadata.find(item => item.id == id.MapId).name
                      }
                    </option>
                  }))
                }
              }
            </Query>
          </select>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentPlayer: state.currentPlayer
});

export default connect(mapStateToProps)(WarzoneAssault);