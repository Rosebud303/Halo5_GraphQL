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
      selectedCompare: '',
    };
  }

  changeLibrary = (e) => {
    this.setState({ selectedLibraryName: e.target.innerText.toLowerCase() }, () => {
      this.changeSelectedLibrary();
    });
    this.changeLibraryFilters(e);
    this.setState({ selectedCompare: e.target.dataset.compare })
  };

  changeSelectedLibrary = () => {
    let library = JSON.parse(localStorage.getItem(`${this.state.selectedLibraryName}Metadata`));
    this.setState({ selectedLibrary: library });
  };

  changeLibraryFilters = (e) => {
    this.setState({ selectedLibraryFilters: JSON.parse(e.target.dataset.filter) });
  };

  filterChosenLibrary = async (e) => {
    const btnText = e.target.innerText
    const filterProp = this.state.selectedCompare
    await this.changeSelectedLibrary()
    if (btnText === 'ALL') return
    if (this.state.selectedLibraryName === 'maps') {
      const lowerCasedBtnText = btnText.toLowerCase();
      const correctBtnText = lowerCasedBtnText.charAt(0).toUpperCase() + lowerCasedBtnText.slice(1)

      var newLibrary = this.state.selectedLibrary.filter(library => {
        if (!library[filterProp]) return
        else return library[filterProp].includes(correctBtnText)
      })
    } else {
      var newLibrary = this.state.selectedLibrary.filter(library => {
        return library[filterProp].toUpperCase() == btnText
      })
    }


    this.setState({ selectedLibrary: newLibrary })
  };

  render() {
    const { state: { selectedLibrary, selectedLibraryFilters, selectedLibraryName }, changeLibrary, filterChosenLibrary } = this;

    return (
      <div className='metadata-body'>
        <Header title={'Libraries'} button1={'warzone'} button2={'arena'} button3={'details'} />
        <LibrarySelector changeLibrary={changeLibrary} />
        <LibraryCardsFilters selectedLibraryFilters={selectedLibraryFilters} filterChosenLibrary={filterChosenLibrary} />
        <LibraryCardsContainer selectedLibraryName={selectedLibraryName} selectedLibrary={selectedLibrary} />
      </div>
    );
  }
}

export default MetadataPage;
