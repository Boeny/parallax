import React, { memo } from 'react';
import './index.css';

import { store } from '../../../store';


const GroundComponent = memo(({groundLayer, layersOffset, screenStep, height}) => {
    return (
        <div className='ground'>
            <groundLayer.component
                style={{
                    fill: groundLayer.color,
                    height,
                    width: groundLayer.width,
                    left: layersOffset * (groundLayer.offset + screenStep),
                }}
            />
        </div>
    );
});

export const Ground = memo(({layersOffset}) => {
    if (!store.groundLayer) {
        return null;
    }
    return (
        <GroundComponent
            groundLayer={store.groundLayer}
            screenStep={store.screenStep}
            height={store.height}
            layersOffset={layersOffset}
        />
    );
});
