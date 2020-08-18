import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Homepage.scss';
import * as actions from '../../actions';
import Carousel from '../Carousel/Carousel';
import { api_key, proxyurl } from '../../apikey';
import axios from 'axios';
import Spinner from '../../Spinner/Spinner';


class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      searchedPlayer: '',
    };
  }

  componentDidMount() {
    this.setUrlSpartan();
    this.setUrlEmblem();
  }

  handleChange = (event) => {
    this.setState({
      searchedPlayer: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    this.props.setImgUrlSpartan('');
    this.props.setImgUrlEmblem('');
    await this.props.currentSearchedPlayer(this.state.searchedPlayer);
    this.setUrlSpartan();
    this.setUrlEmblem();
    this.clearInputs();
  };

  setUrlSpartan = () => {
    axios
      .create({
        headers: { 'Ocp-Apim-Subscription-Key': api_key },
      })
      .get(
        proxyurl +
        `https://www.haloapi.com/profile/h5/profiles/${this.props.currentPlayer}/spartan?size=512`
      )
      .then((data) => this.props.setImgUrlSpartan(data.headers['x-final-url']));
  };

  setUrlEmblem = () => {
    axios
      .create({
        headers: { 'Ocp-Apim-Subscription-Key': api_key },
      })
      .get(
        proxyurl +
        `https://www.haloapi.com/profile/h5/profiles/${this.props.currentPlayer}/emblem?size=512`
      )
      .then((data) => this.props.setImgUrlEmblem(data.headers['x-final-url']));
  };

  clearInputs = () => {
    this.setState({ searchedPlayer: '' });
  }

  render() {
    const { handleSubmit, handleChange, state: { searchedPlayer }, props: { currentPlayer, currentImgUrlSpartan, currentImgUrlEmblem } } = this
    const spartanImageStyle = {
      backgroundImage: `url(${currentImgUrlSpartan})`,
      backgroundPosition: `-90px -25px`,
      backgroundSize: 'auto',
      width: '200px',
      height: '230px'
    }

    return (
      <>
        <div className='carousel-search-options'>
          <Carousel />
          <form className='welcome-form' onSubmit={handleSubmit}>
            <input
              className='welcome-search welcome-search-input'
              name='search'
              onChange={handleChange}
              placeholder='Find New Spartan...'
              required
              type='text'
              value={searchedPlayer}
            />
            <button
              className='welcome-search welcome-search-button'
              type='submit'
            >
              Submit
            </button>
          </form>
        </div>
        <div className='lesser-spartan-details'>
          <section className='spartan-gfx'>
            <p className='id-card-name'>{currentPlayer}</p>

            <div className='id-card-images'>
              <div className='id-image-container-1'>
                {currentImgUrlSpartan ? (

                  <div className='spartan-image-container' style={spartanImageStyle}></div>


                ) : (
                    <Spinner name={'Spartan'} />
                  )}
              </div>
              <div className='id-image-container-2'>
                {currentImgUrlEmblem ? (
                  <img
                    alt='Player Emblem'
                    className='lesser-emblem'
                    src={currentImgUrlEmblem}
                  />
                ) : (
                    <Spinner name={'Spartan'} />
                  )}
              </div>
            </div>

          </section>
          <section className='banner-company-links'>
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
            <Link to='/libraries' className='homepage-links'>
              <p className='detail-link warzone-lesser'>LIBRARIES PAGE</p>
            </Link>
          </section>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentPlayer: state.currentPlayer,
  currentImgUrlSpartan: state.currentImgUrlSpartan,
  currentImgUrlEmblem: state.currentImgUrlEmblem,
});

const mapDispatchToProps = (dispatch) => ({
  currentSearchedPlayer: (player) =>
    dispatch(actions.currentSearchedPlayer(player)),
  setImgUrlSpartan: (url) => dispatch(actions.setImgUrlSpartan(url)),
  setImgUrlEmblem: (url) => dispatch(actions.setImgUrlEmblem(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);
