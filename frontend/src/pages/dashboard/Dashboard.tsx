import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";
import { useEffect } from "react";
import { dataset } from "../../constants/GFWDataset";

const HeatmapLayer = ({ points }: { points: [number, number, number][] }) => {
    const map = useMap();

    useEffect(() => {
        const heat = (window as any).L.heatLayer(points, {
            radius: 25,
            blur: 15,
            maxZoom: 6,
        }).addTo(map);

        return () => {
            map.removeLayer(heat);
        };
    }, [map, points]);

    return null;
};

const Dashboard = () => {
    const heatData: [number, number, number][] = dataset.map((row) => [
        row.lat,
        row.lon,
        row.loss_ha,
    ]);

    return (
        <div className="w-full h-[600px]">
            <MapContainer
                center={[22.9734, 78.6569]}
                zoom={5}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
                />

                {/* Heatmap Layer */}
                <HeatmapLayer points={heatData} />

                {/* Circle Markers with Popup */}
                {dataset.map((row, i) => (
                    <CircleMarker
                        key={i}
                        center={[row.lat, row.lon]}
                        radius={6}
                        pathOptions={{ color: "red", fillOpacity: 0.7 }}
                    >
                        <Popup>
                            <b>{row.state}</b>: {row.loss_ha} ha loss
                        </Popup>
                    </CircleMarker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Dashboard;