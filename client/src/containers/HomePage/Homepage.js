import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { connect } from 'react-redux';
import './Homepage.scss';
import * as actions from '../../actions';
import Carousel from '../Carousel/Carousel';
import api_key from '../../apikey';
import proxyurl from '../../proxyurl';
import axios from 'axios'


class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      searchedPlayer: '',
    }
  }
  
  componentWillMount() {
    this.setUrlSpartan();
    this.setUrlEmblem();
  };

  
  handleChange = (event) => {
    this.setState({
      searchedPlayer: event.target.value
    });
  };
  
  handleSubmit = async (event) => {
    event.preventDefault();
    await this.props.currentSearchedPlayer(this.state.searchedPlayer);
    this.setUrlSpartan();
    this.setUrlEmblem();
  };
  
  setUrlSpartan = () => {
    axios.create({
      headers: {'Ocp-Apim-Subscription-Key': api_key }
    })
      .get(proxyurl +`https://www.haloapi.com/profile/h5/profiles/${this.props.currentPlayer}/spartan`)
      .then(data => this.props.setImgUrlSpartan(data.headers['x-final-url']))
  };

  setUrlEmblem = () => {
    axios.create({
      headers: {'Ocp-Apim-Subscription-Key': api_key }
    })
      .get(proxyurl +`https://www.haloapi.com/profile/h5/profiles/${this.props.currentPlayer}/emblem`)
      .then(data => this.props.setImgUrlEmblem(data.headers['x-final-url']))
  };


  render() {
    return (
      <>
      <div className='carousel-search-options'>
        <Carousel />
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
          {/* *********************************DELETE LATER *******************************/}
          <div className='test-sprites-container'>
            <div className='test-sprites1'></div>
            <div className='test-sprites2'></div>
            <div className='test-sprites3'></div>
            <div className='test-sprites4'></div>
            <div className='test-sprites5'></div>
            <div className='test-sprites6'></div>
          </div>
          {/* *********************************DELETE LATER *******************************/}
      </div>
      <div className='lesser-spartan-details'>
        <section className='spartan-gfx'>
          <img alt='Spartan Appearance' className='lesser-spartan-img' src={this.props.currentImgUrlSpartan}/>
          <img alt='Player Emblem' className='lesser-emblem' src={this.props.currentImgUrlEmblem}/>
        </section>
        <section className='banner-company-links'>
          <img className='lesser-banner'/>
          <h3 className='lesser-company'>COMPANY PLACEHOLDER</h3>
          <Link to='/details' className='homepage-links'>
            <p className='detail-link details'>DETAILS PAGE</p>
          </Link>
          <Link to='/arena' className='homepage-links'>
            <p className='detail-link arena-lesser'>ARENA PAGE</p>
          </Link>
          <Link to='/warzone' className='homepage-links'>
            <p className='detail-link warzone-lesser'>WARZONE PAGE</p>
          </Link>
        </section>
      </div>
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  currentPlayer: state.currentPlayer,
  currentImgUrlSpartan: state.currentImgUrlSpartan,
  currentImgUrlEmblem: state.currentImgUrlEmblem
});

const mapDispatchToProps = (dispatch) => ({
  currentSearchedPlayer: (player) => dispatch(actions.currentSearchedPlayer(player)),
  setImgUrlSpartan: (url) => dispatch(actions.setImgUrlSpartan(url)),
  setImgUrlEmblem: (url) => dispatch(actions.setImgUrlEmblem(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(Homepage)
