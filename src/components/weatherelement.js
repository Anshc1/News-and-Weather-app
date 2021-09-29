import React, { Component } from 'react'


export class Weatherelement extends Component {
    fToC(fahrenheit) {
        var fTemp = fahrenheit;
        var fToCel = fTemp- 273.5;
        return Math.ceil(fToCel)
    }
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render() {
        let { location, description, temp ,humidity,tempmx, tempmin ,feel,icon} = this.props;
        let imgurl = `http://openweathermap.org/img/wn/${this.props.icon}@2x.png`
        let url = 'invalid.png'; 
        return (
            <div>
                <div className="locationbox">
                    <div className="location">{this.capitalizeFirstLetter(location)}</div>
                    <img src={icon?imgurl:url} className="card-img-top locationbox img"  alt="" />
                </div>
                <div className="weatherbox">
                    <div className="weatherbox">Weather-{this.capitalizeFirstLetter( description)}</div>
                    <div className="weatherbox">Temperature-{this.fToC(temp)} °C</div>
                    <div className="weatherbox">Feel Like-{this.fToC(feel)} °C</div>
                    <div className="weatherbox">Humidity Index-{(humidity)}</div>
                    <div className="weatherbox">Max Temperature-{this.fToC(tempmx)} °C</div>
                    <div className="weatherbox">Min Temperature-{this.fToC(tempmin)} °C</div> 
                </div>
            </div>
        )
    }
}

export default Weatherelement
