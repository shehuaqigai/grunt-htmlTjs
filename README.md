# grunt-htmlTjs

> 编译html文件到underscore库的_.templat模板中,应用场景是当你使用前端backbone框架的时候需要mvc的时候
> 如果直接在_.template()里面写html代码，少还可以,多了就比较麻烦,我的理念是完全的html分离,把thml单独写成html文件
>使用这个插件可以吧html文件编译到_.template中在配合grunt里的watch任务就可以实现自动化了

## Getting Started
This plugin requires Grunt `0.4.0`
如果你还没开始使用[Grunt](http://gruntjs.com/) 你可以浏览[入门指南](http://gruntjs.com/getting-started)
里面介绍了如何创建配置文件[Gruntfile](http://gruntjs.com/sample-gruntfile) 以及如何安装使用grunt 插件
一旦你熟悉了grunt 的任务处理，你可以通过以下命令安装这个插件

```shell
npm install grunt-htmltjs --save-dev
```
如果这个插件已经安装，就在gruntfile配置文件中加载这个任务，在配置文件底部加入如下一行js代码

```js
grunt.loadNpmTasks('grunt-htmltjs');
```

## The "htmlTjs" task

### 概述
在你项目的gruntfile配置文件中添加名为`htmlTjs`的json对象任务到`grunt.initConfig()`

```js
grunt.initConfig({
  htmlTjs: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.root
Type: `String`
Default value: `'this'`

就是前缀表示默认为`this['变量']`

#### options.namespace
Type: `String`
Default value: `'false'`

就是放置模板的变量名如果没有填写将已匿名的方式return 模板

#### options.processName
Type: `function`
Default value: `变量名取模板的文件名不带后缀`

这个函数你也可以自己定义就一个参数，会传入一个文件html模板路径，你可以自己处理要写入的变量名，必须return一个字符串
如下例子
```js
grunt.initConfig({
  htmlTjs: {
    options: {
    processName:function(filepath){return filepath;}
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```

#### options.processContent
Type: `function`
Default value: `返回html的内容`

这个回调你也可以自己定义处理，会传入每一个模板文件的内容，你可以自己处理内容过滤，必须返回字符串
```js
grunt.initConfig({
  htmlTjs: {
    options: {
    processContent:function(filecontent){return filecontent;}
    },
    files: {
      'dest/default_options': ['src/testing', 'src/123'],
    },
  },
});
```
### Usage Examples

#### Default Options
In this example, the default options are used to do something with whatever. So if the `testing` file has the content `Testing` and the `123` file had the content `1 2 3`, the generated result would be `Testing, 1 2 3.`

```js
grunt.initConfig({
  htmlTjs: {
    options: {
     namespace:"tpl",
     root:'ADMIN'
    },
    files: {
      "../js/template/commodityManage/commodityManage.tpl.js": ["../js/template/commodityManage/*.html"]
    },
  },
});
```
## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
 * 2014-06-29   v0.1.1   Display filepath when fails to compile.
 * 2014-07-1    v0.1.2   修正bug
 * 2014-07-2    v0.1.4   修正bug
---

