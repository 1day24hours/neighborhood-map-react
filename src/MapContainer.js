import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

//ref:https://github.com/foursquare/react-foursquare
const foursquare = require('react-foursquare')({
    clientID: 'HNWME22DACZBRE3XCHEPDICRSCBQWCN4LSK3FRPO0VHEFFED',
    clientSecret: '0DUHNOBRKVA0AW0PHJK4AE40L02UIWEGOOIVWJW3FS1VCAPR'
});

const params = {
    "ll": "-36.798376, 174.73672",
    "query": 'Home'
};

export class MapContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMaker: {},
            selectedPlace: null,
            map: null,
            items: null,
            // InfoWindowContent:null
        }
    }

    // re-rendering 
    componentWillReceiveProps(nextProps) {
        if (nextProps.selectedPlace !== this.props.selectedPlace) {
            const markers = this.refs;//DOM nodes
            const marker = markers[nextProps.selectedPlace.name].marker;
            this.animateMarker(marker,this.state.map);
            this.setState({
                showingInfoWindow: true,
                selectedPlace: nextProps.selectedPlace,
                activeMaker: marker
            })
        }
    }

    //fetch items when component adding to DOM
    // componentDidMount() {
    //     foursquare.venues.getVenues(selectedPlace)
    //         .then(res => {
    //             this.setState({ items: res.response.venues });
    //         }).catch(error =>console.log('Error',error)
    //         );
    // }

    onMarkerClick = (props, marker, e) => {
        this.animateMarker(marker,props.map);

        foursquare.venues.getVenues(props);

        this.setState({
            selectedPlace: props,
            activeMaker: marker,
            showingInfoWindow: true,
            items: props
        });
    }

    onMapClick = (props) => {
        if (this.state.showingInfoWindow) {
            this.setState({
                showingInfoWindow: false,
                activeMaker: null
            })
        }
    }

  animateMarker = (marker,map) => {
      map.setCenter(marker.position);
      marker.setAnimation(this.props.google.maps.Animation.BOUNCE);
      setTimeout(() => {
          marker.setAnimation(null);
      }, 1000);
  }

    mapReady = (props, map) => {
        this.setState({
            map
        })
    };

    render() {
        const { places, google } = this.props;
        const { activeMaker, showingInfoWindow, selectedPlace } = this.state;
        const initialCenter = {
            lat: -36.795293,
            lng: 174.735701
        };
        const zoom = 12;

        return (
            <Map
                google={google} 
                initialCenter={initialCenter}
                zoom={zoom}
                onClick={this.onMapClick}
                onReady={this.mapReady}
            >
            {places.map(place => (
                <Marker 
                key={place.name}
                name={place.name}
                position={place.location}
                ref={place.name}
                onClick={this.onMarkerClick}
                />
            ))}

            <InfoWindow 
            marker={activeMaker} 
            visible={showingInfoWindow}
            >
            <div>
                <h1>{selectedPlace ? selectedPlace.name :''}</h1>
                <p>{this.state.items ? 
                    this.state.items:
                     'Loading...'}</p>
            </div>
            </InfoWindow>
            </Map>
        )
    }
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyCfdB53Ke2w9uJRVoxmj0HNrzVa0WNW84o'
})(MapContainer);