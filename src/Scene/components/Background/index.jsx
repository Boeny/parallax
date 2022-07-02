import React, { memo } from 'react';
import './index.css';

import { store } from '../../../store';


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

export const Background = memo(({layersOffset}) => {
    return (
        <BackgroundComponent
            layers={store.layers}
            screenStep={store.screenStep}
            height={store.height}
            layersOffset={layersOffset}
        />
    );
});
