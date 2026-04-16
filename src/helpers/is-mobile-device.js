export const isMobileDevice = (innerWidth = 767) => {
    return window.innerWidth <= innerWidth;
};