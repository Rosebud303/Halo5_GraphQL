import React, { Component} from 'react';
import './Warzonepage.scss';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { Query } from 'react-apollo'

const WARZONE_QUERY = gql`
  query warzoneQuery($player_name: String!){
    warzoneStats(player_name: $player_name){
      ScenarioStats{
        GameBaseVariantId
        MapId
      }
    }
  }
`; 


const Warzonepage = () => {
  
  return (
    <div>
      <h1>Warzone Page Coming Soon...</h1>
      <Link to='/homepage'>
        <button>LINK BACK TO HOMEPAGE</button>
      </Link>
      <Link to='/firefight'>
        <button>fire fight</button>
      </Link>
    </div>
  )
}

const mapStateToProps = (state) => ({
  currentPlayer: state.currentPlayer,
  currentImgUrlSpartan: state.currentImgUrlSpartan,
  currentImgUrlEmblem: state.currentImgUrlEmblem
});

export default connect(mapStateToProps)(Warzonepage);

