demeter
=======

兼容IE6的前端框架
Demeter
注意：文档正在编写中，尚未完成
====

[![Demeter](http://f.cl.ly/items/2y0M0E2Q3a2H0z1N1Y19/demeter-banner.png)][demeter]

轻量级的、兼容IE6/7/8、响应式的CSS集合
[http://demeter.mr-5.cn/][Demeter]

[![Build Status](https://travis-ci.org/mr5/demeter.png?branch=master)][Build Status]

提示: [你可以按照自己的需求来自定义demeter][customize].

**使用Bower安装:**

```shell
$ bower install --save demeter
```


[demeter]: http://demetercss.io/
[Bower]: http://bower.io/
[Build Status]: https://travis-ci.org/yui/demeter
[customize]: http://demetercss.io/customize/


特性
--------

demeter is meant to be a starting point for every website or web app. We take care
of all the CSS work that every site needs, without making it look cookie-cutter:

* 响应设计的栅格系统（来自[purecss](http://purecss.io)）

* 基于typo.css的样式重设、中文友好的排版样式

* 支持`<a>` 和 `<button>`标签的按钮样式.

* 垂直和水平的菜单

* 常见的表格样式

* An extremely minimalist look that is super-easy to customize.

* Responsive by default, with a non-responsive option.

* Easy one-click customization with the [Skin Builder][].

* Extremely small file size: **4.5KB minified + gzip**.


[Normalize.css]: http://necolas.github.io/normalize.css/
[Skin Builder]: http://yui.github.io/skinbuilder/?mode=demeter


快速上手
-----------

To get started using demeter, go to the [demeter CSS website][demeter]. The website has
extensive documentation and examples necessary to get you started using demeter.

You can include the demeter CSS file in your project by fetching it from Yahoo's
CDN:

```html
<link rel="stylesheet" href="http://yui.yahooapis.com/demeter/0.4.2/demeter-min.css">
```

You can also install demeter using [Bower][], using the following command:

```shell
$ bower install --save demeter
```


从源代码构建
-----------------

Optionally, you can build demeter from its source on Github. To do this, you'll
need to have Node.js and npm installed. We use [Grunt][] to build demeter.

```shell
$ git clone git@github.com:mr5/demeter.git
$ cd demeter
$ npm install
$ grunt
```

### Build Files

Now, all demeter CSS files should be built into the `demeter/build/` directory. All
files that are in this build directory are also available on the CDN. The naming
conventions of the files in the `build/` directory follow these rules:

* `[module]-core.css`: The minimal set of styles, ususally structural, that
  provide the base on which the rest of the module's styles build.

* `[module]-nr.css`: Rollup of `[module]-core.css` + `[module].css` +
  `[module]-[feature].css` from the `src/[module]/` dir. This is the
  non-responsive version of a module.

* `[module].css`: Rollup of `[module]-nr.css` + `[module]-r.css` from the
  `build/` dir. This is the responsive version of a module.

* `*-min.css`: A minified file version of the files of the same name.

* `demeter.css`: A rollup of all `[module].css` files in the `build/` dir. This is
  a responsive roll-up of everything, non-minified.

* `demeter-min.css`: Minified version of `demeter.css` that should be used in
  production.

* `demeter-nr.css`: A Rollup of all modules without @media queries. This is a
  non-responsive roll-up of everything, non-minified.

* `demeter-nr-min.css`: Minified version of `demeter-nr.css` that should be used in
  production.


[Grunt]: http://gruntjs.com/


浏览器兼容
---------------------------

demeter在以下浏览器中测试通过:

* IE >= 6
* Firefox, Chrome, Safari最新发行版
* iOS 6.x, 7.x
* Android 4.x


文档
----------------

[demeter's website][demeter] is also open source, so please open any issues or pull
requests for the docs and website over at the [`demeter-site`][demeter-site]
repository.


[demeter-site]: https://github.com/yui/demeter-site


参与开发
------------

See the [CONTRIBUTING file][] for information on how to contribute to demeter.


[CONTRIBUTING file]: https://github.com/yui/demeter/blob/master/CONTRIBUTING.md


License
-------

This software is free to use under the Yahoo! Inc. BSD license.
See the [LICENSE file][] for license text and copyright information.


[LICENSE file]: https://github.com/yui/demeter/blob/master/LICENSE.md
