import React, { Component } from "react";
import "./index.css";

import { Debounce } from 'react-throttle';

class SiteSearch extends Component {
    state = {
        selectedLocation:null
    };

    handleInput = value => {
        this.props.filter(value.trim());
    }

    handleClick = place => {
        this.props.onPlaceClick(place);
    }

    render() {
        const { places } = this.props;
        return (
            <aside className='site-search'>
               <section className='search-input'>
                    <Debounce time='400' handler='onChange'>
                        <input 
                            onChange={e => this.handleInput(e.target.value)}
                            type='search'
                            // name='search'
                            placeholder='Search'
                            aria-label='Search'
                            tabIndex='1'
                        />
                    </Debounce>
                </section>
                <section className='search-list'>
                    <ul>
                        {places.map(place =>(
                         <li
                            key={place.name}
                            onClick={() => this.handleClick(place)}
                            tabIndex='2'
                            role='button'
                         >
                        {place.name}
                        </li>
                        ))}
                    </ul>
                </section>
            </aside>
        )
    }
}

export default SiteSearch