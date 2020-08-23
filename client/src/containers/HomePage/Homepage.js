import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Homepage.scss';
import * as actions from '../../actions';
import Carousel from '../Carousel/Carousel';
import { api_key, proxyurl } from '../../apikey';
import axios from 'axios';
import Spinner from '../../Spinner/Spinner';

const descriptions = [
  'Come explore our newly developed application based on the wildly popular game, Halo 5! Feel free to search your personal profile and explore your very own history in this online multiplayer game! Thank you for trying out Halo 5 Search!',
  'This page gives you a quick overview of your entire Halo 5 history! Totaling your records all on one page. Our overview feature allows for a quick glance into your personal stats accumulated over your Halo 5 play time. Come see your accolades throughout your Halo 5 career.',
  "Check out how well you performed in Halo 5's most popular PvP mode, ARENA! Scroll through your own personal playlist and find out how well you did on every map you ever played! Other information such as most used weapon and most won medals will also be available for each played map.",
  "Grunts, Elites, and Bosses, you've slayed them all! Want to know how many of them you took down? Look no further! Our Warzone feature will allow you to see just how much damage you caused to your enemies! Click link to find out how well you did in this multiplayer PvE mode",
  'Want to find out more about Halo 5? Our Information Center page will show you all the aspects of Halo 5. We have included this Information Center page for other miscellaneous content about Halo 5. For the person that just wants to explore a little more about the world of Halo 5.'
]

const titles = [
  'Welcome,',
  'Overview',
  'Arena',
  'Warzone',
  'Information Center'
]

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      searchedPlayer: '',
      currentDescription: descriptions[0],
      currentTitle: titles[0],
      profileInfo: {},
      firstModified: '',
      lastModified: ''
    };
  }

  componentDidMount() {
    this.setUrlSpartan();
    this.setUrlEmblem();
    this.setSpartanProfileInfo();
  }

  handleMouseOver = (e) => {
    this.setState({ currentDescription: descriptions[parseInt(e.target.id)], currentTitle: titles[e.target.id] })
  }

  handleMouseOut = () => {
    this.setState({ currentDescription: descriptions[0], currentTitle: titles[0] })
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
    this.setSpartanProfileInfo();
    this.clearInputs();
  };

  setSpartanProfileInfo = () => {
    axios
      .create({
        headers: { 'Ocp-Apim-Subscription-Key': api_key },
      })
      .get(
        proxyurl +
        `https://www.haloapi.com/profile/h5/profiles/${this.props.currentPlayer}/appearance`
      )
      .then((data) => this.setState({
        profileInfo: data.data,
        firstModified: (data.data.FirstModifiedUtc.ISO8601Date.slice(0, 10)),
        lastModified: (data.data.LastModifiedUtc.ISO8601Date.slice(0, 10))
      }));
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
    const { handleSubmit, handleChange, handleMouseOver, handleMouseOut, state: { currentTitle, currentDescription, searchedPlayer, profileInfo, lastModified, firstModified }, props: { currentPlayer, currentImgUrlSpartan, currentImgUrlEmblem }
    } = this
    const spartanImageStyle = {
      backgroundImage: `url(${currentImgUrlSpartan})`,
      backgroundPosition: `-110px -25px`,
      backgroundSize: 'auto',
      width: '200px',
      height: '230px',
      maxWidth: '100%',
      maxHeight: '100%'
    }

    return (
      <>
        <div className='homepage-container'>
          <div className='carousel-search-options'>
            <Carousel />
          </div>
          <div className='lesser-spartan-details'>
            <section className='banner-company-links'>
              <div className='buttons-descriptions-section'>
                <h1 id='nav-links'> Navigation Links </h1>
                <div className='button-links-home'>
                  <Link onMouseOver={(event) => handleMouseOver(event)} onMouseOut={() => handleMouseOut()} id='1' to='/details' className='homepage-links'>
                    <p onMouseOver={(event) => handleMouseOver(event)} onMouseOut={() => handleMouseOut()} id='1' className='detail-link details'>OVERVIEW</p>
                  </Link>
                  <Link onMouseOver={(event) => handleMouseOver(event)} onMouseOut={() => handleMouseOut()} id='2' to='/arena' className='homepage-links'>
                    <p onMouseOver={(event) => handleMouseOver(event)} onMouseOut={() => handleMouseOut()} id='2' className='detail-link arena-lesser'>ARENA</p>
                  </Link>
                  <Link onMouseOver={(event) => handleMouseOver(event)} onMouseOut={() => handleMouseOut()} id='3' to='/warzone' className='homepage-links'>
                    <p onMouseOver={(event) => handleMouseOver(event)} onMouseOut={() => handleMouseOut()} id='3' className='detail-link warzone-lesser'>WARZONE</p>
                  </Link>
                  <Link onMouseOver={(event) => handleMouseOver(event)} onMouseOut={() => handleMouseOut()} id='4' to='/libraries' className='homepage-links'>
                    <p onMouseOver={(event) => handleMouseOver(event)} onMouseOut={() => handleMouseOut()} id='4' className='detail-link warzone-lesser'>INFORMATION CENTER</p>
                  </Link>
                </div>
                <div className='full-descript'>
                  <p className='description-info'>| hover links for details |</p>
                  <div className='descript-title'>{currentTitle}</div>
                  <div className='descript-container'>
                    <p className='description'>{currentDescription}</p>
                  </div>
                </div>
              </div>
            </section>
            <section className='spartan-gfx'>
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
              <div className='identification-card-container'>
                <div className='id-left-side-container'>
                  <div className='id-left-title-container'>
                    <p className='id-card-title'>SPARTAN REGISTRY IDENTIFICATION</p>
                  </div>
                  <div className='id-left-content-container'>
                    <div className='id-left-images-container'>
                      <div className='id-left-images'>
                        <img className='id-left-pics' src='https://i.imgur.com/NWlB6Wd.jpg' />
                      </div>
                      <div className='id-left-images'>
                        {currentImgUrlEmblem ? (
                          <img
                            alt='Player Emblem'
                            className='lesser-emblem id-left-pics'
                            src={currentImgUrlEmblem}
                          />
                        ) : (
                            <Spinner name={'Spartan'} />
                          )}
                      </div>
                    </div>
                    <div className='id-left-information-container'>
                      <p>NAME:</p>
                      <p className='id-text-values current-player-id'>{currentPlayer}</p>
                      <p>ALIAS:</p>
                      <p className='id-text-values'>{profileInfo.ServiceTag}</p>
                      <p>DOB:</p>
                      <p className='id-text-values'>{firstModified}</p>
                      <p>LAST SEEN ON:</p>
                      <p className='id-text-values'>{lastModified}</p>
                      <p>COMPANY ALLEGIANCE:</p>
                      <p className='id-text-values'>{profileInfo.Company ? profileInfo.Company.Name : 'No Company'}</p>
                      <div className='id-bottom-content'>
                        <div className='id-bottom-content-row'>
                          <p>HEIGHT</p>
                          <p>WEIGHT</p>
                          <p>UNIT</p>
                        </div>
                        <div className='id-bottom-content-row'>
                          <p className='id-text-values'>7ft 2in</p>
                          <p className='id-text-values'>287lb</p>
                          <p className='id-text-values'>MK1</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='id-right-side-container'>
                  <div className='id-spartan-face-container'>
                    {currentImgUrlSpartan ? (
                      <div className='spartan-image-container' style={spartanImageStyle}></div>
                    ) : (
                        <Spinner name={'Spartan'} />
                      )}
                  </div>
                  <div className='id-barcode-container'>
                    <img className='barcode-image' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAXAAAACJCAMAAAACLZNoAAAAdVBMVEX///8AAACpqanJycloaGjAwMC9vb24uLjl5eXa2trV1dWlpaWurq7R0dHFxcVbW1s4ODienp50dHRubm7v7+/4+PhiYmLo6OgjIyOJiYlTU1MbGxuAgICTk5NkZGQ9PT1FRUUtLS0XFxcQEBCMjIwzMzNWVlb945BOAAADkklEQVR4nO3SW3PaMBCG4RUIzMkQy5yDSQgk//8ndnclQ5OZdjLTTi86ry44yJL220cWYTAYjL85JuEmy1BJE/IQCVudDDq10M+1Lgl7/Vjrn4F+N2EiR1sVwtkPGIRaTr7uEkLUrzosZB5msgo+9eGrrIRI8gK6eSXTMPcCE38cLlrg5OuCbhUrsdFVNsZhLJ1vfMqbQ2hKkG0+b+N1q7DUIDv99Zar1hq40hU2ZVv9vBzkoNMbO+uovXYy0r+1F3t/cwCRYZla5V5bmWnVSqPYeA3FLpReT31jR23M0nVhKlFLFNXHVtlpvaGGmOcnVi/6SWMPa5DPTwV8Ufq0EFcLYWOhuQ6+7imE5H1WegtTOeuql+DpxUvII1fUXAMH3/ljLZHBhwXc+4z+bBRG/jr0ferPeQkSg78MG69r4If+5lfl5nvw1+cCmcG7HnylvTb3a9Z1F51sfXMGP2fwpOBzvfuRrzpe7+C513tj+U3K6Votse/B+63/K/j2T8H7IN8Bn30DvAIccMABBxxwwAEHHHDAAQcccMABBxxwwAEHHHDAAQcccMABBxxwwAEHHHDAAQcccMABBxxwwAEHHHDAAQcccMABBxxwwAEHHHDAAQcccMABBxxwwAEHHHDAAQcccMABBxxwwAEHHHDAAQcccMABBxxwwAEHHHDAAQcccMABBxxwwAEHHHDAAQcccMABBxxwwAEHHHDAAQcccMABBxxwwAEHHHDAAQcccMABBxxwwAEHHHDAAQcccMABBxxwwAEHHHDAAQcccMABBxxwwAEHHHDAAQcccMABBxxwwAEHHHDAAQcccMB/B35zjSY/sePP5aQe/Pr+BfyYQ3wFf89T1udcQ2yDT61+Ak99rvMdfOKPr5cv4B85iI2x3n0Gf+nBmxJk62+IgrcF/OS6+1z1E/jVNXrw26/AX/bloi1I3d+8NTbTdRbFwcMdfPEZ/KOAd/46bOTtAZ63yjpWMo21jJIPbTo2sm5TW8uwTdFSnQ7WlE4Nrf24k05fqFNKTaaMU1n4ukNKVmsah7KME2miT+VVVkJkoBXsX9vIJC6tQLv2x1piHe0+pzpld9ApYdk6izMZp6Sn3XxzTMleltF5LY0Hlk20urUHsfNKNgtSlxI3XXdu/DQLUmkQi5w6rTuWWamqgTPAI0ijNZM1NokjLZGvpUvZzk2s10XfWOfrMtO83VgUG+P7VsY/HT8AXmPI/Zt4YIgAAAAASUVORK5CYII=' />
                  </div>
                </div>
              </div>
            </section>
          </div>
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
