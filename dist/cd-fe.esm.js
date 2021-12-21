/*! cd-fe v1.0.5 | (c) 2021-present Apple Sun | MIT */
function appendCss(...urls) {
    return Promise.all(urls.map((url) => new Promise((resolve, reject) => {
        const parent = document.head || document.body || document.documentElement;
        if (parent.querySelector(`link[href*="${url}"]`)) {
            resolve(url);
            return;
        }
        const link = document.createElement('link');
        const loadend = () => {
            link.onerror = null;
            link.onload = null;
        };
        link.onerror = () => {
            loadend();
            reject(new Error(`加载样式失败: ${url}`));
        };
        link.onload = () => {
            loadend();
            resolve(url);
        };
        link.href = url;
        link.rel = 'stylesheet';
        parent.appendChild(link);
    })));
}

function appendJs(...urls) {
    return Promise.all(urls.map((url) => new Promise((resolve, reject) => {
        const parent = document.head || document.body || document.documentElement;
        if (parent.querySelector(`script[src*="${url}"]`)) {
            resolve(url);
            return;
        }
        const script = document.createElement('script');
        const loadend = () => {
            script.onerror = null;
            script.onload = null;
        };
        script.onerror = () => {
            loadend();
            reject(new Error(`加载script失败: ${url}`));
        };
        script.onload = () => {
            loadend();
            resolve(url);
        };
        script.async = true;
        script.src = url;
        parent.appendChild(script);
    })));
}

/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable max-len */
const rAF = () => window.requestAnimationFrame
    || function (callback) {
      return window.setTimeout(callback, 1000 / 60); // shoot for 60 fps
    };
const debounce = (func, wait, immediate) => {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(context, args);
    }
  };
};
function getElementTop(element) {
  let actualTop = element.offsetTop;
  let current = element.offsetParent;
  while (current !== null) {
    actualTop += current.offsetTop;
    current = current.offsetParent;
  }
  return actualTop;
}
function getElementLeft(element) {
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent;

  while (current !== null) {
    actualLeft += current.offsetLeft;
    current = current.offsetParent;
  }
  return actualLeft;
}
const isInView = (element, options) => {
  const $win = document.documentElement;
  const visible = !!(element.offsetWidth || element.offsetHeight)
    && element.style.display !== 'none';

  if (!visible) {
    return false;
  }

  const windowLeft = $win.scrollLeft;
  const windowTop = $win.scrollTop;
  const left = getElementLeft(element);
  const top = getElementTop(element);

  const newOptions = { topOffset: 0, leftOffset: 0, ...options };
  return (top + element.offsetHeight >= windowTop && top - newOptions.topOffset <= windowTop + document.documentElement.clientHeight && left + element.offsetWidth >= windowLeft && left - newOptions.leftOffset <= windowLeft + document.documentElement.clientWidth);
};
function trigger(el, type) {
  try {
    // w3c
    const evt = document.createEvent('Event');
    evt.initEvent(type, true, true);
    el.dispatchEvent(evt);
  } catch (e) {
    // ie
    el.fireEvent(`on${type}`);
  }
}
function hasClass(el, className) {
  const reg = new RegExp(`(^|\\s)${className}(\\s|$)`);
  return reg.test(el.className);
}

function addClass$1(el, className) {
  if (hasClass(el, className)) {
    return;
  }
  const newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
}

function removeClass$1(el, className) {
  if (!hasClass(el, className)) {
    return;
  }
  const reg = new RegExp(`(^|\\s)${className}(\\s|$)`, 'g');
  el.className = el.className.replace(reg, ' ');
}

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

const defaultOption = {
  animation: 'fade',
  className: {
    inView: 'scrollSpy-inview',
    init: 'scrollSpy-init',
  },
  repeat: true,
  delay: 0,
  topOffset: 0,
  leftOffset: 0,
};
class ScrollSpy {
  constructor(element, options) {
    this.options = { ...defaultOption, ...options };
    this.element = element;
    document.addEventListener('scroll', () => {
      rAF(this.checkView());
    });
    document.addEventListener('resize.scrollspy', debounce(this.checkView, 50));
    document.addEventListener('orientationchange.scrollspy', debounce(this.checkView, 50));
    this.timer = this.inViewState = this.initInView = null;
    this.checkView();
  }

  checkView() {
    const _element = this.element;
    const { options } = this;
    const inView = isInView(_element, options);
    const animation = options.animation ? ` animation-${options.animation}` : '';
    if (inView && !this.inViewState) {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      if (!this.initInView) {
        addClass$1(_element, options.className.init);
        this.initInView = true;
        trigger(_element, 'init.scrollspy');
      }
      this.timer = setTimeout(() => {
        if (inView) {
          addClass$1(_element, options.className.inView + animation);
        }
      }, options.delay);
      this.inViewState = true;
      trigger(_element, 'inview.scrollspy');
    }
    if (!inView && this.inViewState && options.repeat) {
      removeClass$1(_element, options.className.inView + animation);
      this.inViewState = false;
      trigger(_element, 'outview.scrollspy');
    }
  }
}

function ScrollSpyFn(...args) {
  if (args[0] === 'init') {
    document.querySelectorAll('[data-scrollspy]').forEach((v) => {
      const tempOption = v.getAttribute('data-scrollspy');
      new ScrollSpy(v, new Function('getJsonValueCus', `return ${tempOption}`)());
    });
  }
  return new ScrollSpy(...args);
}

// Global variable minimizers
const w = window;
const d = document;
const de = d.documentElement;
const knownColorSchemes = ['dark', 'light'];
const preference = window.localStorage.getItem('awm-color-mode') || 'system';
let value = preference === 'system' ? getColorScheme() : preference;
// Applied forced color mode
const forcedColorMode = d.body.getAttribute('data-color-mode-forced');
if (forcedColorMode) {
    value = forcedColorMode;
}
addClass(value);
const ColorMode = {
    preference,
    value,
    getColorScheme,
    addClass,
    removeClass
};
function addClass(value) {
    const className = '' + value + '-mode';
    if (de.classList) {
        de.classList.add(className);
    }
    else {
        de.className += ' ' + className;
    }
}
function removeClass(value) {
    const className = '' + value + '-mode';
    if (de.classList) {
        de.classList.remove(className);
    }
    else {
        de.className = de.className.replace(new RegExp(className, 'g'), '');
    }
}
function prefersColorScheme(suffix) {
    return w.matchMedia('(prefers-color-scheme' + suffix + ')');
}
function getColorScheme() {
    if (w.matchMedia && prefersColorScheme('').media !== 'not all') {
        for (const colorScheme of knownColorSchemes) {
            if (prefersColorScheme(':' + colorScheme).matches) {
                return colorScheme;
            }
        }
    }
    return 'light';
}
matchMedia('(prefers-color-scheme: dark)').addListener((e) => {
    if (ColorMode.preference === 'system') {
        ColorMode.removeClass('light');
        ColorMode.removeClass('dark');
        ColorMode.addClass(ColorMode.getColorScheme());
    }
});

const cdFe = {
    appendCss,
    appendJs,
    scrollSpy: ScrollSpyFn,
    ColorMode
};

export { cdFe as default };
