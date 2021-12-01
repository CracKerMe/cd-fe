## 如何使用 scrollSpy 滚动动画插件

#### 指定 html 内容添加动画 及 事件
```html
<div class="demo-scroll-spy"></div>
```

```javascript
import cdFe from 'cd-fe'
const yourDom = document.querySelector('.demo-scroll-spy')
cdFe.scrollSpy(yourDom, {
  animation: "scale-up",
  delay: 500
});
yourDom.addEventListener("inview.scrollspy", () => {
  console.log("进入视口");
});
yourDom.addEventListener("outview.scrollspy", () => {
  console.log("离开视口");
});
```

#### 行间定义动画自动生效

注意： animation 需要引入对应的动画css 才能有效果，具体 css 参考内容在下面
```html
  <div data-scrollspy="{animation:'fade'}">我会fadeIn 显示出来哟</div>
  <div data-scrollspy="{animation:'scale-up'}">我会Scale-up 显示出来哟</div>
  <div data-scrollspy="{animation:'scale-down'}">我会Scale-down 显示出来哟</div>
  <div data-scrollspy="{animation:'slide-top'}">我会Slide Top 显示出来哟</div>
  <div data-scrollspy="{animation:'slide-bottom'}">我会Slide Bottom 显示出来哟</div>
  <div data-scrollspy="{animation:'slide-right'}">我会Slide Right 显示出来哟</div>
  <div data-scrollspy="{animation:'slide-left'}">我会Slide Left 显示出来哟</div>
  <div data-scrollspy="{animation:'fade', delay: 300}">Fade delay: 300</div>
  <div data-scrollspy="{animation:'fade', delay: 600}">Fade delay: 600</div>
  <div data-scrollspy="{animation:'fade', delay: 900}">Fade delay: 900</div>
  <div data-scrollspy="{animation:'fade', repeat: false}">我只会显示一次动画</div>
```


具体配置参考如下：
```javascript
  {
    animation: 'fade', // 动画名称，可自定义，满足 【animation-您的动画名称】 即可，
    className: { // 自定义滚动的classname
      inView: 'scrollSpy-inview', 
      init: 'scrollSpy-init',
    },
    repeat: true, // 动画是否需要重复 或者重复次数
    delay: 0, // 动画延迟执行ms
    topOffset: 0, // 距离顶部多少像素执行动画
    leftOffset: 0 // 距离左侧多少像素执行动画
  }
```

animation.css可参考如下 挑选引用到您的项目中去

```css
/* ==========================================================================
   Component: Aniamtion
 ============================================================================ */
[class*="animation-"] {
  -webkit-animation-duration: 0.5s;
  animation-duration: 0.5s;
  -webkit-animation-timing-function: ease-out;
  animation-timing-function: ease-out;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

/* Hide animated element if scrollSpy is used */
@media screen {
  .cssanimations [data-scrollspy*="animation"] {
    opacity: 0;
  }
}

/* Fade */
.animation-fade {
  -webkit-animation-name: fade;
  animation-name: fade;
  -webkit-animation-duration: 0.8s;
  animation-duration: 0.8s;
  -webkit-animation-timing-function: linear;
  animation-timing-function: linear;
}

/* Scale */
.animation-scale-up {
  -webkit-animation-name: scale-up;
  animation-name: scale-up;
}

.animation-scale-down {
  -webkit-animation-name: scale-down;
  animation-name: scale-down;
}

/* Slide */
.animation-slide-top {
  -webkit-animation-name: slide-top;
  animation-name: slide-top;
}

.animation-slide-bottom {
  -webkit-animation-name: slide-bottom;
  animation-name: slide-bottom;
}

.animation-slide-left {
  -webkit-animation-name: slide-left;
  animation-name: slide-left;
}

.animation-slide-right {
  -webkit-animation-name: slide-right;
  animation-name: slide-right;
}

.animation-slide-top-fixed {
  -webkit-animation-name: slide-top-fixed;
  animation-name: slide-top-fixed;
}

/* Shake */
.animation-shake {
  -webkit-animation-name: shake;
  animation-name: shake;
}

/* Spin */
.animation-spin {
  -webkit-animation: spin 2s infinite linear;
  animation: spin 2s infinite linear;
}

/* Spring */
.animation-left-spring {
  -webkit-animation: left-spring 0.3s ease-in-out;
  animation: left-spring 0.3s ease-in-out;
}

.animation-right-spring {
  -webkit-animation: right-spring 0.3s ease-in-out;
  animation: right-spring 0.3s ease-in-out;
}

.animation-reverse {
  -webkit-animation-direction: reverse;
  animation-direction: reverse;
}

.animation-paused {
  -webkit-animation-play-state: paused !important;
  animation-play-state: paused !important;
}

.animation-delay-1 {
  -webkit-animation-delay: 1s;
  animation-delay: 1s;
}

.animation-delay-2 {
  -webkit-animation-delay: 2s;
  animation-delay: 2s;
}

.animation-delay-3 {
  -webkit-animation-delay: 3s;
  animation-delay: 3s;
}

.animation-delay-4 {
  -webkit-animation-delay: 4s;
  animation-delay: 4s;
}

.animation-delay-5 {
  -webkit-animation-delay: 5s;
  animation-delay: 5s;
}

.animation-delay-6 {
  -webkit-animation-delay: 6s;
  animation-delay: 6s;
}

/* Keyframes
 ============================================================================ */
/* Fade */
@-webkit-keyframes fade {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

@keyframes fade {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

/* Scale up */
@-webkit-keyframes scale-up {
  0% {
    opacity: 0;
    -webkit-transform: scale(0.2);
    transform: scale(0.2);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes scale-up {
  0% {
    opacity: 0;
    -webkit-transform: scale(0.2);
    transform: scale(0.2);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

/* Scale down */
@-webkit-keyframes scale-down {
  0% {
    opacity: 0;
    -webkit-transform: scale(1.8);
    transform: scale(1.8);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

@keyframes scale-down {
  0% {
    opacity: 0;
    -webkit-transform: scale(1.8);
    transform: scale(1.8);
  }

  100% {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
  }
}

/* Slide top */
@-webkit-keyframes slide-top {
  0% {
    opacity: 0;
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }

  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

@keyframes slide-top {
  0% {
    opacity: 0;
    -webkit-transform: translateY(-100%);
    transform: translateY(-100%);
  }

  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

/* Slide bottom */
@-webkit-keyframes slide-bottom {
  0% {
    opacity: 0;
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }

  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

@keyframes slide-bottom {
  0% {
    opacity: 0;
    -webkit-transform: translateY(100%);
    transform: translateY(100%);
  }

  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

/* Slide left */
@-webkit-keyframes slide-left {
  0% {
    opacity: 0;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }

  100% {
    opacity: 1;
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

@keyframes slide-left {
  0% {
    opacity: 0;
    -webkit-transform: translateX(-100%);
    transform: translateX(-100%);
  }

  100% {
    opacity: 1;
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

/* Slide right */
@-webkit-keyframes slide-right {
  0% {
    opacity: 0;
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }

  100% {
    opacity: 1;
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

@keyframes slide-right {
  0% {
    opacity: 0;
    -webkit-transform: translateX(100%);
    transform: translateX(100%);
  }

  100% {
    opacity: 1;
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

/* Shake */
@-webkit-keyframes shake {
  0%,
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }

  10% {
    -webkit-transform: translateX(-9px);
    transform: translateX(-9px);
  }

  20% {
    -webkit-transform: translateX(8px);
    transform: translateX(8px);
  }

  30% {
    -webkit-transform: translateX(-7px);
    transform: translateX(-7px);
  }

  40% {
    -webkit-transform: translateX(6px);
    transform: translateX(6px);
  }

  50% {
    -webkit-transform: translateX(-5px);
    transform: translateX(-5px);
  }

  60% {
    -webkit-transform: translateX(4px);
    transform: translateX(4px);
  }

  70% {
    -webkit-transform: translateX(-3px);
    transform: translateX(-3px);
  }

  80% {
    -webkit-transform: translateX(2px);
    transform: translateX(2px);
  }

  90% {
    -webkit-transform: translateX(-1px);
    transform: translateX(-1px);
  }
}

@keyframes shake {
  0%,
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }

  10% {
    -webkit-transform: translateX(-9px);
    transform: translateX(-9px);
  }

  20% {
    -webkit-transform: translateX(8px);
    transform: translateX(8px);
  }

  30% {
    -webkit-transform: translateX(-7px);
    transform: translateX(-7px);
  }

  40% {
    -webkit-transform: translateX(6px);
    transform: translateX(6px);
  }

  50% {
    -webkit-transform: translateX(-5px);
    transform: translateX(-5px);
  }

  60% {
    -webkit-transform: translateX(4px);
    transform: translateX(4px);
  }

  70% {
    -webkit-transform: translateX(-3px);
    transform: translateX(-3px);
  }

  80% {
    -webkit-transform: translateX(2px);
    transform: translateX(2px);
  }

  90% {
    -webkit-transform: translateX(-1px);
    transform: translateX(-1px);
  }
}

/* Slide top fixed */
@-webkit-keyframes slide-top-fixed {
  0% {
    opacity: 0;
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
  }

  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

@keyframes slide-top-fixed {
  0% {
    opacity: 0;
    -webkit-transform: translateY(-10px);
    transform: translateY(-10px);
  }

  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

/* Slide bottom fixed */
@-webkit-keyframes slide-bottom-fixed {
  0% {
    opacity: 0;
    -webkit-transform: translateY(10px);
    transform: translateY(10px);
  }

  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

@keyframes slide-bottom-fixed {
  0% {
    opacity: 0;
    -webkit-transform: translateY(10px);
    transform: translateY(10px);
  }

  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
}

/* Spin */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}

@keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(359deg);
    transform: rotate(359deg);
  }
}

/* Spring */
@-webkit-keyframes right-spring {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }

  50% {
    -webkit-transform: translateX(-20%);
    transform: translateX(-20%);
  }

  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

@keyframes right-spring {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }

  50% {
    -webkit-transform: translateX(-20%);
    transform: translateX(-20%);
  }

  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

@-webkit-keyframes left-spring {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }

  50% {
    -webkit-transform: translateX(20%);
    transform: translateX(20%);
  }

  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

@keyframes left-spring {
  0% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }

  50% {
    -webkit-transform: translateX(20%);
    transform: translateX(20%);
  }

  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
}

```