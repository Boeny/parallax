import React, { memo, useEffect, useState } from 'react';
import './index.css';

import { store } from '../store';

import { Background } from './components/Background';
import { Player } from './components/Player';
import { Ground } from './components/Ground';


export const Scene = memo(() => {
    const [layersOffset, setLayersOffset] = useState(0);

    useEffect(() => {
        store.setLayersOffset = (value) => {
            store.layersOffset = layersOffset;
            setLayersOffset(value);
        };
    }, [layersOffset]);

    return (
        <div className='scene'>
            <div className='sky'/>
            <Background layersOffset={layersOffset} />
            <Ground layersOffset={layersOffset} />
            <Player layersOffset={layersOffset} />
        </div>
    );
});
