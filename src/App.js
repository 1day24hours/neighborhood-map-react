import React, { Component ,Fragment} from 'react';
import MapContainer from "./MapContainer";
import SiteHeader from "./SiteHeader";
import SiteSearch from "./SiteSearch";
//ref: https://www.fullstackreact.com/articles/how-to-write-a-google-maps-react-component/#

import { places } from './data/places';
import './App.css';

class App extends Component {
  state = {
    places: [],
    selectedPlace: {}
  };

  componentDidMount(){
    this.setState({
      places
    });
  }

  onPlaceClick = (place) => {
    this.setState({
      selectedPlace: place
    });
  }

  handleFilter = query => {
    if (query !== '') {
      let newPlaces = places.filter(place => {
        return place.name.toLowerCase().indexOf(query.toLowerCase()) !==-1;
      });
      this.setState({
        places: newPlaces
      });
    } else {
      this.setState({
        places
      });
    }
  }

  render() {
    const { places,selectedPlace } = this.state;
    return(
      <Fragment>
        <SiteHeader />
        <main className='site-content'>
        <SiteSearch 
          places={places}
          onPlaceClick={this.onPlaceClick}
          filter={this.handleFilter}
        />
        <MapContainer 
          places={places}
          selectedPlace={selectedPlace}
        />
        </main>
      </Fragment>
    );
  }
}

export default App;
