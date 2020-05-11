import React, { Component } from 'react';
import { connect } from 'react-redux';
import './WelcomePage.scss';
import { Link, Redirect } from 'react-router-dom';
import * as actions from '../../actions';


class WelcomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchedPlayer: '',
      searched: false
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
    this.setState({searched: true})
  }

  render() {
    const redirectPath = this.state.searched ? '/homepage' : '/';
    
    return (
      <>
        <header>
          <h1 className='welcome-heading'>Halo Search GraphQL</h1>
        </header>
        <div className='welcome-page'>
          <form className='welcome-form' onSubmit={this.handleSubmit}>
            <Redirect to={redirectPath}/>
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
      </>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  currentSearchedPlayer: (player) => dispatch( actions.currentSearchedPlayer(player) )
})

export default connect(null, mapDispatchToProps)(WelcomePage)
