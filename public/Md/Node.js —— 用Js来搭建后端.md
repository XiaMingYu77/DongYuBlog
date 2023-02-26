# Node.js —— 用Js来搭建后端

使用 Node.js 时，我们不仅仅 在实现一个应用，同时还实现了整个 HTTP 服务器。事实上，我们的 Web 应用以及对应的 Web 服务器基本上是一样的。

Node.js 应用是由哪几部分组成的：

1. **引入 required 模块：**我们可以使用 **require** 指令来载入 Node.js 模块。
2. **创建服务器：**服务器可以监听客户端的请求，类似于 Apache 、Nginx 等 HTTP 服务器。
3. **接收请求与响应请求** 服务器很容易创建，客户端可以使用浏览器或终端发送 HTTP 请求，服务器接收请求后返回响应数据。

一个简单的Node.js服务器：

```js
var http = require('http');

http.createServer(function (request, response) {

    // 发送 HTTP 头部 
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // 发送响应数据 "Hello World"
    response.end('Hello World\n');
}).listen(8888);

// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');
```

127.0.0.1是本机回环，前面监听的是8888端口

在浏览器访问该网页，即浏览器向该地址发送请求然后得到我们服务器的响应

![image-20221203163704042](https://gcore.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202212031637094.png) 



**安装 express **（node 框架）

```
npm install express          # 本地安装
npm install express -g   # 全局安装
```



### Node.js 的特点

+ 异步I/O

+ 通过回调函数处理请求

  ```js
  var http = require('http');
  
  var querystring = require('querystring');
  
  //侦听服务器的request事件
  http.createServer(function(req, res){
      var postData = '';
      req.setEncoding('utf-8');
      //侦听请求的data事件
      req.on('data', function(chunk){
          postData+=chunk;
      });
      //侦听请求的end事件
      req.on('end', function(){
          res.end(postData); //将数据发回
      });
  }).listen(8080);
  ```

+ 单线程

  Node依旧保持了 JavaScript 中单线程的特点

  在之前 Js 中我们已经了解到了 HTML5 定制的 Web Workers 的标准，通过 WebWorker 创建工作线程来完成计算

  而 Node 继承了相同的思路，使用 child_process 来创建子线程，然后通过进程之间的事件消息来传递结果。通过 Master-Worker 的管理方式，也可以很好地管理各个工作进程，以达到更高的健壮性

+ 跨平台

  期初，Node 只能在 Linux 上运行，后来由于 Node 的发展，微软提供了 Node 对 WIndows 平台的兼容

  libuv：构建在操作系统与 Node 上层模块系统之间的平台层架构（它已经是许多系统实现跨平台的基础组件）

此外 Node 可以很好地作为中间接口桥接后端其他语言的代码（比如给它编写 C/C++ 扩展、连接到原来的 java 系统等等）



## Node.js 的模块

为了让Node.js的文件可以相互调用，Node.js提供了一个简单的模块系统。

模块是Node.js 应用程序的基本组成部分，文件和模块是一一对应的。换言之，一个 Node.js 文件就是一个模块，这个文件可能是JavaScript 代码、JSON 或者编译过的C/C++ 扩展。

**与前端使用的 ES6 模块不一样，Node.js 使用的是 CommonJS**

CommonJS 和 ES6模块的不同：

+ CommonJS 模块输出的是一个值的拷贝，ES6 模块输出的是值的引用。
+ CommonJS 模块是运行时加载，ES6 模块是编译时输出接口。
+ CommonJs 是单个值导出，ES6 Module可以导出多个
+ CommonJs 是动态语法可以写在判断里，ES6 Module 静态语法只能写在顶层
+ CommonJs 的 this 是当前模块，ES6 Module的 this 是 undefined

```js
var http = require('http');  //这里就是在引入http模块

var querystring = require('querystring');

//侦听服务器的request事件
http.createServer(function(req, res){
    var postData = '';
    req.setEncoding('utf-8');
    //侦听请求的data事件
    req.on('data', function(chunk){
        postData+=chunk;
    });
    //侦听请求的end事件
    req.on('end', function(){
        res.end(postData); //将数据发回
    });
}).listen(8080);
```



### 引入模块

在 Node.js 中，引入一个模块非常简单，如下我们创建一个 **main.js** 文件并引入 hello 模块，代码如下:

```js
var hello = require('./Hello');
hello.world();
```

### 导出模块

==不要同时使用 exports 和 module.exports。==

如果先使用 exports 对外暴露属性或方法，再使用 module.exports 暴露对象，会使得 exports 上暴露的属性或者方法失效。

原因在于，exports 仅仅是 module.exports 的一个引用

+ 直接导出方法、属性

  ```js
  //在文件 Hello.js 中编写
  exports.world = function() {
    console.log('Hello World');
  }
  ```

  通过 exports 对象把 world 作为模块的访问接口，在 main.js 中通过 require('./Hello') 加载这个模块，然后就可以直接访问 hello.js 中 exports 对象的成员函数了。

  需要注意的是这里是将方法、属性写到 exports 对象中

+ 导出对象

  通过 model.exports 可以将对象的构造函数传出

  ```js
  //Hello.js
  function Hello() { 
      var name; 
      this.setName = function(thyName) { 
          name = thyName; 
      }; 
      this.sayHello = function() { 
          console.log('Hello ' + name); 
      }; 
  }; 
  module.exports = Hello;
  
  //使用原型链、class也是完全没问题的
  function Hello() { 
      this.name; 
  }; 
  Hello.prototype.setName = function(name){
      this.name = name;
  }
  Hello.prototype.sayHello = function(){
      console.log(this.name);
  }
  module.exports = Hello;
  ```

  ```js
  //main
  let Hello = require('./Hello');
  let hello = new Hello();
  hello.setName('MoMing');
  hello.sayHello();
  ```



### require 方法中的文件查找策略

Node.js 中存在 4 类模块（原生模块和3种文件模块）

<img src="https://gcore.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202212071650517.png" alt="image-20221207165038431" style="zoom: 67%;" /> 

==下面的解释内容就是上面图，直接看上图就好==

需要注意的是优先级的问题（即哪怕文件中有一个http/http.js/http.node/http.json，加载 http 时由于它是原生模块，原生的优先级更高，所以加载的是原生模块）

#### 从文件模块缓存中加载

尽管原生模块与文件模块的优先级不同，但是都会优先从文件模块的缓存中加载已经存在的模块。

#### 从原生模块加载

原生模块的优先级仅次于文件模块缓存的优先级。require 方法在解析文件名之后，优先检查模块是否在原生模块列表中。以http模块为例，尽管在目录下存在一个 http/http.js/http.node/http.json 文件，require("http") 都不会从这些文件中加载，而是从原生模块中加载。

原生模块也有一个缓存区，同样也是优先从缓存区加载。如果缓存区没有被加载过，则调用原生模块的加载方式进行加载和执行。

#### 从文件加载

当文件模块缓存中不存在，而且不是原生模块的时候，Node.js 会解析 require 方法传入的参数，并从文件系统中加载实际的文件，加载过程中的包装和编译细节在前一节中已经介绍过，这里我们将详细描述查找文件模块的过程，其中，也有一些细节值得知晓。

require方法接受以下几种参数的传递：

- http、fs、path等，原生模块。
- ./mod或../mod，相对路径的文件模块。
- /pathtomodule/mod，绝对路径的文件模块。
- mod，非原生模块的文件模块。



### npm模块的介绍

##### 全局安装与本地安装

npm 的包安装分为本地安装（local）、全局安装（global）两种，从敲的命令行来看，差别只是有没有-g而已，比如

```
npm install express          # 本地安装
npm install express -g   # 全局安装
```

安装完 express 后会有一个 Package.json 里面存放着包的相关信息

##### Package.json 属性说明

- **name** - 包名。
- **version** - 包的版本号。
- **description** - 包的描述。
- **homepage** - 包的官网 url 。
- **author** - 包的作者姓名。
- **contributors** - 包的其他贡献者姓名。
- **dependencies** - 依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下。
- **repository** - 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上。
- **main** - main 字段指定了程序的主入口文件，require('moduleName') 就会加载这个文件。这个字段的默认值是模块根目录下面的 index.js。
- **keywords** - 关键字

<img src="https://gcore.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202212031707464.png" alt="image-20221203170758429" style="zoom: 80%;" /> 

 Package.json 属性说明

- **name** - 包名。
- **version** - 包的版本号。
- **description** - 包的描述。
- **homepage** - 包的官网 url 。
- **author** - 包的作者姓名。
- **contributors** - 包的其他贡献者姓名。
- **dependencies** - 依赖包列表。如果依赖包没有安装，npm 会自动将依赖包安装在 node_module 目录下。
- **repository** - 包代码存放的地方的类型，可以是 git 或 svn，git 可在 Github 上。
- **main** - main 字段指定了程序的主入口文件，require('moduleName') 就会加载这个文件。这个字段的默认值是模块根目录下面的 index.js。
- **keywords** - 关键字

------

##### 卸载模块

我们可以使用以下命令来卸载 Node.js 模块。

```
$ npm uninstall express
```



卸载后，你可以到 /node_modules/ 目录下查看包是否还存在，或者使用以下命令查看：

```
$ npm ls
```

------

##### 更新模块

我们可以使用以下命令更新模块：

```
$ npm update express
```

------

##### 搜索模块

使用以下来搜索模块：

```
$ npm search express
```

------

##### 创建模块

创建模块，package.json 文件是必不可少的。我们可以使用 NPM 生成 package.json 文件，生成的文件包含了基本的结果。

```
$ npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (node_modules) runoob                   # 模块名
version: (1.0.0) 
description: Node.js 测试模块(www.runoob.com)  # 描述
entry point: (index.js) 
test command: make test
git repository: https://github.com/runoob/runoob.git  # Github 地址
keywords: 
author: 
license: (ISC) 
About to write to ……/node_modules/package.json:      # 生成地址

{
  "name": "runoob",
  "version": "1.0.0",
  "description": "Node.js 测试模块(www.runoob.com)",
  ……
}


Is this ok? (yes) yes
```

以上的信息，你需要根据你自己的情况输入。在最后输入 "yes" 后会生成 package.json 文件。

接下来我们可以使用以下命令在 npm 资源库中注册用户（使用邮箱注册）：

```
$ npm adduser
Username: mcmohd
Password:
Email: (this IS public) mcmohd@gmail.com
```

接下来我们就用以下命令来发布模块：

```
$ npm publish
```

如果你以上的步骤都操作正确，你就可以跟其他模块一样使用 npm 来安装。

***

##### 版本号

使用 NPM 下载和发布代码时都会接触到版本号。NPM 使用语义版本号来管理代码，这里简单介绍一下。

语义版本号分为X.Y.Z三位，分别代表主版本号、次版本号和补丁版本号。当代码变更时，版本号按以下原则更新。

- 如果只是修复bug，需要更新Z位。
- 如果是新增了功能，但是向下兼容，需要更新Y位。
- 如果有大变动，向下不兼容，需要更新X位。

版本号有了这个保证后，在申明第三方包依赖时，除了可依赖于一个固定版本号外，还可依赖于某个范围的版本号。例如"argv": "0.0.x"表示依赖于0.0.x系列的最新版argv。

NPM支持的所有版本号范围指定方式可以查看[官方文档](https://npmjs.org/doc/files/package.json.html#dependencies)。



## 异步API

Node 是首个将异步作为主要编程方式和设计理念的编程语言或平台

在前端我们使用的是同步 Js 代码，并且 UI 也共用着这一个单线程，假如后台使用同步阻塞代码编写，那么将导致前端网络请求等待较长时间，产生阻塞，反映到页面上就是 “卡顿感”。

采用异步机制，在资源下载期间，Js 和 UI 的执行都不会处于等待状态，使得产生一个良好的用户体验。

### 事件循环

Node 的执行模型

<img src="https://gcore.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202212081546318.jpg" alt="mmexport1670485538583" style="zoom: 25%;" /> 

相关概念：观察者：用于告知是否还有事件需要处理

注意：Node 不仅仅有异步I/O，还有`setTimeout()`、`setInterval()`、`setImmediate()`、`process.nextTick()`等异步API

**Node 搭建 Web 服务器的实现基础流程**：==事件驱动服务器==

<img src="https://gcore.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202212081627092.jpg" alt="mmexport1670488033081" style="zoom:33%;" /> 

### process.nextTick()

立即异步执行一个任务（在下一个 Tick 中执行）

在不了解这个方法之前我们可能会使用 setTimeout 来实现

```js
setTimeout(function () {
    //TODO
}, 0);
```

现在我们应当这样来实现

```js
process.nextTick(function(){
    //TODO
});
```

==注意：可以加入多个回调函数哦==，回调函数会保存在一个数组中，每轮循环会保证数组中的回调全部执行清空

**区别：**

setTimeout 是基于红黑树的，每次 Tick 执行时从中取出计时器对象，检查是否超过定时时间（这样做开销比 process.nextTick 高很多，而且定时器本身精度不够）

process.nextTick 直接将回调函数放入队列中，在下一轮 Tick 时取出执行

前者复杂度为 O(lg(n)) 后者为 O(1)



### setImmediate()

该方法和 process.nextTick() 效果类似，它们之间存在优先级区别

process.nextTick() 的优先级更高：

+ process.nextTick() 属于 idle 观察者
+ setImmediate() 属于 check 观察者
+ 优先级上 idle 观察者 > I/O 观察者 > check 观察者

==注意：可以添加多个回调函数==，回调函数保存在一个链表中。==每轮执行一个回调函数==



### 异步编程存在的问题与解决方案

之前在前端的时候就接触到了异步编程存在的问题：

1. 异常处理困难
2. 回调地狱
3. 阻塞代码：这个由于Js是单线程的，我们无法实现类似 Java 那样的 sleep() 方法阻塞线程等待资源

**解决方案**

+ 事件发布/订阅模式

+ Promise/Deferred 模式

+ 流程控制库

  

#### 事件发布/订阅模式

Node 自身提供的 events 模块是其的一个简单实现，Node中部分模块都继承自它，==这个模块不存在事件冒泡==

events 模块只提供了一个对象： events.EventEmitter。EventEmitter 的核心就是事件触发与事件监听器功能的封装。

你可以通过require("events");来访问该模块。

```js
// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();
```

API：

| 序号 | 方法 & 描述                                                  |
| :--- | :----------------------------------------------------------- |
| 1    | **addListener(event, listener)** 为指定事件添加一个监听器到监听器数组的尾部。 |
| 2    | **on(event, listener)** 为指定事件注册一个监听器，接受一个字符串 event 和一个回调函数。`server.on('connection', function (stream) {  console.log('someone connected!'); });` |
| 3    | **once(event, listener)** 为指定事件注册一个单次监听器，即 监听器最多只会触发一次，触发后立刻解除该监听器。`server.once('connection', function (stream) {  console.log('Ah, we have our first user!'); });` |
| 4    | **removeListener(event, listener)** 移除指定事件的某个监听器，监听器必须是该事件已经注册过的监听器。它接受两个参数，第一个是事件名称，第二个是回调函数名称。`var callback = function(stream) {  console.log('someone connected!'); }; server.on('connection', callback); // ... server.removeListener('connection', callback);` |
| 5    | **removeAllListeners([event])** 移除所有事件的所有监听器， 如果指定事件，则移除指定事件的所有监听器。 |
| 6    | **setMaxListeners(n)** 默认情况下， EventEmitters 如果你添加的监听器超过 10 个就会输出警告信息。 setMaxListeners 函数用于改变监听器的默认限制的数量。 |
| 7    | **listeners(event)** 返回指定事件的监听器数组。              |
| 8    | **emit(event, [arg1], [arg2], [...])** 按监听器的顺序执行执行每个监听器，如果事件有注册监听返回 true，否则返回 false。 |

+ addListener/on()
+ once()
+ removeListener()
+ removeAllListeners()
+ emit()

```js
let events = require('events');
let emitter = new events.EventEmitter();
emitter.on("event1", function(message){
    console.log(message);
})
emitter.emit('event1', "Hello");
```

==注意：==

+ 如果为一个事件添加超过10个侦听器会得到一条警告（设计者认为过多监听器会导致内存泄露，且过多占用 cpu）

  `emitter.setMaxListeners(0)`可以去除这个限制

+ 为了处理异常，EventEmitter 对 error 事件进行特殊对待

  + 添加了侦听器就优先交由该侦听器处理
  + 没添加才作为异常抛出

##### 继承 events 模块

```js
let events = require('events');
class Stream extends events.EventEmitter{
    //...
}
```

此外可以通过盗用构造函数 + 原型函数继承 来实现继承



##### 利用事件队列与 once 解决雪崩问题

正常情况下常用资源存储在内存中，访问速度非常快，常用于加速数据访问，让绝大多数请求不必去做重复低效的数据读取

雪崩问题：高访问量、大并发下缓存失效，大量请求同时涌入数据库，导致数据库无法承受短时间这么大的请求量

```js
//可能产生雪崩的代码
function select(callback) {
    db.select('SQL', (result) => {
        callback(result);
    });
}
```

使用事件队列+once()来解决问题：把所有请求回调都压入事件队列中，然后执行一次就移除

==注意：此处会出现过多的回调，需要调用`emitter.setMaxListeners(0)`来接触限制==

```js
var events = require('events');
let proxy = new events.EventEmitter();
let status = "ready";
function select(callback) {
    proxy.once("selected", callback);
    if(status == "ready"){
        status = "pending";
        db.select("SQL", (result)=>{
            proxy.emit("selected", result);
            status = "ready";
        })
    }
} 
```



#### Promise/Deferred

Promise 的实现和 ES6 差不多

```js
let p = new Promise((resolve, reject) =>{
    resolve('hhh');
}).then((res)=>{
    console.log(res);
});
```

同样拥有`Promise.all()`进行期约合成

#### 异步函数

同样的现在 Node 沿用了 async function 与 await

通过这个与 Promise 的联合使用，完美解决了回调地狱以及异步请求次序的问题

```js
let p = new Promise((resolve, reject)=>{
    resolve('hhh');
})
async function getP(){
    console.log(await p);
}
getP();
```

化异步为同步，完成进程阻塞与资源等待的模拟



## Node.js 全局对象

而 Node.js 中的全局对象是 global，所有全局变量（除了 global 本身以外）都是 global 对象的属性。

==**注意：** 最好不要使用 var 定义变量以避免引入全局变量，因为全局变量会污染命名空间，提高代码的耦合风险。==

### 文件名、文件路径

+ __filename

  **__filename** 表示当前正在执行的脚本的文件名。它将输出文件所在位置的绝对路径，且和命令行参数所指定的文件名不一定相同。 如果在模块中，返回的值是模块文件的路径。

  ```js
  console.log(__filename);
  //D:\WebProject\Node\test.js
  ```

+ __dirname

  **__dirname** 表示当前执行脚本所在的目录。

  ```
  console.log(__dirname);
  //D:\WebProject\Node
  ```



### process

用于描述当前Node.js 进程状态的对象

| 序号 | 事件 & 描述                                                  |
| :--- | :----------------------------------------------------------- |
| 1    | **exit** 当进程准备退出时触发。                              |
| 2    | **beforeExit** 当 node 清空事件循环，并且没有其他安排时触发这个事件。通常来说，当没有进程安排时 node 退出，但是 'beforeExit' 的监听器可以异步调用，这样 node 就会继续执行。 |
| 3    | **uncaughtException** 当一个异常冒泡回到事件循环，触发这个事件。如果给异常添加了监视器，默认的操作（打印堆栈跟踪信息并退出）就不会发生。 |
| 4    | **Signal 事件** 当进程接收到信号时就触发。信号列表详见标准的 POSIX 信号名，如 SIGINT、SIGUSR1 等。 |

退出信号描述

| 序号 | 信号描述                                                     |
| ---- | ------------------------------------------------------------ |
| 1    | **Uncaught Fatal Exception** 有未捕获异常，并且没有被域或 uncaughtException 处理函数处理。 |
| 2    | **Unused** 保留，由 Bash 预留用于内置误用                    |
| 3    | **Internal JavaScript Parse Error** JavaScript的源码启动 Node 进程时引起解析错误。非常罕见，仅会在开发 Node 时才会有。 |
| 4    | **Internal JavaScript Evaluation Failure** JavaScript 的源码启动 Node 进程，评估时返回函数失败。非常罕见，仅会在开发 Node 时才会有。 |
| 5    | **Fatal Error** V8 里致命的不可恢复的错误。通常会打印到 stderr ，内容为： FATAL ERROR |
| 6    | **Non-function Internal Exception Handler** 未捕获异常，内部异常处理函数不知为何设置为on-function，并且不能被调用。 |
| 7    | **Internal Exception Handler Run-Time Failure** 未捕获的异常， 并且异常处理函数处理时自己抛出了异常。例如，如果 process.on('uncaughtException') 或 domain.on('error') 抛出了异常。 |
| 8    | **Unused** 保留，在以前版本的 Node.js 中，退出码 8 有时表示未捕获的异常。 |
| 9    | **Invalid Argument** 可能是给了未知的参数，或者给的参数没有值。 |
| 10   | **Internal JavaScript Run-Time Failure** JavaScript的源码启动 Node 进程时抛出错误，非常罕见，仅会在开发 Node 时才会有。 |
| 12   | **Invalid Debug Argument** 设置了参数--debug 和/或 --debug-brk，但是选择了错误端口。 |
| 128  | **Signal Exits** 如果 Node 接收到致命信号，比如SIGKILL 或 SIGHUP，那么退出代码就是128 加信号代码。这是标准的 Unix 做法，退出信号代码放在高位。 |

#### process 属性

| 序号. | 属性 & 描述                                                  |
| :---- | :----------------------------------------------------------- |
| 1     | **stdout** 标准输出流。                                      |
| 2     | **stderr** 标准错误流。                                      |
| 3     | **stdin** 标准输入流。                                       |
| 4     | **argv** argv 属性返回一个数组，由命令行执行脚本时的各个参数组成。它的第一个成员总是node，第二个成员是脚本文件名，其余成员是脚本文件的参数。 |
| 5     | **execPath** 返回执行当前脚本的 Node 二进制文件的绝对路径。  |
| 6     | **execArgv** 返回一个数组，成员是命令行下执行脚本时，在Node可执行文件与脚本文件之间的命令行参数。 |
| 7     | **env** 返回一个对象，成员为当前 shell 的环境变量            |
| 8     | **exitCode** 进程退出时的代码，如果进程优通过 process.exit() 退出，不需要指定退出码。 |
| 9     | **version** Node 的版本，比如v0.10.18。                      |
| 10    | **versions** 一个属性，包含了 node 的版本和依赖.             |
| 11    | **config** 一个包含用来编译当前 node 执行文件的 javascript 配置选项的对象。它与运行 ./configure 脚本生成的 "config.gypi" 文件相同。 |
| 12    | **pid** 当前进程的进程号。                                   |
| 13    | **title** 进程名，默认值为"node"，可以自定义该值。           |
| 14    | **arch** 当前 CPU 的架构：'arm'、'ia32' 或者 'x64'。         |
| 15    | **platform** 运行程序所在的平台系统 'darwin', 'freebsd', 'linux', 'sunos' 或 'win32' |
| 16    | **mainModule** require.main 的备选方法。不同点，如果主模块在运行时改变，require.main可能会继续返回老的模块。可以认为，这两者引用了同一个模块。 |

``console.log()`调用具有格式化输出的 process.stdout.write ``

#### process 方法

| 序号 | 方法 & 描述                                                  |
| :--- | :----------------------------------------------------------- |
| 1    | **abort()** 这将导致 node 触发 abort 事件。会让 node 退出并生成一个核心文件。 |
| 2    | **chdir(directory)** 改变当前工作进程的目录，如果操作失败抛出异常。 |
| 3    | **cwd()** 返回当前进程的工作目录                             |
| 4    | **exit([code])** 使用指定的 code 结束进程。如果忽略，将会使用 code 0。 |
| 5    | **getgid()** 获取进程的群组标识（参见 getgid(2)）。获取到的是群组的数字 id，而不是名字。 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。 |
| 6    | **setgid(id)** 设置进程的群组标识（参见 setgid(2)）。可以接收数字 ID 或者群组名。如果指定了群组名，会阻塞等待解析为数字 ID 。 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。 |
| 7    | **getuid()** 获取进程的用户标识(参见 getuid(2))。这是数字的用户 id，不是用户名。 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。 |
| 8    | **setuid(id)** 设置进程的用户标识（参见setuid(2)）。接收数字 ID或字符串名字。如果指定了群组名，会阻塞等待解析为数字 ID 。 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。 |
| 9    | **getgroups()** 返回进程的群组 ID 数组。POSIX 系统没有保证一定有，但是 node.js 保证有。 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。 |
| 10   | **setgroups(groups)** 设置进程的群组 ID。这是授权操作，所以你需要有 root 权限，或者有 CAP_SETGID 能力。 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。 |
| 11   | **initgroups(user, extra_group)** 读取 /etc/group ，并初始化群组访问列表，使用成员所在的所有群组。这是授权操作，所以你需要有 root 权限，或者有 CAP_SETGID 能力。 注意：这个函数仅在 POSIX 平台上可用(例如，非Windows 和 Android)。 |
| 12   | **kill(pid[, signal])** 发送信号给进程. pid 是进程id，并且 signal 是发送的信号的字符串描述。信号名是字符串，比如 'SIGINT' 或 'SIGHUP'。如果忽略，信号会是 'SIGTERM'。 |
| 13   | **memoryUsage()** 返回一个对象，描述了 Node 进程所用的内存状况，单位为字节。 |
| 14   | **nextTick(callback)** 一旦当前事件循环结束，调用回调函数。  |
| 15   | **umask([mask])** 设置或读取进程文件的掩码。子进程从父进程继承掩码。如果mask 参数有效，返回旧的掩码。否则，返回当前掩码。 |
| 16   | **uptime()** 返回 Node 已经运行的秒数。                      |
| 17   | **hrtime()** 返回当前进程的高分辨时间，形式为 [seconds, nanoseconds]数组。它是相对于过去的任意事件。该值与日期无关，因此不受时钟漂移的影响。主要用途是可以通过精确的时间间隔，来衡量程序的性能。 你可以将之前的结果传递给当前的 process.hrtime() ，会返回两者间的时间差，用来基准和测量时间间隔。 |



## Web 模块

使用 Node.js 构建服务器





## Node.js 路由

之前我们实现了监听请求，但是尚未对其HTTP方法进行处理，也没有对URL进行处理，这里就是对其进行处理的

我们需要查看 HTTP 请求，从中提取出请求的 URL 以及 GET/POST 参数。这需要借助 ==url类 和 querystring模块==。

### URL类

```javascript
var http = require("http");


function start() {
  function onRequest(request, response) {
    let url = new URL(request.url, 'http://example.com'); //[input,base]
    let params = url.searchParams;
    console.log(url);
    
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.write("Hello World");
    response.end();
  }
 
  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

start();
```

`URL='http://127.0.0.1:8888/test?abc=100'`解析出来的内容：

```js
URL {
  href: 'http://example.com/test?abc=100', //请求的全部内容
  origin: 'http://example.com',            //请求域
  protocol: 'http:',                       //传输协议
  username: '',                            //用户名 这部分由于是明文传输，一般不用
  password: '',                            //密码
  host: 'example.com',                     //域名（带端口号）注意：由于request.rul返回的并不是全部的url，所以端口之类的接收不到
  hostname: 'example.com',                 //域名（无端口号）
  port: '',                                //端口
  pathname: '/test',                       //！！！路径，这个可以用于划分内容
  search: '?abc=100',                      //查询字符串 query
  searchParams: URLSearchParams { 'abc' => '100' }, //解析查询字符串
  hash: ''                                 //哈希值
}
```



### 解析 URL 以执行不同响应

通过事件响应去到不同的响应回调里面

```js
//server.js
var http = require("http");

var events = require('events');
let emitter = new events.EventEmitter();

var router = require('./router');
router.route(emitter); //注册路由

function start() {
  function onRequest(request, response) {
    let url = new URL(request.url, 'http://example.com'); //[input,base]
    let pathname = url.pathname;

    //统计监听某个pathname的数量，>0表示有对应的处理程序
    if (emitter.listenerCount(pathname) > 0) {
      emitter.emit(pathname, request.method, response);
    }
    else {
      emitter.emit('404', request.method, pathname, response);
    }

  }

  http.createServer(onRequest).listen(8888);
  console.log("Server has started.");
}

start();
```

需要将事件对象传给路由，这样才能监听到

```js
//router.js
function route(emitter) {
    emitter.on('/test', returnHelloworld);
    emitter.on('404', notFound)
}

function returnHelloworld(method, response){
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write("Hello World");
    response.end();
}

function notFound(method, pathname, response){
    response.writeHead(404, {'Content-Type': 'text/plain'});
    response.write(`${pathname} is not found`);
    response.end();
}

exports.route = route;
```



## node 网络请求处理

GET 请求的内容就包含在了 URL 中（GET 没有 body）

POST 数据在 body 里面

```js
function receiveData(method, request, response){
    if(method == 'POST'){
        let data = [];
        request.on('data', (chunk)=>{
            data.push(chunk);
        })
        request.on('end', ()=>{
            let buffer = Buffer.concat(data);
            console.log(buffer.toString());

            response.writeHead(200);
            response.end();
        })
    }
}
```

**对于传上来的大文件需要使用Stream流**

+ ==request 是 Stream 的子类==

```js
function sendData(method, request, response) {
    if (method == 'POST') {
        const writeStream = fs.createWriteStream('./big_file.txt');
        request.pipe(writeStream);

        response.writeHead(200);
        response.end();
    }
}
```

### 跨域

http 模块直接设置跨域：

```js
response.setHeader("Access-Control-Allow-Origin","*");
```





## Buffer(缓冲区)

JavaScript 语言自身只有字符串数据类型，没有二进制数据类型。

但在处理像TCP流或文件流时，必须使用到二进制数据。因此在 Node.js中，定义了一个 Buffer 类，该类用来创建一个专门存放二进制数据的缓存区。

```
*在v6.0之前创建Buffer对象直接使用new Buffer()构造函数来创建对象实例，但是Buffer对内存的权限操作相比很大，可以直接捕获一些敏感信息，所以在v6.0以后，官方文档里面建议使用* **Buffer.from()** *接口去创建Buffer对象。*
```

现在 Buffer 可以直接在全局对象下引用到

```js
// 创建长度为 10 的以零填充的缓冲区。
const buf1 = Buffer.alloc(10);

// 创建长度为 10 的缓冲区，
// 使用值为 `1` 的字节填充。
const buf2 = Buffer.alloc(10, 1);

// 创建长度为 10 的未初始化的缓冲区。
// 这比调用 Buffer.alloc() 快，
// 但返回的缓冲区实例可能包含旧数据，
// 需要使用 fill()、write() 、
// 或其他填充缓冲区内容的函数重写。
const buf3 = Buffer.allocUnsafe(10);

// 创建包含字节 [1, 2, 3] 的缓冲区。
const buf4 = Buffer.from([1, 2, 3]);

// 创建包含字节 [1, 1, 1, 1] 的缓冲区，
// 所有条目都使用 `(value & 255)` 截断以符合范围 0–255。
const buf5 = Buffer.from([257, 257.5, -255, '1']);

// 创建包含字符串 'tést' 的 UTF-8 编码字节的缓冲区：
// [0x74, 0xc3, 0xa9, 0x73, 0x74]（十六进制）
// [116, 195, 169, 115, 116]（十进制）
const buf6 = Buffer.from('tést');

// 创建包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的缓冲区。
const buf7 = Buffer.from('tést', 'latin1');
```



### Buffer 与字符编码

当在 `Buffer` 和字符串之间进行转换时，可以指定字符编码。 如果未指定字符编码，则==默认使用 UTF-8==。

```js
import { Buffer } from 'node:buffer';

const buf = Buffer.from('hello world', 'utf8');

console.log(buf.toString('hex'));
// 打印: 68656c6c6f20776f726c64
console.log(buf.toString('base64'));
// 打印: aGVsbG8gd29ybGQ=

console.log(Buffer.from('fhqwhgads', 'utf8'));
// 打印: <Buffer 66 68 71 77 68 67 61 64 73>
console.log(Buffer.from('fhqwhgads', 'utf16le'));
// 打印: <Buffer 66 00 68 00 71 00 77 00 68 00 67 00 61 00 64 00 73 00>
```

注：缓冲区接受它们接收到的编码字符串的所有大小写变体。 例如，UTF-8 可以指定为 `'utf8'`、`'UTF8'` 或 `'uTf8'`。



Node.js 目前支持的字符编码如下：

- `'utf8'`（别名：`'utf-8'`）：多字节编码的 Unicode 字符。 许多网页和其他文档格式使用 [UTF-8](http://url.nodejs.cn/mzW5jo)。 这是默认的字符编码。 当将 `Buffer` 解码为不完全包含有效 UTF-8 数据的字符串时，则 Unicode 替换字符 `U+FFFD` � 将用于表示这些错误。
- `'utf16le'`（别名：`'utf-16le'`）：多字节编码的 Unicode 字符。 与 `'utf8'` 不同，字符串中的每个字符都将使用 2 或 4 个字节进行编码。 Node.js 仅支持 [UTF-16](http://url.nodejs.cn/CJHzJq) 的[小端序](http://url.nodejs.cn/HY3tVp)变体。
- `'latin1'`: Latin-1 代表 [ISO-8859-1](http://url.nodejs.cn/z8AaDs)。 此字符编码仅支持 `U+0000` 至 `U+00FF` 的 Unicode 字符。 每个字符都使用单个字节进行编码。 不符合该范围的字符将被截断并映射到该范围内的字符。

使用以上编码之一将 `Buffer` 转换为字符串称为解码，将字符串转换为 `Buffer` 称为编码。

Node.js 还支持以下二进制转文本的编码。 对于二进制转文本的编码，命名约定是相反的：将 `Buffer` 转换为字符串通常称为编码，将字符串转换为 `Buffer` 通常称为解码。

- `'base64'`: [Base64](http://url.nodejs.cn/fum2xU) 编码。 当从字符串创建 `Buffer` 时，此编码还将正确接受 [RFC 4648，第 5 节](http://url.nodejs.cn/j8aS4R)中指定的 "URL 和文件名安全字母表"。 base64 编码的字符串中包含的空白字符（例如空格、制表符和换行符）会被忽略。
- `'base64url'`: [base64url](http://url.nodejs.cn/j8aS4R) 编码如 [RFC 4648 第 5 节](http://url.nodejs.cn/j8aS4R)中指定。 当从字符串创建 `Buffer` 时，此编码也将正确接受常规的 base64 编码的字符串。 当将 `Buffer` 编码为字符串时，此编码将忽略填充。
- `'hex'`: 将每个字节编码为两个十六进制字符。 当解码不完全由偶数个十六进制字符组成的字符串时，可能会发生数据截断。 请参阅下面的示例。

还支持以下旧版字符编码：

- `'ascii'`: 仅适用于 7 位 [ASCII](http://url.nodejs.cn/pLT1D9) 数据。 当将字符串编码为 `Buffer` 时，这等效于使用 `'latin1'`。 当将 `Buffer` 解码为字符串时，使用此编码将在解码为 `'latin1'` 之前额外取消设置每个字节的最高位。 通常，没有理由使用此编码，因为在编码或解码纯 ASCII 文本时，`'utf8'`（或者，如果已知数据始终是纯 ASCII，则为 `'latin1'`）将是更好的选择。 它仅用于旧版兼容性。
- `'binary'`: `'latin1'` 的别名。 有关此主题的更多背景信息，请参阅[二进制字符串](http://url.nodejs.cn/x5E3Yh)。 此编码的名称很容易让人误解，因为这里列出的所有编码都在字符串和二进制数据之间进行转换。 对于字符串和 `Buffer` 之间的转换，通常 `'utf8'` 是正确的选择。
- `'ucs2'`, `'ucs-2'`: `'utf16le'` 的别名。 UCS-2 过去指的是 UTF-16 的一种变体，它不支持代码点大于 U+FFFF 的字符。 在 Node.js 中，始终支持这些代码点。



### 缓冲区与 TypedArray

`Buffer` 实例也是 JavaScript [`Uint8Array`](http://url.nodejs.cn/ZbDkpm) 和 [`TypedArray`](http://url.nodejs.cn/oh3CkV) 实例。 所有 [`TypedArray`](http://url.nodejs.cn/oh3CkV) 方法都可在 `Buffer` 上使用。 但是，`Buffer` API 和 [`TypedArray`](http://url.nodejs.cn/oh3CkV) API 之间存在细微的不兼容。

注意：

- [`TypedArray.prototype.slice()`](http://url.nodejs.cn/22j33F) 创建 `TypedArray` 部分的副本，而 [`Buffer.prototype.slice()`](http://nodejs.cn/api-v16/buffer.html#bufslicestart-end) 在现有 `Buffer` 上创建视图而不进行复制。 这种行为可能会有意外，并且仅存在于旧版兼容性中。 [`TypedArray.prototype.subarray()`](http://url.nodejs.cn/tNCCFf) 可用于在 `Buffer` 和其他 `TypedArray` 上实现 [`Buffer.prototype.slice()`](http://nodejs.cn/api-v16/buffer.html#bufslicestart-end) 的行为，且应该是首选。
- [`buf.toString()`](http://nodejs.cn/api-v16/buffer.html#buftostringencoding-start-end) 与其对应的 `TypedArray` 不兼容。
- 多种方法，例如 [`buf.indexOf()`](http://nodejs.cn/api-v16/buffer.html#bufindexofvalue-byteoffset-encoding)，支持额外的参数。



有两种方式可以从 `Buffer` 创建新的 [`TypedArray`](http://url.nodejs.cn/oh3CkV) 实例：

1. 将 `Buffer` 传给 [`TypedArray`](http://url.nodejs.cn/oh3CkV) 构造函数将复制 `Buffer` 的内容，解释为整数数组，而不是目标类型的字节序列。

```js
import { Buffer } from 'node:buffer';

const buf = Buffer.from([1, 2, 3, 4]);
const uint32array = new Uint32Array(buf);

console.log(uint32array);

// 打印: Uint32Array(4) [ 1, 2, 3, 4 ]
```

2. 传入 [`ArrayBuffer`](http://url.nodejs.cn/mUbfvF) 底层的 `Buffer` 将创建与 `Buffer` 共享其内存的 [`TypedArray`](http://url.nodejs.cn/oh3CkV)。

```js
import { Buffer } from 'node:buffer';

const buf = Buffer.from('hello', 'utf16le');
const uint16array = new Uint16Array(
  buf.buffer,
  buf.byteOffset,
  buf.length / Uint16Array.BYTES_PER_ELEMENT);

console.log(uint16array);

// 打印: Uint16Array(5) [ 104, 101, 108, 108, 111 ]
```

通过以相同的方式使用 `TypedArray` 对象的 `.buffer` 属性，可以创建与 [`TypedArray`](http://url.nodejs.cn/oh3CkV) 实例==共享相同分配内存==的新 `Buffer`。 [`Buffer.from()`](http://nodejs.cn/api-v16/buffer.html#static-method-bufferfromarraybuffer-byteoffset-length) 在这种情况下表现得像 `new Uint8Array()`。

```js
import { Buffer } from 'node:buffer';

const arr = new Uint16Array(2);

arr[0] = 5000;
arr[1] = 4000;

// 复制 `arr` 的内容。
const buf1 = Buffer.from(arr);

// 与 `arr` 共享内存。
const buf2 = Buffer.from(arr.buffer);

console.log(buf1);
// 打印: <Buffer 88 a0>
console.log(buf2);
// 打印: <Buffer 88 13 a0 0f>

arr[1] = 6000;

console.log(buf1);
// 打印: <Buffer 88 a0>
console.log(buf2);
// 打印: <Buffer 88 13 70 17>
```

#### 截取

使用 [`TypedArray`](http://url.nodejs.cn/oh3CkV) 的 `.buffer` 创建 `Buffer` 时，可以通过传入 `byteOffset` 和 `length` 参数仅使用底层 [`ArrayBuffer`](http://url.nodejs.cn/mUbfvF) 的一部分。

```js
import { Buffer } from 'node:buffer';

const arr = new Uint16Array(20);
const buf = Buffer.from(arr.buffer, 0, 16);

console.log(buf.length);
// 打印: 16
```



### Blob 类

[`Blob`](http://url.nodejs.cn/HjfML1) 封装了不可变的原始数据，可以在多个工作线程之间安全地共享。

`new buffer.Blob([sources[, options]])`

+ sources：buffer相关的类，作为内容传入

+ options：

  + endings：指定行尾

    `'transparent'` 或 `'native'` 之一。 当设置为 `'native'` 时，字符串源部分中的行尾将转换为 `require('node:os').EOL` 指定的平台原生的行尾。

  + Blob 内容类型。 目的是让 `type` 传达数据的 MIME 媒体类型，但不执行类型格式的验证。

这个就和前端的 Blob 类一致

 

### 操作Buff

#### 写入缓冲区

```js
buf.write(string[, offset[, length]][, encoding])
```

- **string** - 写入缓冲区的字符串。
- **offset** - 缓冲区开始写入的索引值，默认为 0 。
- **length** - 写入的字节数，默认为 buffer.length
- **encoding** - 使用的编码。默认为 'utf8' 。

**返回值**

返回实际写入的大小。如果 buffer 空间不足， 则只会写入部分字符串。

#### 从缓冲区读取数据

```js
buf.toString([encoding[, start[, end]]])
```

- **encoding** - 使用的编码。默认为 'utf8' 。
- **start** - 指定开始读取的索引位置，默认为 0。
- **end** - 结束位置，默认为缓冲区的末尾。

#### 将Blob转换为JSON

```js
buf.toJSON()
```

```js
const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
const json = JSON.stringify(buf);

// 输出: {"type":"Buffer","data":[1,2,3,4,5]}
console.log(json);

const copy = JSON.parse(json, (key, value) => {
  return value && value.type === 'Buffer' ?
    Buffer.from(value.data) :
    value;
});

// 输出: <Buffer 01 02 03 04 05>
console.log(copy);
```

#### 缓冲区合并

```js
Buffer.concat(list[, totalLength])
```

- **list** - 用于合并的 Buffer 对象数组列表。
- **totalLength** - 指定合并后Buffer对象的总长度。

```js
var buffer1 = Buffer.from(('菜鸟教程'));
var buffer2 = Buffer.from(('www.runoob.com'));
var buffer3 = Buffer.concat([buffer1,buffer2]);
console.log("buffer3 内容: " + buffer3.toString());
//buffer3 内容: 菜鸟教程www.runoob.com
```

#### 缓冲区比较

```js
buf.compare(otherBuffer);
```

#### 拷贝缓冲区

```js
buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])
```

#### 缓冲区裁剪

```js
buf.slice([start[, end]])
```

注意：在TypedArray要使用`TypedArray.prototype.subarray()`

==裁剪功能返回的实际是原始缓存区 buffer 或者一部分，操作的是与原始 buffer 同一块内存区域。==



## File 文件操作

`node:fs` 模块能够以标准 POSIX 函数为模型的方式与文件系统进行交互。

其中有几套 API：

+ 基于 Promise
+ 基于回调
+ 同步

### 文件操作

```js
fs.readFile('file', (error, data)=>{
});
//对应同步方法
const data=fs.readFileSync(filePath,'utf8');

fs.writeFile('file', data[, options], (error, data)=>{
});
fs.writeFileSync('file', data[, options])；

//向后追加。与write的区别就是[options]的flag默认值是”a”，所以它以追加方式写入数据.
fs.appendFile(filename, data, [options], (error, data)=>{
})；
fs.appendFileSync(filePath, '同步追加一条新数据程序员成长指北789');

//拷贝文件
fs.copyFile(filenameA, filenameB，callback)
fs.copyFileSync(filePath, filePath1);

//删除文件
fs.unlink(filePath,function(err){
	if(err) return;
});
fs.unlinkSync(filePath,function(err){
    if(err) return;
});
```

- options
  - `encoding`**默认值:** `'utf8'`
  - `mode` **默认值:** `0o666`权限位
  - `flag`  请参阅[对文件系统 `flags` 的支持](http://nodejs.cn/api-v16/fs.html#file-system-flags)。 **默认值:** `'w'`。操作方式
  - `signal` 允许中止正在进行的写入文件

flag：

- r：读取
- w：写入
- s：同步
- +：增加相反操作
- x：排他方式

`r+ 和 w+ 的区别，当文件不存在时，r+ 不会创建文件，而会抛出异常，但 w+ 会创建文件；如果文件存在，r+ 不会自动清空文件，但 w+ 会自动把已有文件的内容清空。`



#### Promise API

用 fs 模块里的 promises 里的 readFile 和 writeFile 来读写文件

==相关 API 都在`fs.promises`中==

```js
var fs = require("fs");
let fsPromise = fs.promises;

//读文件
async function read(){
    fsPromise.readFile('./head.png').then((data)=>{
        console.log(data);
    }, (rejectMsg)=>{
        console.log(rejectMsg);
    })；
}

//写文件
async function write(){
    fsPromise.writeFile('./test.txt', '哈哈哈').then(()=>{
        //成功，没有返回值
    }, (rejectMsg)=>{
        console.log(rejectMsg);
    })
}
```



#### 指定位置读写文件操作(高级文件操作)

接下来的高级文件操作会与上面有些不同，流程稍微复杂一些，要先用`fs.open`来打开文件，然后才可以用`fs.read`去读，或者用`fs.write`去写文件，最后，你需要用`fs.close`去关掉文件。

`特殊说明：read 方法与 readFile 不同，一般针对于文件太大，无法一次性读取全部内容到缓存中或文件大小未知的情况，都是多次读取到 Buffer 中。`

```js
//打开文件
fs.open(path,flags,[mode],callback)
fs.open('test.txt','r','0666',function(err,fd){
    console.log('哈哈哈',fd); //返回的第二个参数为一个整数，表示打开文件返回的文件描述符，window中又称文件句柄
    
    
    //关闭文件
    fs.close(fd,callback)； 
})；
```

+ 文件读取-fs.read

  ```js
  fs.read(fd, buffer, offset, length, position, (err, bytesRead, buffer)=>{});//bytesRead为实际读取的字节数
  ```

  + buffer：要将内容读取到的 Buffer
  + offset：整数，向 Buffer 缓存区写入的初始位置，以字节为单位；
  + length：整数，读取文件的长度；
  + position：整数，读取文件初始位置；文件大小以字节为单位

+ 文件写入-fs.write

  ```js
  fs.write(fd, buffer, offset, length, position, (err, bytesWritten, buffer)=>{});//bytesWritten为实际写入的字节数
  ```

  + buffer：存储将要写入文件数据的 Buffer
  + offset：整数，从 Buffer 缓存区读取数据的初始位置，以字节为单位；
  + length：整数，读取 Buffer 数据的字节数；
  + position：整数，写入文件初始位置；



### 目录(文件夹)操作

1. fs.mkdir 创建目录

   ```js
   fs.mkdir(path, [options], (err)=>{})
   ```

   + 第一个参数：path 目录路径
   + 第二个参数[options]，recursive  默认值: false。 mode  Windows 上不支持。默认值: 0o777。 可选的 options 参数可以是指定模式（权限和粘滞位）的整数，也可以是具有 mode 属性和 recursive 属性（指示是否应创建父文件夹）的对象。
   + 第三个参数回调函数,回调函数有一个参数 err（错误），关闭文件后执行。

   ==注意： 在 Windows 上，在根目录上使用 fs.mkdir() （即使使用递归参数）也会导致错误==

2. fs.rmdir删除目录

   ```js
   fs.rmdir(path,(err)=>{})
   ```

3. fs.readdir读取目录

   ```js
   fs.readdir(path, [options], (err, data)=>{})
   ```

   第三个参数回调函数,回调函数有两个参数，第一个 err（错误），第二个返回 的data 为一个数组，包含该文件夹的所有文件，是目录中的文件名的数组（不包括 `'.'` 和 `'..'`）。



### 文件拷贝

文件拷贝例子包括小文件拷贝和大文件拷贝(之前讲的 fs 模块也可以实现文件拷贝)

#### 小文件拷贝

小文件拷贝除了上面 fs 自己提供的 api 我们自己也可以通过读写完成一个拷贝例子，如下：

```js
//fs api
fs.copyFile(filenameA, filenameB，callback)

//自己实现：
//直接将文件内容读出来然后写入另一个文件就完了
```

#### 大文件拷贝

如果是一个大文件几百M一次性读取写入不现实，所以需要多次读取多次写入

最好是使用 Stream 模块

```js
var fs = require("fs");

const readStream = fs.createReadStream('big_file.txt');
readStream.setEncoding('utf-8');

const writeStream = fs.createWriteStream('big_file_sub.txt');

readStream.pipe(writeStream);
```

每从可读流中读出一块就写入一块



## Stream 流

Stream 是一个==抽象接口==，Node 中有很多对象实现了这个接口。例如，对 http 服务器发起请求的 request 对象就是一个 Stream，还有`process.stdout`（标准输出）。

Node.js，Stream 有四种流类型：

- **Readable** - 可读操作。
- **Writable** - 可写操作。
- **Duplex** - 可读可写操作.
- **Transform** - 操作被写入数据，然后读出结果。

所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：

- **data** - 当有数据可读时触发。
- **end** - 没有更多的数据可读时触发。
- **error** - 在接收和写入过程中发生错误时触发。
- **finish** - 所有数据已被写入到底层系统时触发。

==流操作适用于对大型文件进行操作==

### 读取流

`fs.createReadStream('file')`

```js
var fs = require("fs");
var data = '';

// 创建可读流
var readerStream = fs.createReadStream('big_file.txt');

// 设置编码为 utf8。
readerStream.setEncoding('UTF8');

// 处理流事件 --> data, end, and error
readerStream.on('data', function(chunk) {
   data +=chunk;
});

readerStream.on('end',function(){
   console.log(data);
});

readerStream.on('error', function(err){
   console.log(err.stack);
});

console.log("程序执行完毕");
```

流操作是通过异步函数回调来实现的，`data`事件会将流以合适的大小截取，`end`表示读取结束



**使用流来读取并网络返回请求**

创建一个可读流 `createReadStream`， 再把文件 `stream` 和 `response stream` 通过管道 `pipe` 相连。

```js
var fs = require("fs");

function route(emitter) {
    emitter.on('/bigText', getBigText);
}

function getBigText(method, response){
    const stream = fs.createReadStream('big_file.txt');
    stream.setEncoding('utf-8');
    response.writeHead(200, {'Content-Type': 'text/plain;charset=UTF-8'}); //设置文件响应头编码
	stream.pipe(response); //将文件 stream 和 response stream 通过管道 pipe 相连。
}

exports.route = route;
```

这里我们以流式发送了大文件，为了保持流式传输的优势，需要在前端也使用流来解析



### 写入流

`fs.createWriteStream('file')`

```js
var fs = require("fs");

var writerStream = fs.createWriteStream('output.txt');
// 使用 utf8 编码写入数据
writerStream.write(data,'UTF8');
// 标记文件末尾
writerStream.end();

// 处理流事件 --> finish、error
writerStream.on('finish', function() {
    console.log("写入完成。");
});

writerStream.on('error', function(err){
   console.log(err.stack);
});
```



### 管道流

管道提供了一个输出流到输入流的机制。通常我们用于从一个流中获取数据并将数据传递到另外一个流中。

实现大文件复制：

```js
var fs = require("fs");

// 创建一个可读流
var readerStream = fs.createReadStream('input.txt');

// 创建一个可写流
var writerStream = fs.createWriteStream('output.txt');

// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.pipe(writerStream);

console.log("程序执行完毕");
```



#### 链式流

通过多个管道，对流进行处理

如：将文件进行压缩或解压

```js
var fs = require("fs");
var zlib = require('zlib');

// 解压 input.txt.gz 文件为 input.txt
fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('input.txt'));
  
console.log("文件解压完成。");
```



