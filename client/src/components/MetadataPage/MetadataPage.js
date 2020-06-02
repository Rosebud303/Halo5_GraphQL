import React, { Component } from 'react';
import './MetadataPage.scss';
import Header from '../Header/Header';
import LibrarySelector from '../LibrarySelector/LibrarySelector';
import LibraryCardsContainer from '../LibraryCardsContainer/LibraryCardsContainer';


class MetadataPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedLibraryName: '',
      selectedLibrary: []
    }
  }

  changeLibrary = (e) => {
    this.setState({ selectedLibraryName: e.target.innerText.toLowerCase() }, () => {
      this.changeSelectedLibrary()
    })

  }

  changeSelectedLibrary = () => {
    let library = JSON.parse(localStorage.getItem(`${this.state.selectedLibraryName}Metadata`))
    this.setState({ selectedLibrary: library })
  }

  render() {
    return (
      <div>
        <Header title={'Libraries'} button1={'warzone'} button2={'arena'} />
        <LibrarySelector changeLibrary={this.changeLibrary} />
        {this.state.selectedLibrary && <LibraryCardsContainer selectedLibrary={this.state.selectedLibrary} />}
      </div>
    )
  }
}

export default MetadataPage
