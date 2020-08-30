import React, { Component } from 'react';
import { connect } from 'react-redux';
import './WelcomePage.scss';
import { Redirect } from 'react-router-dom';
import * as actions from '../../actions';
import axios from 'axios';
import { api_key } from '../../apikey';

class WelcomePage extends Component {
  constructor() {
    super();

    this.state = {
      searchedPlayer: '',
      searched: false,
    };
  }

  componentDidMount() {
    if (!localStorage.csrMetadata) {
      axios
        .create({
          headers: { 'Ocp-Apim-Subscription-Key': api_key },
        })
        .get(`https://www.haloapi.com/metadata/h5/metadata/csr-designations`)
        .then(data => localStorage.setItem('csrMetadata', JSON.stringify(data.data)))
    }
  }

  handleChange = (event) => {
    this.setState({
      searchedPlayer: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.currentSearchedPlayer(this.state.searchedPlayer);
    this.setState({ searched: true });
  };

  render() {
    const { state: { searched, searchedPlayer }, handleSubmit, handleChange } = this
    const redirectPath = searched ? '/homepage' : '/';

    return (
      <div className='welcome'>
        <header className='welcome-banner'>
          <img alt='Application name' src='https://i.imgur.com/z1qbHFr.png' />
        </header>
        <div className='welcome-page'>
          <form className='welcome-form' onSubmit={handleSubmit}>
            <Redirect to={redirectPath} />
            <input
              className='welcome-search welcome-search-input'
              name='search'
              onChange={handleChange}
              placeholder='Search Your Spartan...'
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
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  currentSearchedPlayer: (player) =>
    dispatch(actions.currentSearchedPlayer(player)),
});

export default connect(null, mapDispatchToProps)(WelcomePage);
