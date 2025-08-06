'use client'

import React, { useRef, useEffect, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

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
          console.log('SimpleMap loaded successfully');

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

            new mapboxgl.default.Marker(el)
              .setLngLat([plant[mapConfig.longitudeField], plant[mapConfig.latitudeField]])
              .setPopup(
                new mapboxgl.default.Popup({ offset: 25 })
                  .setHTML(`
                    <strong>${plant.fac_name}</strong><br>
                    Category: ${plant[mapConfig.colorField]}<br>
                    Capacity: ${plant[mapConfig.sizeField]} MW<br>
                    Solar Capacity: ${plant['Solar Capacity (MW)']} MW<br>
                    Wind Capacity: ${plant['Wind Capacity (MW)']} MW
                  `)
              )
              .addTo(map);
          });

          // Add legend
          const legend = document.createElement('div');
          legend.className = 'map-legend';
          legend.innerHTML = `
            <h4>Plant Categories</h4>
            ${Object.entries(categoryColors).map(([category, color]) => `
              <div>
                <span class="legend-key" style="background-color: ${color}"></span>
                <span>${category}</span>
              </div>
            `).join('')}
          `;
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