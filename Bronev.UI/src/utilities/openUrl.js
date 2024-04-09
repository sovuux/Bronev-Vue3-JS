export const openPageInBrowser = (url) => {
    const newWindow = window.open(url, '_blank', 'no-opener,no-referrer')
    if (newWindow) newWindow.opener = null
}