import React, { Component ,Fragment} from 'react';
import MapContainer from "./MapContainer";
import SiteHeader from "./SiteHeader";
import SiteSearch from "./SiteSearch";

import {places} from './data/places';
import './App.css';

class App extends Component {
  state = {
    places = [],
    selectedPlace: {}
  };

  render() {
    const { places,selectedPlace } = this.state;
    return(
      <Fragment>
        <SiteHeader />
        <SiteSearch />
        <MapContainer />
      </Fragment>
    )
  }
}

export default App;
