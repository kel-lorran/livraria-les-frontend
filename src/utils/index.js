export const searchAsObject = search => {
    return search.replace(/^\?/, '').split('&').reduce((ac, e) => {
        const [key, value] = e.split('=');
        return { ...ac, [key]: value }
    },{})
}