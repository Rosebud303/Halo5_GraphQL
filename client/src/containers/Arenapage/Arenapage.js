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
  constructor(props) {
    super(props);
    this.state = {
      currentGameVariant: ''
    }
  }

  selectArenaVariant = (e) => {
    e.preventDefault()
    // console.log(e.target.children.find(data => data.innerText == e.target.value))
    // console.log(e.target.children.some(data => data.innerText == e.target.value))
    console.log(e.target.firstElementChild)
    this.setState({currentGameVariant: e.target.value})
  }
  
  render() {
    const player_name = this.props.currentPlayer

    return (
      <div>
        <form onSubmit={(event) => this.selectArenaVariant(event)}>
          <label htmlFor='filter'>Sort By:</label>
          <select onChange={(event) => this.selectArenaVariant(event)} name='filter' className='arena-filter-options'>
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
          <button type='submit'> Submit</button>
        </form>
        <h1>Arena Page Coming Soon...</h1>
        <Link to='/homepage'>
          <button>LINK BACK TO HOMEPAGE</button>
        </Link>
        <main className='arena-main'>
          <div className='arena-details-box box-a'>

          </div>
          <div className='arena-details-box box-b'>

          </div>
          <div className='arena-details-box box-c'>

          </div>
          <div className='arena-details-box box-d'>

          </div>
          <div className='arena-details-box box-e'>

          </div>
          <div className='arena-details-box box-f'>

          </div>
          <div className='arena-details-box box-g'>

          </div>
          <div className='arena-details-box box-h'>

          </div>
          <div className='arena-details-box box-i'>

          </div>

        </main>
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
