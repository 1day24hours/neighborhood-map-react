import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }
    render()
}

export default GoogleApiWrapper({
    akiKey: 'AIzaSyCfdB53Ke2w9uJRVoxmj0HNrzVa0WNW84o'
})(MapContainer);