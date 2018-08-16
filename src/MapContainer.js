import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMaker: {},
            selectedPlace: null,
            map: null
        }
    }

    componentWillReceiveProps() {

    }

    render() {
        const { places, google } = this.props;
        const initialCenter = {
            lat: -36.795293,
            lng: 174.735701
        };
        const zoom = 16;

        return (
            <Map
                google={google} 
                initialCenter={initialCenter}
                zoom={zoom}
            />
        )
    }
}

export default GoogleApiWrapper({
    akiKey: 'AIzaSyCfdB53Ke2w9uJRVoxmj0HNrzVa0WNW84o'
})(MapContainer);