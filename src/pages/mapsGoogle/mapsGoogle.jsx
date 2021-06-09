import React, { Component } from 'react';
import {Map, Marker, GoogleApiWrapper, Polyline } from 'google-maps-react';
import './mapsGoogle.css';
import inicio from '../../assets/images/InicioPrototipo.png';
import fin from '../../assets/images/FinPrototipo.png';
import logo from '../../assets/images/logo2.png';
import camion from '../../assets/images/camion.png';
import axios from "axios";

export class MapContainer extends Component {
  constructor(props) {
    super(props);    

    this.state = {                                    
      busStop: 629,
      rutaID: null,
      polylineGreen: null,
      polylineOrange: null,
      routes: [],
      originLineOne: { lat: 21.921338304212593, lng: -102.29783418706253 },
      destinationLineOne: { lat: 21.884454222315508, lng: -102.3029899437197 },
      originLineTwo: { lat: 21.921338304212593, lng: -102.29783418706253 },
      destinationLineTwo: { lat: 21.884454222315508, lng: -102.3029899437197 },
      lineCoordinatesExample: [
        { lat: 21.921338304212593, lng: -102.29783418706253 },
        { lat: 21.884454222315508, lng: -102.3029899437197 },
        { lat: 21.884554222315508, lng: -102.3030899437197 },
        { lat: 21.884654222315508, lng: -102.3031899437197 },
        { lat: 21.884754222315508, lng: -102.3032899437197 },
      ],
      originExample: { lat: 21.921338304212593, lng: -102.29783418706253 },
      destinationExample: { lat: 21.884454222315508, lng: -102.3029899437197 },
      routesExample: []
    }; 
  }
  
  componentDidMount() {        
    this.methodGet();  
    this.getDirections();
  }

  methodGet = () => {    
    const url = `http://localhost:8080/api/data/${this.state.busStop}`
    axios.get(url).then(response => {                        
      this.setState({ routes: response.data });               
    });    
  }

  methodLineStart = () =>{        
      const url = `http://localhost:8080/api/lineOne/${this.state.rutaID}`;
      axios.get(url).then(response => {          
        var endPoint = response.data.length;        
        // this.state.polylineGreen = response.data;  
        // this.state.originLineOne = response.data[0];  
        // this.state.destinationLineOne = response.data[endPoint];                      
        this.setState({polylineGreen: response.data});
        this.setState({originLineOne: response.data[0]});
        this.setState({destinationLineOne: response.data[endPoint]});
        this.componentDidMount();                              
      });                        
  }

  methodLineEnd = (id) =>{        
      // this.state.rutaID = id;
      this.setState({ rutaID: id});
      const url = `http://localhost:8080/api/lineTwo/${id}`;
      axios.get(url).then(response => {              
        var endPoint = response.data.length;          
        console.log(endPoint);
        console.log(response);
        // this.state.polylineOrange = response.data;  
        // this.state.originLineTwo = response.data[0];  
        // this.state.destinationLineTwo = response.data[endPoint];                   
        this.setState({polylineOrange: response.data});
        this.setState({originLineTwo: response.data[0]});
        this.setState({destinationLineTwo: response.data[endPoint]});
        this.methodLineStart();                                         
      });               
  }  
  
  getDirections = () => {
      const DirectionsService = new this.props.google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: this.state.originExample,
          destination: this.state.destinationExample,
          travelMode: this.props.google.maps.TravelMode.DRIVING,
          optimizeWaypoints: true,          
        },
        (result, status) => {
          if (status === this.props.google.maps.DirectionsStatus.OK) {
            this.setState({
              coors: result.routes[0].overview_path,
            });                     
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );
  };

  render() {
    return (
      <div className="principalDiv">
        <div className="div1">
          <div className="menu">
            <img className="img" alt="..." src={logo} />
          </div>
          <div className="Select">                                  
            {              
              this.state.routes[2] ?
                this.state.routes.map((n) =>
                  <button
                    key={n.nombre}
                    className="btn"
                    onClick={(e) => this.methodLineEnd(n.rutaID, e)}
                  >
                    {n.nombre}
                  </button>
                )
              : "El código QR escaneado es incorrecto"
            }            
          </div>
          <div>
            <img
              src={camion}
              alt="No found"
              width="60px"
              height="60px"
              className="icon"
            />
          </div>
        </div>
        <div className="div2">
          <Map
            google={this.props.google}
            zoom={14}
            initialCenter={this.state.originLineOne ? this.state.originLineOne : this.state.originExample}
            center={this.state.originLineTwo ? this.state.originLineTwo : this.state.originExample}
          >
            <Marker 
              position={this.state.originLineOne ? this.state.originLineOne : this.state.originExample} 
              icon={inicio}
            />            
            <Marker 
              position={this.state.originLineTwo ? this.state.originLineTwo : this.state.destinationExample} 
              icon={fin} 
            />            

            <Polyline
              geodesic={true}
              path={
                this.state.polylineGreen ? this.state.polylineGreen : this.state.routesExample
              }              
              strokeColor="#fab712"
              options={{
                strokeOpacity: 2,
                strokeWeight: 4,
                fillOpacity: 10,
                // icons: [
                //   {
                //     icon: {
                //       // path: this.props.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                //     },
                //     offset: this.state.icon,
                //     // repeat: "100px",
                //   },
                // ],
              }}
            />
            
            <Polyline
              geodesic={true}
              path={
                this.state.polylineOrange ? this.state.polylineOrange : this.state.routesExample
              }              
              strokeColor="green"
              options={{
                strokeOpacity: 2,
                strokeWeight: 4,
                fillOpacity: 10,
                // icons: [
                //   {
                //     icon: {
                //       // path: this.props.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                //     },
                //     offset: this.state.icon,
                //     // repeat: "100px",
                //   },
                // ],
              }}
            />
            
          </Map>
        </div>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDrnlnJ5tyADRyC43bSpZb2EojvymL7rXo')
})(MapContainer)
