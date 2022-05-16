import React, { useCallback, useState } from 'react';
import './App.css';
import { OFFSET_STEP, TIME_TO_THE_END_OF_THE_MAP } from './constants';
import { Menu } from './Menu';
import { Scene } from './Scene';

export function App() {
    const [isSceneVisible, setSceneVisibility] = useState(false);
    const [isMenuVisible, setMenuVisibility] = useState(true);
    const [layersOffset, setLayersOffset] = useState(0);

    const handleNewGame = useCallback(() => {
        setLayersOffset(0);
        setSceneVisibility(true);
        setMenuVisibility(false);
    }, []);

    const handleGameResume = useCallback(() => {
        setMenuVisibility(false);
    }, []);

    const handleSceneKeyDown = useCallback((e) => {
        //console.log(e.keyCode);
        switch (e.keyCode) {
            case 27:
                setMenuVisibility(!isMenuVisible);
                break;
            case 13:
                if (isMenuVisible) {
                    handleNewGame();
                }
                break;
            case 39:
                if (layersOffset > -TIME_TO_THE_END_OF_THE_MAP) {
                    setLayersOffset(layersOffset - OFFSET_STEP);
                }
                break;
            case 37:
                if (layersOffset < 0) {
                    setLayersOffset(layersOffset + OFFSET_STEP);
                }
                break;
            default: break;//throw Error();
        }
    }, [handleNewGame, isMenuVisible, layersOffset]);

    return (
        <div className="App" tabIndex={0} onKeyDown={handleSceneKeyDown}>
            {isMenuVisible && <Menu onNewGame={handleNewGame} onGameResume={handleGameResume} />}
            {isSceneVisible && <Scene layersOffset={layersOffset} />}
        </div>
    );
}
