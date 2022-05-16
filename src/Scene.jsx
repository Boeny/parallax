import React from 'react';
import './Scene.css';
import { ReactComponent as Layer1 } from './images/layer1.svg';
import { ReactComponent as Layer2 } from './images/layer2.svg';
import { ReactComponent as Layer3 } from './images/layer3.svg';
import { ReactComponent as Layer4 } from './images/layer4.svg';
import { ReactComponent as Layer5 } from './images/layer5.svg';
import { ReactComponent as Layer6 } from './images/layer6.svg';
import { ReactComponent as Layer7 } from './images/layer7.svg';
import { ReactComponent as Layer8 } from './images/layer8.svg';
import { ReactComponent as Layer9 } from './images/layer9.svg';
import { ReactComponent as Layer10 } from './images/layer10.svg';
import { ReactComponent as Layer11 } from './images/layer11.svg';
import { ReactComponent as Layer12 } from './images/layer12.svg';
import { ReactComponent as Layer13 } from './images/layer13.svg';
import { ReactComponent as Layer14 } from './images/layer14.svg';
import { TIME_TO_THE_END_OF_THE_MAP, VIEWPORT } from './constants';

export function Scene({layersOffset}) {
    return (
        <div className='scene'>
            <div className='sky'/>
            <Background layersOffset={layersOffset} />
        </div>
    );
}

const height = window.innerHeight;
const ratio = height / VIEWPORT.HEIGHT;
const width = VIEWPORT.WIDTH * ratio / 2;

const LAYERS = [
    {component: Layer1, color: 'rgb(6 101 101)', width: width},
    {component: Layer2, color: 'rgb(11 115 115)', width: width + 100},
    {component: Layer3, color: 'rgb(15 125 125)', width: width + 200},
    {component: Layer4, color: 'rgb(20 134 134)', width: width + 300},
    {component: Layer5, color: 'rgb(25 143 143)', width: width + 400},
    {component: Layer6, color: 'rgb(25 151 151)', width: width + 500},
    {component: Layer7, color: 'rgb(32 164 164)', width: width + 600},
    {component: Layer8, color: 'rgb(36 178 178)', width: width + 700},
    {component: Layer9, color: 'rgb(41 187 187)', width: width + 800},
    {component: Layer10, color: 'rgb(52 200 200)', width: width + 900},
    {component: Layer11, color: 'rgb(86 205 205)', width: width + width},
    {component: Layer12, color: 'rgb(105 216 216)', width: width + 1.3 * width},
    {component: Layer13, color: 'rgb(118 225 225)', width: width + 1.5 * width},
    {component: Layer14, color: 'rgb(193 255 255)', width: width + 2 * width},
];

LAYERS.forEach((layer) => {
    layer.offset = (layer.width - width) / TIME_TO_THE_END_OF_THE_MAP;
});

const SCREEN_STEP = (width - window.innerWidth) / TIME_TO_THE_END_OF_THE_MAP;

function Background({layersOffset}) {
    return (
        <div className='background'>
            {LAYERS.map((layer, i) => {
                //console.log('time=', layersOffset, 'width=', layer.width, 'diff=', layer.width - width, 'offset=', layer.offset, 'offset*time=', layersOffset * layer.offset)
                return (
                    <layer.component
                        key={i}
                        style={{
                            fill: layer.color,
                            height,
                            width: layer.width,
                            left: layersOffset * (layer.offset + SCREEN_STEP),
                        }}
                    />
                );
            })}
        </div>
    );
}
