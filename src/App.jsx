import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { BACKGROUND_VIEWPORT } from './Background/constants';
import { getLayers, getScreenStep } from './Background/utils';
import { KEY_CODES, OFFSET_STEP, TIME_TO_THE_END_OF_THE_MAP } from './constants';
import { Menu } from './Menu';
import { Scene } from './Scene';
import { isResumeMenuItemVisible, onNewGameAction, store } from './store';

export function App() {
    const [isSceneVisible, setSceneVisibility] = useState(false);
    const [isMovingRight, setMovingRight] = useState(false);
    const [isMovingLeft, setMovingLeft] = useState(false);
    const [refresh, update] = useState(true);

    useEffect(() => {
        store.height = window.innerHeight;
        const ratio = store.height / BACKGROUND_VIEWPORT.HEIGHT;
        store.width = BACKGROUND_VIEWPORT.WIDTH * ratio / 2;
        store.screenStep = getScreenStep(store.width);
        store.layers = getLayers(store.width);
    }, []);

    const moveRight = useCallback(() => {
        store.setLayersOffset(offset => offset > -TIME_TO_THE_END_OF_THE_MAP ? offset - OFFSET_STEP: offset);
        update(!refresh);
    }, [refresh]);

    const moveLeft = useCallback(() => {
        store.setLayersOffset(offset => offset < 0 ? offset + OFFSET_STEP : offset);
        update(!refresh);
    }, [refresh]);
    
    useEffect(() => {
        if (isMovingRight && isMovingLeft) {
            return;
        }
        if (isMovingRight) {
            requestAnimationFrame(moveRight);
        }
        if (isMovingLeft) {
            requestAnimationFrame(moveLeft);
        }
    }, [isMovingLeft, isMovingRight, moveLeft, moveRight]);

    const handleNewGame = useCallback(() => {
        onNewGameAction();
        setSceneVisibility(true);
    }, []);

    const handleGameResume = useCallback(() => {
        store.setMenuVisibility(false);
    }, []);

    const handleLayoutKeyDown = useCallback((e) => {
        switch (e.keyCode) {
            case KEY_CODES.Esc:
                if (store.menu.isVisible) {
                    if (isResumeMenuItemVisible()) {
                        handleGameResume();
                    }
                } else {
                    store.setMenuVisibility(true);
                }
                break;
            case KEY_CODES.Right:
                setMovingRight(true);
                break;
            case KEY_CODES.Left:
                setMovingLeft(true);
                break;
            default: break;
        }
    }, []);

    const handleLayoutKeyUp = useCallback((e) => {
        switch (e.keyCode) {
            case KEY_CODES.Right:
                setMovingRight(false);
                break;
            case KEY_CODES.Left:
                setMovingLeft(false);
                break;
            default: break;
        }
    }, []);

    return (
        <div className="App" tabIndex={0} onKeyDown={handleLayoutKeyDown} onKeyUp={handleLayoutKeyUp}>
            <Menu onNewGame={handleNewGame} onGameResume={handleGameResume} />
            {isSceneVisible && <Scene />}
        </div>
    );
}
