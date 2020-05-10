import React, { Component } from 'react';
import { connect } from 'react-redux';
import './WelcomePage.scss';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';


class WelcomePage extends Component {
  constructor(props) {
    super(props)

    this.state = {
      searchedPlayer: ''
    }
  }

  handleChange = (event) => {
    this.setState({
      searchedPlayer: event.target.value
    })
  }

  handleSubmit = (e, state) => {
    this.props.currentSearchedPlayer(state)
    e.preventDefault()
    return <Link to='jfafja'></Link>
  }

  render() {
    return (
      <div>
        <form type='submit' onSubmit={(event) => {this.handleSubmit(event, this.state.searchedPlayer)}}>
          <input 
            className='welcome-search'
            name='search'
            onChange={() => this.handleChange}
            placeholder='Search Your Spartan...' 
            type='search' 
            value={this.state.searchedPlayer}
          />
        </form>
    </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  currentSearchedPlayer: (player) => dispatch( actions.currentSearchedPlayer(player) )
})

export default connect(null, mapDispatchToProps)(WelcomePage)
