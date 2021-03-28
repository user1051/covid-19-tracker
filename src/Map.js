import React from 'react'
import { Map as LeafletMap, TitleLayer } from "react-leaflet"

function Map() {
    return (
        <div className="map">
           <LeafletMap>
                <TitleLayer
                    url="https://{s}.title.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href ="https://osm.org/copyright">OpenStreetMap</a> contributors'
                />
           </LeafletMap>
        </div>
    )
}

export default Map
