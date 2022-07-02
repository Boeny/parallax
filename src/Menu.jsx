import React, { memo, useCallback, useEffect, useState } from 'react';
import './Menu.css';

import { store } from './store';


const MenuItem = memo(({name, onClick}) => {
    return (
        <div className='menuItem' onClick={onClick}>
            {name}
        </div>
    );
});

const MenuComponent = memo(({items, onClick}) => {
    return (
        <div className='menu'>
            {
                items.map((item) =>
                    item.isVisible &&
                    <MenuItem
                        key={item.id}
                        name={item.name}
                        onClick={() => onClick(item.id)}
                    />
                )
            }
        </div>
    );
});

export const Menu = memo(({onNewGame, onGameResume}) => {
    const [isVisible, setVisibility] = useState(true);

    useEffect(() => {
        store.setMenuVisibility = (value) => {
            store.menu.isVisible = value;
            setVisibility(value);
        };
    }, []);

    const handleClick = useCallback((id) => {
        switch (id) {
            case 'new':
                onNewGame();
                break;
            case 'resume':
                onGameResume();
                break;
            default: throw Error();
        }
    }, []);

    if (!isVisible) {
        return null;
    }
    return (
        <MenuComponent
            items={store.menu.items}
            onClick={handleClick}
        />
    );
});
