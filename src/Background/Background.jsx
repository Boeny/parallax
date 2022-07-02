import React, { memo, useEffect, useState } from 'react';
import { store } from '../store';
import './Background.css';

const BackgroundComponent = memo(({layers, layersOffset, screenStep, height}) => {
    return (
        <div className='background'>
            {layers.map((layer, i) => {
                return (
                    <layer.component
                        key={i}
                        style={{
                            fill: layer.color,
                            height,
                            width: layer.width,
                            left: layersOffset * (layer.offset + screenStep),
                        }}
                    />
                );
            })}
        </div>
    );
});

export const Background = memo(() => {
    const [layersOffset, setLayersOffset] = useState(0);

    useEffect(() => {
        store.setLayersOffset = (value) => {
            store.layersOffset = value;
            setLayersOffset(value);
        };
    }, []);

    return (
        <BackgroundComponent
            layers={store.layers}
            screenStep={store.screenStep}
            height={store.height}
            layersOffset={layersOffset}
        />
    );
});
