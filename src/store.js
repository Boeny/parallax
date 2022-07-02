export const store = {
    width: 0,
    height: 0,
    screenStep: 0,
    layers: [],
    groundLayer: null,
    menu: {
        items: [
            {id: 'resume', name: 'Resume', isVisible: false},
            {id: 'new', name: 'New', isVisible: true},
        ],
        isVisible: true,
    },
    layersOffset: 0,
    setLayersOffset: () => {},
    setMenuVisibility: () => {},
};

export function onNewGameAction() {
    store.menu.items.find((item) => item.id === 'resume').isVisible = true;
    store.setLayersOffset(0);
    store.setMenuVisibility(false);
}

export function isResumeMenuItemVisible() {
    return store.menu.items.find((item) => item.id === 'resume').isVisible;
}
