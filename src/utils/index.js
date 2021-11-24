/* eslint-disable func-names */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable max-len */
export const rAF = () => window.requestAnimationFrame
    || function (callback) {
      return window.setTimeout(callback, 1000 / 60); // shoot for 60 fps
    };
export const debounce = (func, wait, immediate) => {
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
export const isInView = (element, options) => {
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
export function trigger(el, type) {
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
export function hasClass(el, className) {
  const reg = new RegExp(`(^|\\s)${className}(\\s|$)`);
  return reg.test(el.className);
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return;
  }
  const newClass = el.className.split(' ');
  newClass.push(className);
  el.className = newClass.join(' ');
}

export function removeClass(el, className) {
  if (!hasClass(el, className)) {
    return;
  }
  const reg = new RegExp(`(^|\\s)${className}(\\s|$)`, 'g');
  el.className = el.className.replace(reg, ' ');
}
