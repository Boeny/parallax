import React, { memo } from 'react';
import './Scene.css';
import { Background } from './Background/Background';

export const Scene = memo(() => {
    return (
        <div className='scene'>
            <div className='sky'/>
            <Background />
        </div>
    );
});
