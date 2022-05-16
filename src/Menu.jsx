import React, { useCallback, useState } from 'react';
import './Menu.css';

const defaultMenu = [
    {id: 'resume', name: 'Resume', isVisible: false},
    {id: 'new', name: 'New', isVisible: true},
];

function MenuItem({name, onClick}) {
    return (
        <div className='menuItem' onClick={onClick}>
            {name}
        </div>
    );
}

export function Menu({onNewGame, onGameResume}) {
    const [menu, setMenu] = useState(defaultMenu);

    const handleClick = useCallback((id) => {
        switch (id) {
            case 'new':
                menu.find((item) => item.id === 'resume').isVisible = true;
                //setMenu(menu);
                onNewGame();
                break;
            case 'resume':
                onGameResume();
                break;
            default: throw Error();
        }
    }, [menu, onGameResume, onNewGame]);

    return (
        <div className='menu'>
            {
                menu.map((item) =>
                    item.isVisible &&
                    <MenuItem
                        key={item.id}
                        name={item.name}
                        onClick={() => handleClick(item.id)}
                    />
                )
            }
        </div>
    );
}
