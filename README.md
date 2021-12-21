# cdFe
潮点视频前端工具库

> build by cdFe teamwork, goal to reduce some front-end work. hope you enjoy. please remember es6+ runtimes is required
> 潮点视频前端开发，目标是降低一些业务常用的功能的重复开发 以及多处复用。需要es6及以上环境

## Main files
关键文件目录
```text
dist/
├── cd-fe.js         (UMD, default)
├── cd-fe.min.js     (UMD, compressed)
├── cd-fe.esm.js     (ECMAScript Module)
├── cd-fe.esm.min.js (ECMAScript Module, compressed)
└── cd-fe.d.ts       (TypeScript Declaration File)
```

## Getting started
开始使用

### Installation
安装方式

```shell
npm install cd-fe
```

In browser:

```html
<script src="/path/to/cd-fe.min.js"></script>
```

### Usage
使用方法 待完善
#### Syntax

```js
cdFe.appenJs(script1, script2, ..., scriptN)
  .then(() => {})
  .catch((err) => {})
  .finally(() => {});

cdFe.appenCss(link1, link2, ..., linkN)
  .then(() => {})
  .catch((err) => {})
  .finally(() => {});

cdFe.ColorMode
/*
addClass: ƒ h(e)
getColorScheme: ƒ w()
preference: "system"
removeClass: ƒ (e)
value: 'light'
*/
```

#### Example

#### scrollSpy的使用请参考 [scrollSpy readMe](https://github.com/CracKerMe/cd-fe/blob/main/src/functions/readme.md)
[cdFe.scrollSpy 在线 demo](https://codepen.io/AWebMan/pen/eYRNrbr)

## Browser support
浏览器兼容

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Opera (latest)
- Edge (latest)
- Internet Explorer ie9+

代码使用了 *Promise* / *Arrow Function* ,请确保您的环境兼容

## License

[MIT](https://opensource.org/licenses/MIT) © [Apple Sun](https://awebman.com/)
