import React, { useEffect, useState }from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';

import mapMarkerImg from '../images/2.svg';
import '../styles/pages/orphanage.css';
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
    id:number,
    latitude: number,
    longitude: number,
    name: string
}

function OrphanageMap(){

    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        })
    }, []);

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>
                    <h2>Escolha um orfanato na mapa</h2>
                    <p>Muitas crianças estão esperando sua visita :)</p>
                </header>

                <footer>
                    <strong>Jaguaruana</strong>
                    <span>Ceará</span>
                </footer>
            </aside>

            <Map 
                center={[-4.8364359,-37.7848386]}
                zoom={17}
                style={{ width: '100%', height: '100%'}}
            >
                {/* <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/> */}
                <TileLayer 
                    url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />

                {orphanages.map(orphanage => {
                    return (
                        <Marker 
                            icon={mapIcon}
                            position={[orphanage.latitude, orphanage.longitude]}
                            key={orphanage.id}
                        >
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup"
                            >   
                                {orphanage.name}
                                <Link to={`/orfanatos/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#fff"/>
                                </Link>
                                
                            </Popup>

                        </Marker> 
                    )
                })}
                
            </Map>

            <Link to="/orfanatos/create" className="create-orphanage">
                <FiPlus size={32} color="#fff"/>
            </Link>
        </div>
    );
}

export default OrphanageMap