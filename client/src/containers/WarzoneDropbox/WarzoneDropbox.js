import React, { Component } from 'react';
import './WarzoneDropbox.scss';
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

class WarzoneDropbox extends Component {
  render() {
    const player_name = this.props.currentPlayer
    let currentKey = 0

    return (
      <div>
        <h1>Warzone Game Variant</h1>
        <form>
          <label htmlFor='filter'> Personal Warzone Playlist:</label>
          <select name='filter' className='warzone-dropdown'>
            <Query query={WARZONE_QUERY} variables={{ player_name }}>
              {
                ({ loading, error, data }) => {
                  if (loading) return <option>Loading...</option>
                  if (error) console.log(error)
                  currentKey = currentKey++
                  const parsedMapsMetadata = JSON.parse(localStorage.getItem('mapsMetadata')).mapsMetadata
                  return (data.warzoneStats.ScenarioStats.filter(gameVariant => gameVariant.GameBaseVariantId === this.props.warzoneGameVariantId).map(id => {
                    return <option id={id.MapId} key={id.MapId}>
                      {parsedMapsMetadata.find(item => item.id === id.MapId).name}
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

export default connect(mapStateToProps)(WarzoneDropbox);