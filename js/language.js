function setCookie(name, value, daysExpiration = 1) {
  const d = new Date()
  d.setTime(d.getTime() + daysExpiration * 86400000)
  const expires = 'expires=' + d
  document.cookie = name + '=' + value + '; ' + expires + '; path=/'
}

function getCookie(name) {
  const cookies = document.cookie.split('; ')
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i].split('=')
    if (c[0] === name) {
      return c[1]
    }
  }
  return ''
}

const standardLanguage = {}
let standardLanguageLoaded = false

function loadJSON(file, callback) {
  const xmlRequest = new XMLHttpRequest()
  xmlRequest.overrideMimeType('application/json')
  xmlRequest.open('GET', file, true) // Replace 'my_data' with the path to your file
  xmlRequest.onreadystatechange = function() {
    if (xmlRequest.readyState === 4 && xmlRequest.status === 200) {
      // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
      callback(JSON.parse(xmlRequest.responseText))
    }
  }
  xmlRequest.send(null)
}

function chooseLanguage(lang, loadStandard = false) {
  setCookie('lang', lang, 7)
  if (lang === 'fr-FR') {
    loadJSON('/js/fr.json', function(data) {
      let hasLoaded = false
      Object.keys(data).forEach(key => {
        const el = document.getElementById(key)
        if (loadStandard && !standardLanguageLoaded) {
          if (el && el.innerHTML) {
            standardLanguage[key] = el.innerHTML
            hasLoaded = true
          }
        }
        if (el && el.innerHTML) el.innerHTML = data[key]
      })
      if (hasLoaded) standardLanguageLoaded = true
    })
  } else {
    if (standardLanguageLoaded) {
      Object.keys(standardLanguage).forEach(key => {
        const el = document.getElementById(key)
        el.innerHTML = standardLanguage[key]
      })
    }
  }
}

if (!document.cookie) {
  if (navigator.language === 'fr-FR') {
    chooseLanguage('fr-FR', true)
  }
} else {
  const lang = getCookie('lang')
  if (lang !== '') {
    if (lang === 'fr-FR') {
      chooseLanguage('fr-FR', true)
    }
  }
}
