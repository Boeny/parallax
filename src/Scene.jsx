import React, { memo } from 'react';
import './Scene.css';
import { Background } from './Background/Background';
import { Player } from './Player/Player';

export const Scene = memo(() => {
    return (
        <div className='scene'>
            <div className='sky'/>
            <Background />
            <Player />
        </div>
    );
});
