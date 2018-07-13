'use strict'

if((/github/).test(window.location.host) && (window.location.host != `github.com`)) {
  const themeColor = `#ff5a00`
  document.querySelector(`header.Header`).style.background = themeColor
  if(document.querySelector(`header.Header .header-search-scope`)) {
    document.querySelector(`header.Header .header-search-scope`).style.borderRightColor = themeColor
  }

  if(document.querySelector(`.js-site-favicon`)) {
    (() => {
      const Favicon = document.querySelector(`.js-site-favicon`)
      Favicon.setAttribute('href', chrome.extension.getURL('/16.png'))
    })()
  }
}
