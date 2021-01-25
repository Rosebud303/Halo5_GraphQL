import React, { Component } from 'react';
import './MetadataPage.scss';
import Header from '../Header/Header';
import LibrarySelector from '../LibrarySelector/LibrarySelector';
import LibraryCardsContainer from '../LibraryCardsContainer/LibraryCardsContainer';
import { LibraryCardsFilters } from '../LibraryCardsFilters/LibraryCardsFilters';
import EmptyContent from '../EmptyContent/EmptyContent';
import MetadataLoader from '../../MetadataLoader';
import { metadataQueryListB } from '../../Queries/MetadataQueries.js'

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
        if (!library[filterProp]) return ''
        else return library[filterProp].includes(correctBtnText)
      })
    } else {
      newLibrary = this.state.selectedLibrary.filter(library => {
        return library[filterProp].toUpperCase() === btnText
      })
    }


    this.setState({ selectedLibrary: newLibrary })
  };

  render() {
    const { state: { selectedLibrary, selectedLibraryFilters, selectedLibraryName }, changeLibrary, filterChosenLibrary } = this;
    const metadataMessage = 'To get started, select the type of Halo 5 content you\'d like to see.  Once selected, you will find category filters below if available.  Hover over images to display detailed information.'

    return (
      <div className='metadata-body'>
        <MetadataLoader metadataSet={metadataQueryListB} />
        <Header header={'Information Center'} button1={'warzone'} button2={'arena'} button3={'details page'} button4={'overview'} />
        <LibrarySelector changeLibrary={changeLibrary} />
        <LibraryCardsFilters selectedLibraryFilters={selectedLibraryFilters} filterChosenLibrary={filterChosenLibrary} />
        <LibraryCardsContainer selectedLibraryName={selectedLibraryName} selectedLibrary={selectedLibrary} />
        <div className='notice-container'>{!selectedLibraryName && <EmptyContent message={metadataMessage} />}</div>
      </div>
    );
  }
}

export default MetadataPage;
