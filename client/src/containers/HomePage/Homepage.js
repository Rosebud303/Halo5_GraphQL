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
      spartanImgUrl: ''
    }
  }
  
  componentWillMount() {
    this.setUrlSpartan();
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
    setTimeout(this.setUrlEmblem(), 3000);
  };
  
  setUrlSpartan = () => {
    axios.create({
      headers: {'Ocp-Apim-Subscription-Key': api_key }
    })
      .get(proxyurl +`https://www.haloapi.com/profile/h5/profiles/${this.props.currentPlayer}/spartan`)
      .then(data => this.props.setImgUrlSpartans(data.headers['x-final-url']))
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
      </div>
      <div className='lesser-spartan-details'>
        <section className='spartan-gfx'>
          <img alt='Spartan Appearance' className='lesser-spartan-img' src={this.props.currentImgUrlSpartan}/>
          <img alt='Player Emblem' className='lesser-emblem' src={this.props.currentImgUrlEmblem}/>
        </section>
        <section className='banner-company-links'>
          <img className='lesser-banner'/>
          <h3 className='lesser-company'>COMPANY PLACEHOLDER</h3>
          <p className='detail-link details'>DETAILS PAGE</p>
          <p className='detail-link arena-lesser'>ARENA PAGE</p>
          <p className='detail-link warzone-lesser'>WARZONE PAGE</p>
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
