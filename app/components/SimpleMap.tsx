'use client'

import React, { useRef, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { createPlantPopupHTML, escapeHtml } from '@/lib/sanitize';

const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

const categoryColors = {
  'Coal': '#000000',    // Black
  'Gas': '#4A4A4A',     // Dark grey
  'Oil': '#FF0000',     // Red
};

export default function SimpleMap({ plants, mapConfig }) {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const initializeMap = async () => {
      try {
        const mapboxgl = await import('mapbox-gl');
        
        (mapboxgl as any).default.accessToken = mapboxToken;

        const map = new mapboxgl.default.Map({
          container: mapContainer.current!,
          style: 'mapbox://styles/mapbox/dark-v10',
          center: [-98.5795, 39.8283],
          zoom: 3,
        });

        map.on('load', () => {

          // Add plants to the map
          plants.forEach((plant) => {
            const el = document.createElement('div');
            el.className = 'marker';
            
            const capacity = parseFloat(plant[mapConfig.sizeField]) || 0;
            // Further reduce sizes: min 2px, max 8px
            const size = Math.max(2, Math.min(8, 2 + capacity / 300));
            
            el.style.width = `${size}px`;
            el.style.height = `${size}px`;
            el.style.backgroundColor = categoryColors[plant[mapConfig.colorField]] || '#808080';

            // Create safe popup HTML
            const popupData = {
              name: plant.fac_name,
              category: plant[mapConfig.colorField],
              capacity: plant[mapConfig.sizeField],
              solarCapacity: plant['Solar Capacity (MW)'],
              windCapacity: plant['Wind Capacity (MW)']
            };
            
            const popupHTML = createPlantPopupHTML({
              name: plant.fac_name,
              'Plant Type': plant[mapConfig.colorField],
              'Total Capacity (MW)': plant[mapConfig.sizeField],
              'Solar Capacity (MW)': plant['Solar Capacity (MW)'],
              'Wind Capacity (MW)': plant['Wind Capacity (MW)']
            });

            new mapboxgl.default.Marker(el)
              .setLngLat([plant[mapConfig.longitudeField], plant[mapConfig.latitudeField]])
              .setPopup(
                new mapboxgl.default.Popup({ offset: 25 })
                  .setHTML(popupHTML)
              )
              .addTo(map);
          });

          // Add legend with safe HTML
          const legend = document.createElement('div');
          legend.className = 'map-legend';
          
          // Create legend HTML safely
          const legendTitle = document.createElement('h4');
          legendTitle.textContent = 'Plant Categories';
          legend.appendChild(legendTitle);
          
          Object.entries(categoryColors).forEach(([category, color]) => {
            const legendItem = document.createElement('div');
            
            const colorKey = document.createElement('span');
            colorKey.className = 'legend-key';
            colorKey.style.backgroundColor = color;
            
            const label = document.createElement('span');
            label.textContent = category;
            
            legendItem.appendChild(colorKey);
            legendItem.appendChild(label);
            legend.appendChild(legendItem);
          });
          map.getContainer().appendChild(legend);
        });

        map.on('error', (e: any) => {
          console.error('SimpleMap Mapbox GL error:', e);
          setMapError(e.error?.message || 'Unknown error occurred');
        });

        return () => {
          map.remove();
        };
      } catch (error) {
        console.error('Error loading Mapbox GL:', error);
        setMapError('Failed to load Mapbox GL');
      }
    };

    initializeMap();
  }, [plants, mapConfig]);

  if (mapError) {
    return <div>Error: {mapError}</div>;
  }

  return (
    <div
      ref={mapContainer}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    />
  );
}