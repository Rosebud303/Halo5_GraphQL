import React, { Component } from 'react';
import './Arenapage.scss';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

let DROPDOWN_QUERY = gql`
  query gameVariantIdQuery($player_name: String!) {
    arenaStats (player_name: $player_name) {
      Result {
        ArenaStats {
          ArenaGameBaseVariantStats {
            GameBaseVariantId
          }
        }
      }
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
            <Query query={DROPDOWN_QUERY} variables={{ player_name }}>
              {
                ({ loading, error, data }) => {
                  if (loading) return <p>loading...</p>
                  if (error) console.log(error)
                  const parsedGameVariantMetadata = JSON.parse(localStorage.getItem('gameBaseVariantsMetadata')).gameBaseVariantsMetadata
                  return (data.arenaStats.Result.ArenaStats.ArenaGameBaseVariantStats.map(id => {
                    return <option id={id.GameBaseVariantId}>{
                      parsedGameVariantMetadata.find(item => item.id === id.GameBaseVariantId).name
                    }</option>
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
