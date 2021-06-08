import React, { Component, useState } from 'react';
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
      count: 0,
      icon: 0,
      mapCenter: {
        lat: "",
        lng: "",
      },
      qrscan: "",
      // rutas: [
      //   {
      //     nombre: "RUTA 1",
      //     destination: { lat: 21.91598342922394, lng: -102.30177166988736 },
      //   },
      //   {
      //     nombre: "RUTA 2",
      //     destination: { lat: 21.91853930348209, lng: -102.29448911249793 },
      //   },
      //   {
      //     nombre: "RUTA 3",
      //     destination: { lat: 21.909819305325815, lng: -102.30321742093018 },
      //   },
      //   {
      //     nombre: "RUTA 4",
      //     destination: { lat: 21.9254832351074, lng: -102.30584387413273 },
      //   }
      // ],
      // prueba: null,
      coors: null,      
      linea1: null,
      id: 629,
      rutaID: null,
      linea2: null,
      listaRutas: null,
      origin: { lat: 21.921338304212593, lng: -102.29783418706253 },
      destination: { lat: 21.884454222315508, lng: -102.3029899437197 },
      origin2: { lat: 21.921338304212593, lng: -102.29783418706253 },
      destination2: { lat: 21.884454222315508, lng: -102.3029899437197 },
      lineCoordinates: [
        { lat: 21.921338304212593, lng: -102.29783418706253 },
        { lat: 21.884454222315508, lng: -102.3029899437197 },
      ],
    }; 
  }

  handleScans = (data) => {
    if (data) {
      data = JSON.parse(data);
      console.log(data);
      this.setState({ coors: data });
      window.alert("Código escaneado correctamente");
      this.handleSelect();
    }
  };
  handleError(err) {
    console.error(err);
  }
  handleChanges(e) {
    this.setState(e.target.value.toLowerCase());
  }  

  componentDidMount() {        
    this.metodoGet();    
  }

  metodoGet = () => {    
    const url = `http://localhost:8080/api/data/${this.state.id}`
    axios.get(url).then(response => {      
      this.setData(response.data);   
      console.log(this.state.listaRutas);
    })         
    console.log(this.state.listaRutas);
  }

  metodoLineaInicio = (id) =>{
    const url = `http://localhost:8080/api/lineOne/${id}`
    axios.get(url).then(response => {
      // console.log(response.data);    
      this.setState({ linea1: response.data });
      this.setState({ origin: response.data[0] });
      this.setState({ destination: response.data[289] });
      // this.state.linea1 = response.data;
      console.log(this.state.linea1);
    })         
  }

  metodoLineaFin = (id) =>{
    const url = `http://localhost:8080/api/lineTwo/${id}`
    axios.get(url).then(response => {
      // console.log(response.data);    
      // this.state.linea2 = response.data;
      this.setState({ linea2: response.data });
      this.setState({ origin2: response.data[0] });
      this.setState({ destination2: response.data[254] });
      console.log(this.state.linea2);
    })         
  }

  // meotodoLineaFin = () =>{
  //   const url = `http://localhost:8080/api/lineTwo/${this.state.id2 ? this.state.id2 : 596}`
  //   axios.get(url).then(response => {
  //     // console.log(response.data);    
  //     // this.state.linea2 = response.data;
  //     this.setState({ linea2: response.data });
  //     this.setState({ origin2: response.data[0] });
  //     this.setState({ destination2: response.data[254] });
  //     console.log(this.state.linea2);
  //   })         
  // }
  
  getDirections = () => {
      const DirectionsService = new this.props.google.maps.DirectionsService();
      DirectionsService.route(
        {
          origin: this.state.origin,
          destination: this.state.destination,
          travelMode: this.props.google.maps.TravelMode.DRIVING,
          optimizeWaypoints: true,
          // waypoints: puntos1
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
  

  animation = () => {
    var time = setInterval(() => {      
      this.state.count = (this.state.count + 0.5);      
      this.state.icon = this.state.count + "%";
      // console.log(this.icon);      
      console.log(this.state.icon);      
      if (this.state.icon === "99.5%") {        
        clearTimeout(time);
        this.state.count = "0.5%";              
      }
    }, 500);
  };

  handleChange = (address) => {
    this.setState({ address });
  };

  routesMaps = (name) => {
    this.state.id2 = name;
    this.setState((state) => {
      return { destination: name };
    });    
    this.state.count = 0;
    // this.animation();
    this.getDirections();
  };

  render() {
    return (
      <div className="principalDiv">
        <div className="div1">
          <div className="menu">
            <img className="img" alt="Image not found" src={logo} />
          </div>
          <div className="Select">            
            {/* {this.state.listaRutas.map((n) => (
              <button
                key={n.nombre}
                className="btn"
                onClick={(e) => this.metodoLineaInicio(n.rutaID, e)}
              >
                {n.nombre}
              </button>
            ))}             */}
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
            zoom={15}
            initialCenter={this.state.destination ? this.state.destination : null}
            center={this.state.destination ? this.state.destination : null}
          >
            <Marker position={this.state.origin ? this.state.origin : null} icon={inicio}/>
            <Marker position={this.state.destination ? this.state.destination : null} icon={fin} />

            <Polyline
              geodesic={true}
              path={
                this.state.linea1 ? this.state.linea1 : this.state.lineCoordinates
              }              
              strokeColor="#fab712"
              options={{
                strokeOpacity: 2,
                strokeWeight: 2,
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
                this.state.linea2 ? this.state.linea2 : this.state.lineCoordinates
              }              
              strokeColor="green"
              options={{
                strokeOpacity: 2,
                strokeWeight: 2,
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
