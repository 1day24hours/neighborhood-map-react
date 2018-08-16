import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

// const foursquare = require('react-foursquare')({
//     clientID: 'HNWME22DACZBRE3XCHEPDICRSCBQWCN4LSK3FRPO0VHEFFED',
//     clientSecret: '0DUHNOBRKVA0AW0PHJK4AE40L02UIWEGOOIVWJW3FS1VCAPR'
// });

export class MapContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMaker: {},
            selectedPlace: {},
            map: null
        }
    }

    

    componentWillReceiveProps() {
        
    }

    onMarkerClick = (props, marker, e) => {
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

  

    mapReady = (props, map) => {
        this.setState({
            map
        })
    };

    getMakerInfo= (marker) => {

        // Add the api keys for foursquare
        const clientId = 'HNWME22DACZBRE3XCHEPDICRSCBQWCN4LSK3FRPO0VHEFFED';
        const clientSecret = '0DUHNOBRKVA0AW0PHJK4AE40L02UIWEGOOIVWJW3FS1VCAPR';

        // Build the api endpoint
        const url =
            'https://api.foursquare.com/v2/venues/search?client_id=' +
            clientId +
            '&client_secret' +
            clientSecret +
            '&v=20130815&ll=' +
            marker.getPosition().lat() +
            ',' +
            marker.getPosition().lng() +
            'limit=1';
        fetch(url)
            .then(response => {
                if (response.status !== 200) {
                    this.state.infoWindow.setContent('Sorry data can\'t be loaded');
                    return;
                }
                response.this.state.place.then(data => {
                    console.log(data);

                    const location_data = data.venues[0];
                    const place = `<h3>${location_data.name}</h3>`;
                    const street = `<p>${location_data.formattedAddress[0]}</p>`;
                    let contact = '';
                    if (location_data.contact.phone) {
                        contact = `<p>${location_data.contact.phone}</p>`;
                    }
                    const checkInCount =
                        '<b>Number of CheckIn: </b>' +
                        location_data.stats.checkinsCount +
                        '<br>';
                    const readMore =
                        '<a href="https://foursquare.com/v/' +
                        location_data.id +
                        '" target="_blank">Read More on <b>Foursquare Website</b></a>';
                    this.state.infoWindow.setContent(
                        place + street + checkInCount + readMore
                    );
                });
            }).catch(err => {
                this.state.infoWindow.setContent('Sorry data can\'t be loaded.');
            });
    }

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
                key={place.id}
                name={place}
                position={place.location}
                ref={place.name}
                onClick={this.onMarkerClick}
                />

            ))}

            <InfoWindow 
            marker={activeMaker} 
            visible={showingInfoWindow}
            getMakerInfo={this.getMakerInfo}
            >
            <div>
                {/* <h1>{selectedPlace.name}</h1> */}
            </div>
            
            </InfoWindow>
            </Map>

        )
    }
}

export default GoogleApiWrapper({
    akiKey: 'AIzaSyCfdB53Ke2w9uJRVoxmj0HNrzVa0WNW84o'
})(MapContainer);