import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import './Homepage.scss';
import * as actions from '../../actions';
import Carousel from '../Carousel/Carousel'

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      searchedPlayer: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      searchedPlayer: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.currentSearchedPlayer(this.state.searchedPlayer)
  }
  
  render() {
    return (
      <>
      <div className='carousel-search-options'>
        {/* Carousel  */}
        <Carousel />
        {/* Search Input */}
        <form className='welcome-form' onSubmit={this.handleSubmit}>
            <input 
              className='welcome-search welcome-search-input'
              name='search'
              onChange={this.handleChange}
              placeholder='Search Your Spartan...'
              required
              type='text' 
              value={this.state.searchedPlayer}
            />
            <button className='welcome-search welcome-search-button' type='submit'>Submit</button>
          </form>
      </div>
      <div className='lesser-spartan-details'>
        <section className='spartan-gfx'>
          <img className='lesser-spartan-img'/>
          <img className='lesser-emblem'/>
        </section>
        <section className='banner-company-links'>
          <img className='lesser-banner'/>
          <h3 className='lesser-company'></h3>
          <p className='detail-link details'></p>
          <p className='detail-link arena-lesser'></p>
          <p className='detail-link warzone-lesser'></p>
        </section>
      </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  currentPlayer: state.currentPlayer
});

const mapDispatchToProps = (dispatch) => ({
  currentSearchedPlayer: (player) => dispatch(actions.currentSearchedPlayer(player))
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
