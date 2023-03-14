import { useEffect } from 'react';
import './App.css';
import MapContainer from './components/Map';
import Table from './components/Table';



const MAPBOX_TOKEN = 'pk.eyJ1IjoiaWFtcm9oaXR0ZXN0IiwiYSI6ImNsZjBmcGNrcTAwczgzcW83cm8wYjQweDcifQ.iQvMKDDe10FIrfX4OFBjxA'

function App() {

  //changes tab title
  useEffect(() => {
    document.title = "CIP Projects"
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>EV Charger Locations in CIP Projects</h1>
        <>
          <MapContainer
            containerStyle={{display: 'flex', alignItems:'center', justifyContent: 'center', paddingBottom: 40}}
            mapboxToken={MAPBOX_TOKEN}
            initialViewState={{
              latitude: 34.05,
              longitude: -118.25,
              zoom: 9.5
            }}
          />
        </>
        <Table/>
      </header>
    </div>
  );
}


export default App;
