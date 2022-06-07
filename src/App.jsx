import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { KEY_CODES, OFFSET_STEP, TIME_TO_THE_END_OF_THE_MAP } from './constants';
import { Menu } from './Menu';
import { Scene } from './Scene';

export function App() {
    const [isSceneVisible, setSceneVisibility] = useState(false);
    const [isMenuVisible, setMenuVisibility] = useState(true);
    const [layersOffset, setLayersOffset] = useState(0);
    const [isMovingRight, setMovingRight] = useState(false);
    const [isMovingLeft, setMovingLeft] = useState(false);

    const moveRight = useCallback(() => {
        setLayersOffset(offset => offset > -TIME_TO_THE_END_OF_THE_MAP ? offset - OFFSET_STEP: offset);
    }, []);

    const moveLeft = useCallback(() => {
        setLayersOffset(offset => offset < 0 ? offset + OFFSET_STEP : offset);
    }, []);

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
    }, [isMovingLeft, isMovingRight, moveLeft, moveRight, layersOffset]);

    const handleNewGame = useCallback(() => {
        setLayersOffset(0);
        setSceneVisibility(true);
        setMenuVisibility(false);
    }, []);

    const handleGameResume = useCallback(() => {
        setMenuVisibility(false);
    }, []);

    const handleLayoutKeyDown = useCallback((e) => {
        switch (e.keyCode) {
            case KEY_CODES.Esc:
                setMenuVisibility(!isMenuVisible);
                break;
            case KEY_CODES.Enter:
                if (isMenuVisible) {
                    handleNewGame();
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
    }, [handleNewGame, isMenuVisible]);

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
            {isMenuVisible && <Menu onNewGame={handleNewGame} onGameResume={handleGameResume} />}
            {isSceneVisible && <Scene layersOffset={layersOffset} />}
        </div>
    );
}
