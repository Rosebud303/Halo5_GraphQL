import React, { Component } from 'react';
import './MetadataPage.scss';
import Header from '../Header/Header';
import LibrarySelector from '../LibrarySelector/LibrarySelector';
import LibraryCardsContainer from '../LibraryCardsContainer/LibraryCardsContainer';
import { LibraryCardsFilters } from '../LibraryCardsFilters/LibraryCardsFilters';

class MetadataPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedLibraryName: '',
      selectedLibrary: [],
      selectedLibraryFilters: [],
    };
  }

  changeLibrary = (e) => {
    this.setState({ selectedLibraryName: e.target.innerText.toLowerCase() }, () => {
      this.changeSelectedLibrary();
    });
    this.changeLibraryFilters(e);
  };

  changeSelectedLibrary = () => {
    let library = JSON.parse(localStorage.getItem(`${this.state.selectedLibraryName}Metadata`));
    this.setState({ selectedLibrary: library });
  };

  changeLibraryFilters = (e) => {
    this.setState({ selectedLibraryFilters: JSON.parse(e.target.dataset.filter) });
  };

  render() {
    const { state: { selectedLibrary, selectedLibraryFilters, selectedLibraryName }, changeLibrary } = this;
    
    return (
      <div>
        <Header title={'Libraries'} button1={'warzone'} button2={'arena'} />
        <LibrarySelector changeLibrary={changeLibrary} />
        <LibraryCardsFilters selectedLibraryFilters={selectedLibraryFilters} />
        <LibraryCardsContainer selectedLibraryName={selectedLibraryName} selectedLibrary={selectedLibrary} />
      </div>
    );
  }
}

export default MetadataPage;
