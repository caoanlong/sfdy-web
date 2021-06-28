export function isPWA() {
    return ['fullscreen', 'standalone', 'minimal-ui'].some((displayMode) => {
        return window.matchMedia('(display-mode: ' + displayMode + ')').matches
    })
} 