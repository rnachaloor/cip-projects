import Map, {Source, Layer, Marker} from "react-map-gl";
import ev_data from '../data/ev_chargers.json';
import cip_data from '../data/cip_projects.json';
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";
import './styles/Map_Style.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect } from "react";
import { BsCircleFill } from "react-icons/bs";
import { IconContext } from "react-icons";

/**
 * Modified Map Component
 */
const MapContainer = props => {
    /**
     * determines size of map based on screen size
     * @returns returns new size of map
     */
    function resize() {
        if (window.innerWidth >= 900) {
            return 900;
        }
        return window.innerWidth
    }

    //checks for when screen size changes
    useEffect(() => {
        window.addEventListener('resize', resize)
    })

    /**
     * Style for layer displaying CIP Projects.
     */
    const fillLayerStyle = {
        id: 'data',
        type: 'fill',
        paint: {
            'fill-color': '#ba34eb',
            'fill-opacity': 0.5
        }
    }

    /**
     * Style for layer displaying EV chargers.
     */
    const pointLayerStyle = {
        id: 'point',
        type: 'circle',
        paint: {
            'circle-radius': 5,
            'circle-color': 'red'
        }
    }

    let ev_chargers = returnPointsInPolygon()

    return (
        <div id="mapWrap" style={props.containerStyle}>
            <Map
              initialViewState={props.initialViewState}
              mapStyle="mapbox://styles/mapbox/streets-v9"
              mapboxAccessToken={props.mapboxToken}
              style={{width: resize(), height: 500}}
            >
                <Source id="fill-data" type="geojson" data={cip_data}>
                    <Layer id="cip" {...fillLayerStyle} />
                </Source>
                <Source id="point-data" type="geojson" data={ev_chargers[1]}>
                    <Layer id="in-cip" {...pointLayerStyle} />
                </Source>
                {
                    //creates markers for every EV in CIP
                    ev_chargers[0].features.map(function (data) {
                        return ([
                            <Marker longitude={data.geometry.coordinates[0]} latitude={data.geometry.coordinates[1]} anchor="center">
                                <IconContext.Provider value={{color: '#106b21'}}>
                                    <BsCircleFill />
                                </IconContext.Provider>
                            </Marker>
                        ])
                    })
                }
            </Map>
        </div>
    )
}

/**
 * checks whether a project is in a cip project
 * @returns sorted ev chargers
 */
function returnPointsInPolygon() {
    let dataInPolygon = JSON.parse('{"type":"FeatureCollection","features":[]}')
    let dataNotInPolygon = JSON.parse('{"type":"FeatureCollection","features":[]}')
    ev_data.features.forEach(point => {
        let notInPolgyon = true;
        cip_data.features.forEach(polygon => {
            if (booleanPointInPolygon(point, polygon)) {
                dataInPolygon.features.push(point);
                notInPolgyon = false;
            }
        })
        if (notInPolgyon) {
            dataNotInPolygon.features.push(point);
        }
    })
    return [dataInPolygon, dataNotInPolygon];
}

export default MapContainer;