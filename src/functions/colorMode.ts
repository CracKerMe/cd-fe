// Global variable minimizers
const w = window
const d = document
const de = d.documentElement

const knownColorSchemes = ['dark', 'light']

const preference = window.localStorage.getItem('awm-color-mode') || 'system'
let value = preference === 'system' ? getColorScheme() : preference
// Applied forced color mode
const forcedColorMode = d.body.getAttribute('data-color-mode-forced')
if (forcedColorMode) {
  value = forcedColorMode
}

addClass(value)

export const ColorMode = {
  preference,
  value,
  getColorScheme,
  addClass,
  removeClass
}

function addClass (value: string) {
  const className = '' + value + '-mode'
  if (de.classList) {
    de.classList.add(className)
  } else {
    de.className += ' ' + className
  }
}

function removeClass (value: string) {
  const className = '' + value + '-mode'
  if (de.classList) {
    de.classList.remove(className)
  } else {
    de.className = de.className.replace(new RegExp(className, 'g'), '')
  }
}

function prefersColorScheme (suffix: string) {
  return w.matchMedia('(prefers-color-scheme' + suffix + ')')
}

export function getColorScheme () {
  if (w.matchMedia && prefersColorScheme('').media !== 'not all') {
    for (const colorScheme of knownColorSchemes) {
      if (prefersColorScheme(':' + colorScheme).matches) {
        return colorScheme
      }
    }
  }

  return 'light'
}
matchMedia('(prefers-color-scheme: dark)').addListener( (e) => {
  if (ColorMode.preference === 'system') {
    ColorMode.removeClass('light')
    ColorMode.removeClass('dark')
    ColorMode.addClass(ColorMode.getColorScheme())
  }
})
