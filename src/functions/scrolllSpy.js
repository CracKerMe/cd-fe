/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-new */
/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-multi-assign */
import {
  rAF,
  debounce,
  isInView,
  trigger,
  addClass,
  removeClass,
} from '../utils';

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
        addClass(_element, options.className.init);
        this.initInView = true;
        trigger(_element, 'init.scrollspy');
      }
      this.timer = setTimeout(() => {
        if (inView) {
          addClass(_element, options.className.inView + animation);
        }
      }, options.delay);
      this.inViewState = true;
      trigger(_element, 'inview.scrollspy');
    }
    if (!inView && this.inViewState && options.repeat) {
      removeClass(_element, options.className.inView + animation);
      this.inViewState = false;
      trigger(_element, 'outview.scrollspy');
    }
  }
}

export default function ScrollSpyFn(...args) {
  document.querySelectorAll('[data-scrollspy]').forEach((v) => {
    const tempOption = v.getAttribute('data-scrollspy');
    new ScrollSpy(v, new Function('getJsonValueCus', `return ${tempOption}`)());
  });
  return new ScrollSpy(...args);
}
