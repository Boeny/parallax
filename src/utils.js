import { TIME_TO_THE_END_OF_THE_MAP } from "./constants";


export const getScreenStep = (width) => (width - window.innerWidth) / TIME_TO_THE_END_OF_THE_MAP;

export const setInitialLayerOffset = (layer, width) => {
    layer.offset = (layer.width - width) / TIME_TO_THE_END_OF_THE_MAP;
};
