export const searchAsObject = search => {
    return search.replace(/^\?/, '').split('&').reduce((ac, e) => {
        const [key, value] = e.split('=');
        return { ...ac, [key]: value }
    },{})
}

export const abbreviateText = (text, len = 999) => (text || '').toString().replace(new RegExp(`(?<=.{${len}}).+`), '...');

export const logout = () => {
    window?.sessionStorage?.clear();
    window?.location?.reload();
}
