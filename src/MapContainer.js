import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

//ref:https://github.com/foursquare/react-foursquare
const foursquare = require('react-foursquare')({
    clientID: 'HNWME22DACZBRE3XCHEPDICRSCBQWCN4LSK3FRPO0VHEFFED',
    clientSecret: '0DUHNOBRKVA0AW0PHJK4AE40L02UIWEGOOIVWJW3FS1VCAPR'
});

// let placeData = props;
// const ll = placeData.location.lat + ',' + placeData.location.lng;

// const params = {
//     "ll": ll,
//     "query": placeData.name
// };

export class MapContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMaker: {},
            selectedPlace: null,
            map: null,
            items: []
            // InfoWindowContent:null
        }
    }

    // re-rendering 
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (nextProps.selectedPlace !== this.props.selectedPlace) {
            const markers = this.refs;//DOM nodes
            const marker = markers[nextProps.selectedPlace.name].marker;
            this.animateMarker(marker,this.state.map);
            this.fetchFoursquare(`${marker.getPosition().lat()},${marker.getPosition().lng()}`);
            this.setState({
                showingInfoWindow: true,
                selectedPlace: nextProps.selectedPlace,
                activeMaker: marker
            })
        }
    }
 
    fetchFoursquare(location) {

        const params = {
            "ll": location,
            "query": location.address
        };

        foursquare.venues.getVenues(params)
            .then(res => {
                console.log(res);

                let data = res.response.venues[0]
                this.setState({ items: [data] });

                // this.setState({ items: res.response.venues });
            }).catch(error => alert('Error', error)
            );
    }

    onMarkerClick = (props, marker, e) => {
        this.animateMarker(marker,props.map);

        this.fetchFoursquare(`${marker.getPosition().lat()},${marker.getPosition().lng()}`);

        this.setState({
            selectedPlace: props,
            activeMaker: marker,
            showingInfoWindow: true
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
                    this.state.items.map(item => {
                                return <div key={item.id}>
                                    {/* <p>Blue Bottle around here:</p> */}
                                    <p>{item.name} around here</p>
                                    <p>{item.location.address && item.location.address}</p>
                                </div> 
                    }):
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