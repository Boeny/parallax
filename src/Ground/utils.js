import { setInitialLayerOffset } from "../utils";

import { ReactComponent as Layer14 } from './images/layer14.svg';


export const getGroundLayer = (width) => {
    const layer = {component: Layer14, color: 'rgb(193 255 255)', width: width + 2 * width};

    setInitialLayerOffset(layer, width);

    return layer;
};
