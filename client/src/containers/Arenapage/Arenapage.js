import React, { Component } from 'react';
import './Arenapage.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

let ARENA_DROPDOWN_QUERY = gql`
  query gameVariantIdQuery($player_name: String!) {
    arenaGameBases (player_name: $player_name) {
      GameBaseVariantId
    }
  }  
`;

class Arenapage extends Component {
  render() {
    const player_name = this.props.currentPlayer

    return (
      <div>
        <form>
          <label htmlFor='filter'>Sort By:</label>
          <select name='filter' className='arena-filter-options'>
            <Query query={ARENA_DROPDOWN_QUERY} variables={{ player_name }} key={player_name}>
              {
                ({ loading, error, data }) => {
                  if (loading) return <option>Loading...</option>
                  if (error) console.log(error)
                  const parsedGameVariantMetadata = JSON.parse(localStorage.getItem('gameBaseVariantsMetadata')).gameBaseVariantsMetadata
                  return (data.arenaGameBases.map(id => {
                    return <option id={id.GameBaseVariantId} key={id.GameBaseVariantId}>
                      {parsedGameVariantMetadata.find(item => item.id === id.GameBaseVariantId).name}
                    </option>
                  }))
                }
              }
            </Query>
          </select>
        </form>
        <h1>Arena Page Coming Soon...</h1>
        <Link to='/homepage'>
          <button>LINK BACK TO HOMEPAGE</button>
        </Link>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentPlayer: state.currentPlayer,
  currentImgUrlSpartan: state.currentImgUrlSpartan,
  currentImgUrlEmblem: state.currentImgUrlEmblem
});

export default connect(mapStateToProps)(Arenapage);
