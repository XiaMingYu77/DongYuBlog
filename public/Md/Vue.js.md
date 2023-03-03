# Vue.js

 基本使用：安装就自己上网查吧，先安Node.js（包含了 NPM）然后设置NPM的国内镜像，最后安装 Vue CLI

**创建项目：**在要创建项目的文件夹下启动 cmd，输入命令 `vue ui` 打开可视化工具界面

![image-20220919095103127](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209190951201.png)

可视化界面里面的操作就弱智都会弄了

![image-20220919100002985](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209191000013.png) 

+ src 目录时存储项目代码的目录：

  + assets：静态文件，如一些图片、JSON 数据等

  + components：放置 Vue.js 公共组件

  + App.vue：页面入口文件（也是根文件，整个应用只有一个），可以引用其他 Vue.js 组件

  + main.js：程序入口文件，主要作用是初始化 Vue.js 应用实例并使用需要的插件

+ public 目录，该目录在以下情况下使用

  + 需要在构建输出中指定一个文件的名字
  + 有上千张图片需要动态引用它们的路径
  + 有些库可能和 webpack 不兼容，将这些库存储在 public 目录下，然后将其用一个独立的 \<script> 标签引入

+ node_modules 目录

  存放利用包管理工具下载安装的包的文件夹

  

## 基础

开发 vue.js 应用时我们强烈建议使用 TypeScript，它的特性更为强大，可以轻易地面向对象编程（即使也能够用 Js 进行开发）

### 启用 TypeScript

在应用的根目录下执行以下命令

`vue add typescript`

也可以在使用 Manually select features 创建项目时选择支持 TypeScript

#### 编译与运行 TypeScript 代码

编译：`tsc [文件名]`

运行：`node [编译得到的js文件]`



### Vite 针对传统浏览器设置

通过 Vite 智能调用 Babel 中的方法来构架代码

@vitejs/plugin-legacy插件

`npm i @vitejs/plugin-legacy`

还要安装 `npm add -D terser`

vite 的 polyfill 分为 `modern polyfill`(modernPolyfills属性)和 `legacy polyfill`(polyfills属性)，之所以区分开来，是为了尽量减少polyfills的大小

+ `modernPolyfills`是针对现代浏览器的polyfill，比如，我们可以设置

  ```js
  legacy({
    renderLegacyChunks: false, //如果设置为true的话，vite 会根据打包代码，使用 babel
    modernPolyfills: ['es.global-this'],
  }),
  ```

+ `polyfills`是针对传统浏览器的polyfill

  ```js
  legacy({
    renderLegacyChunks: true,
    polyfills: ['es.global-this'],
  }),
  ```

  ==legacyPolyfil 跟 modernPolyfill 的功能是一样的==

==可以直接设置 targets 来完成如上配置==（`browserslist`这个工具是用来指定浏览器范围的工具）

```js
//完全设置：
// vite.config.ts
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    legacy({
      // 设置目标浏览器，browserslist 配置语法
      targets: ['ie >= 11'],
    }),
  ],
});
```

browserslist 查询： https://browsersl.ist/

可以查对应的用户量、可以分地区啥的非常方便





### 创建 Vue.js 项目

在要创建项目的文件夹中运行下面的命令（使用 vite）

`npm create vite@latest`

在后面的选项中注意：`Use ESLint to lint your code? No    //不开启ESLint语法检测 注意选No`

其他的看着来就行，Ts 支持要 yes

cd 到文件内，执行`npm install`等待安装完成

运行`npm run dev`就可以在浏览器调试了

#### 移动端调试

有的人可能要问了，如果我做移动端项目，不能用localhost去访问了吧？当然不能，只需要稍微改一下配置即可。当然，端口号8080一样可以修改，不过一般不做变动。  

用代码工具（自己习惯的IDE）打开本项目。首先查看本机电脑ip,键入命令 `ipconfig`，查看如下：

```javascript
E:\stydy\blog>ipconfig
* *
* *
以太网适配器 以太网:

   连接特定的 DNS 后缀 . . . . . . . :
   本地链接 IPv6 地址. . . . . . . . : fe80::da7:800d:d148:e06%10
   IPv4 地址 . . . . . . . . . . . . : 192.168.200.127
   子网掩码  . . . . . . . . . . . . : 255.255.255.0
   默认网关. . . . . . . . . . . . . : fe80::48:5112:9520:564f%10
                                       192.168.200.1
```

其中， `IPv4地址`即为我们所需要的ip。在 `项目/config/index.js`中，找到 `host:'localhost'`，改成 `IPv4地址`，例:我的地址为 `192.168.200.127`:

```javascript
module.exports = {
  dev: {
    host: '192.168.200.127',     //localhost改为ip
    port: 8080,        //端口号
  }
}
```

然后，我们重新启动项目。注意上次项目启动后，由于修改了配置文件，因此需要停止项目然后重新启动。停止项目的命令为 `Ctrl+C`。重启项目后，如下：

```javascript
E:\stydy\blog>npm run dev
* * * * * * * *
* 启 动 过 程 *
* * * * * * * *
Your application is running here: http://192.168.200.127:8080
```

 注意要在同一网络下  最后，我们复制该地址，即可在所有端 `PC`、 `手机`、 `pad等`查看该项目啦

#### 覆盖默认样式

默认样式在 main.ts 文件中指定

```ts
import './assets/global.css'
```

我们可以在 assets 目录下新建 css 文档然后自己写默认样式（作用在 #app 元素上 ）



### TypeScript 基础

TypeScript 是以 Js 为目标语言的一种编译语言，并且提供了向原生 JavaScript 转换的编译器（TypeScript -> JavaScript -> 可被浏览器运行）

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209191302204.png" alt="image-20220919130250084" style="zoom: 33%;" />

**使用 TypeScript 的优势**：

+ TypeScript 充分利用了 Js 原有的对象模型，并在此基础上进行了扩充，==添加了较为严格的类型检查机制==、模块支持和 API 导出的能力
+ TypeScript 既使得代码组织和复用变得更加有序，又使得开发大型 Web 应用有了一套标准方法
+ TypeScript 具有静态类型检查、代码重构、测试和语言服务等特性，有利于大型团队人员协作编写代码





#### 变量

TypeScript 中仍然使用 var、let、const 来声明变量，它们的区别在这里就不再赘述

需要注意的是 var 的变量提升会对项目产生无法预计的影响

```typescript
var x = 1;
let y = 1
{
    var x = 2;
    let y = 2;
}
console.log(x); //2
console.log(y); //1
```



#### 数据类型

基本类型包括 Number、Boolean、String、Symbol、Void、Null、Undefined、用户定义的枚举类型

它也像 JS 一样会根据字面量来推断类型

```typescript
let y = 0; //等价于 y: number = 0;
```

Void 类型：如果函数不需要返回值则使用该属性，关键字 "void" 表示 Void 属性，表示默认值。该类型的值是 null 和 undefined

Undefined 和 Null 类型都无法直接引用（可以给变量赋值 null 和 undefined）



##### TypeScript 类型特性

```ts
class Foo {
  method(input: string): number { ... }
}

class Bar {
  method(input: string): number { ... }
}

const foo: Foo = new Foo(); // Okay.
const bar: Bar = new Foo(); // Okay.
```

没有任何错误发生。究其原因，TypeScript 比较的并不是类型定义本身，而是类型定义的形状（Shape），即各种约束条件

当我们实例化一个`Foo`对象然后将其赋值给一个`Bar`类型的变量时，TypeScript 检查发现该实例上具有`Bar`类型需要的所有约束条件，即一个名为`method`的接受一个`string`参数并返回一个`number`的方法（`method(input: string): number`），所以不会有任何报错。



*这样做的好处是什么呢？一个好处是和 JavaScript 一脉相承。众所周知，JavaScript 是一门动态脚本语言，[Duck Typing](https://link.zhihu.com/?target=https%3A//en.wikipedia.org/wiki/Duck_typing)（鸭子类型）应用广泛。一个典型等实例是 Iterable，它并不要求像 C++ 一样要求实例必须继承于某个父类或者像 Java 一样要求实例实现某个 `Interface`，它只检查当前的对象是否实现了`@@iterator`方法。TypeScript 对症下药，接地气地采用了 Structure Type System 来为 JavaScript 量身定制一套灵活的类型系统。*



所以如果我们将 TypeScript 中的类型合并，你会发现合并出来的类型可以适配任何一个合成它的来源，类型



##### 自定义类型

对象、函数、数组都能自定义类型

```ts
//type (类型别名)，顾名思义，类型别名只是给类型起一个新名字。它并不是一个类型，只是一个别名而已
type A = {};
type func = ()=>number;
type arr = string[];
```

与 interface 的使用：使用交集类型实现扩展

```ts
interface get {
  get:()=>string;
}
type A = get & {
  id:string
};

let a:A = {
  id:'a',
  get(){
    return this.id;
  }
}
```





##### 任意类型

还记得我们说过 TypeScript 会有严格的类型检查吗，但是有时候需要描述 “在编写时还不知道” 的变量类型。

这些不清楚类型的值可能来源于动态内容（如用户或第三方库）。在这些情况下可以==退出类型检查==

1. **用 any 表示任意类型**

   ```typescript
   let notSure: any = 4;
   notSure = "也许是字符串";
   notSure = false;
   console.log(notSure);
   ```

   这种特性实际上来源于 JavaScript，使用的时候就当成 Js 的用法就行了

2. **用 Object 表示任意类型**

   ```typescript
   let notSure: any = 4;
   notSure.ifItExists();  //编译时不会有任何问题
   notSure.toFixed();
   
   let prettySure: Object = 4;
   prettySure.toFixed();  //错误，Object类型中没有该方法
   ```

   ==对象类型只是允许了任意值，但是无法使用对应方法==，这点在 Java 的向上转型中也是一样的情况

##### 联合类型

可以将变量设置为几种类型

```typescript
let x: string | number;
x = 'hello';
x = 42;
```

##### 交集类型

交集类型是将多种类型叠加在一起的一种新类型，新类型包含了被叠加类型的特性

![image-20220919150321887](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209191503931.png)

```ts
interface A {
    a: number
}

interface B {
    b: number
}

let ab: A&B = {a:1, b:2};
let a: A = ab;
let b: B = ab;
```

合成出来的类型属于它任意一种合成它的子类



#### 函数以及 this

##### 函数类型

别忘了，Ts的类型推断是看内容定的，所以设定类型的时候不用费尽心思去构造类型

此外，对于函数返回值，Ts会根据类型推断自动补全（指定返回类型可以让ts提示我们忘记返回值了）

```ts
function add(x: number, y: number): number {
    return x + y;
}

let myAdd = function(x: number, y: number): number { return x + y; };
```

##### 完整函数类型

```ts
let myAdd: (x:number, y:number) => number =
    function(x: number, y: number): number { return x + y; };
```

##### 可选参数

```ts
function add(x: number, y?: number) {
  return typeof y == 'undefined' ? x : x + y;
}

add(1);
```

##### 在TS函数中this以及this的指定

TS是基于js实现的，其this指向也与js相同

+ 普通函数的this指向其调用对象
+ 箭头函数的this在声明时固定下来

==this 类型的指定==：

作为函数的第一个参数传入并指定类型（并不会作为正式的参数）

```ts
class A{
  private id:string='A';

  getA(this:A){
    return this.id;
  }
}
```

在这里体现不了其作用，看下面：函数构造器中返回函数需要用 this 中的内容，此时必须使用箭头函数固定this指向，否则在全局作用域使用时会指向window而不是我们期望的对象

```ts
//最标准写法
interface Card {
    suit: string;
    card: number;
}
interface Deck {
    suits: string[];
    cards: number[];
    createCardPicker(this: Deck): () => Card;
}
let deck: Deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    // NOTE: The function now explicitly specifies that its callee must be of type Deck
    createCardPicker: function(this: Deck) { //表明我们期望this为某个Deck对象
        return () => {
            let pickedCard = Math.floor(Math.random() * 52);
            let pickedSuit = Math.floor(pickedCard / 13);

            return {suit: this.suits[pickedSuit], card: pickedCard % 13};
        }
    }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

会自动检测我们可能的出错：

下面使用的是普通函数作为返回值，ts类型检查会发现这个this可能是其他类型（any）所以给我们报错了

![image-20230228165159867](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202302281651942.png)





#### 面向对象

##### 类

1. **定义**

   使用 class 来定义类

   ```ts
   class A {
       greeting: string;
   
       constructor(message: string) {
           this.greeting = message;
       }
   
       greet() {
           return "Hello, " + this.greeting;
       }
   }
   ```

   与 js 类型不同在于这里我们显式设置了类的成员变量 greeting

2. **继承**

   依然使用 extends 关键字

   ```ts
   class Animal {
       name: string;
       constructor(theName: string) {
           this.name = theName;
       }
       move(distanceInMeters: number = 0){
           console.log(`${this.name} moved ${distanceInMeters}m.`);
       }
   }
   
   class Snake extends Animal {
       move(distanceInMeters: number = 5) {
           console.log("Slithering...");
           super.move(distanceInMeters);
       }
   }
   
   let sam = new Snake('Snake Sammy');
   sam.move();
   ```

3. **修饰符**

   你没有看错！TypeScript 是支持使用修饰符的

   + public：默认 public
   + private：类外无法访问
   + protected：只有派生类可以访问

4. **静态属性**

   使用 static 可以声明为静态属性，静态效果和 Java 中一样

5. **抽象类**

   使用 abstract 关键字定义抽象类，和 java 一样抽象类无法直接被实例化

   ```ts
   abstract class AbstractAnimal {
       abstract makeSound(): void; //抽象方法
       move(): void{
           console.log('roaming the earch...');
       }
   }
   ```

   1. 包含一个抽象方法的类必须是抽象类

   2. 抽象类和抽象方法都要用abstract关键字声明

   3. 抽象类方法只需声明不需实现

   4. 抽象类必须被子类继承，子类（如果不是抽象类）必须覆写抽象类中==所有抽象方法==

   抽象类中的普通方法可以不覆写



##### 接口

使用 interface 关键字定义接口，使用 implements 关键字实现接口

```ts
interface ClockInterface {
    currentTime: Date;
}

class Clock implements ClockInterface {
    currentTime: Date;

    constructor() {
        this.currentTime = new Date();
    }
}
```

**接口可以通过继承来扩展**

```ts
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let square: Square = {};
square.color = "blue";
square.sideLength = 10;
console.log(square.color); //blue
```



##### 泛型

之前我们介绍了使用 any 来接收任何类型，但是使用 any 会丢失一些信息，而且如果是在方法内部，我们无法保证传入的参数类型是相同的，并不是很安全

使用泛型就不会失去参数的类型信息了

```TS
function identity<T>(arg: T): T {
    return arg;
}
function identity<T>(arg: T): T {
    return arg;
}

let output = identity<string>("I`m a String.");
```

使用方式和 Java 的泛型一致

**类型传导**

TypeScript 存在着类型传递的特性，所以就能这么玩：

```ts
function identity<T>(arg: T): T {
    return arg;
}

let output = identity("I`m a String.");
```

（java 也能这样用的）



##### 枚举

枚举类型通过 enum 关键字来定义

```
enum Direction{
    Up = 1,
    Down = 2,
    Left = 3,
    Right = 4
}
```

```ts
enum Day {
   SUNDAY,
   MONDAY,
   TUESDAY,
   WEDNESDAY,
   THURSDAY,
   FRIDAY,
   SATURDAY
}
//下面的和上面的等价
enum Day {
   SUNDAY = 0,
   MONDAY = 1,
   TUESDAY = 2,
   WEDNESDAY = 3,
   THURSDAY = 4,
   FRIDAY = 5,
   SATURDAY = 6
}
```

+ 默认从 0 开始
+ 设定第一个值后默认之后每一个递增 1
+ 可以分开设置离散的值
+ 枚举成员的值可以由计算得出



#### 命名空间

命名空间可以简单地理解为 java 的包。在 TypeScript 中，使用 namespace 关键字来组织管理代码

##### 声明命名空间

命名空间可以是实例化的，也可以是非实例化的

+ 非实例化的命名空间仅包含接口类型、类型别名已经其他非实例化命名空间的命名空间
+ 实例化的命名空间是不符合此定义的命名空间

*实例化命名空间是为其创建命名空间实例的命名空间，非实例化的命名空间是不为其生成代码的命名空间*



+ 当命名空间标识符被引用为 NamespaceName 时，它表示命名空间和类型名称的容器

+ 当命名空间标识符被引用为 PrimaryExpression 时，表示命名空间的单实例

```ts
namespace M {
    export let a = 1;

    export interface p {
        x: number;
        y: number;
    }
}

let a = 2;
console.log(M.a);  //1 M作为PrimaryExpression

let p: M.p;  //M作为NamespaceName

let m = M;
let q: m.p; //报错了，因为上面定义m时M作为PrimaryExpression，而这里试图将其作为NamespaceName（报错提示为没有这个命名空间）
```

*命名空间是可以进行嵌套的*



##### 导入别名

在导入其他命名空间的实体时可以给它安排别名（避免与本命名空间的命名冲突，也能简化代码）

```ts
namespace A{
    export interface X {s:string}
    export let X: X;
}

namespace B{
    interface A {n:number}
    import Y = A;  //Y作为命名空间A的别名
    import Z = A.X //Z作为A.X的别名
    let v: Z = Z;
}
```



##### 命名空间的合并

命名空间是 "开放式" 的，具有相对于公共根的相同限定名称的命名空间可以被合并为单个命名空间

==注意：由于非导出对象仅在原始命名空间中可见，所以非导出对象是无法进行合并的==



#### TypeScript 模块

在 TypeScript 中，模块有两层含义：

+ 内部模块：命名空间
+ 外部模块：模块

（这与 ECMAScript 2015 中是一致的）

模块部分就和 JavaScript 完全一样

以前 Js 的模块做得不好，Ts 自己实现了一套（require+导出分配）现在 Js 的模块设计已经很好了，没必要使用那个



#### 装饰器

TypeScript 的装饰器就类似于 Java 的注解

==在一些场景下我们需要额外的特性来支持标注或修改类及其成员==

装饰器是一种特殊类型的声明，它能够被附加到`类声明`、`方法`、`属性`或者`参数`上

+ 语法：装饰器使用 `@expression` 这种形式，`expression`求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息做为参数传入

+ 若要启用实验性的装饰器特性，必须`tsconfig.json`里启用`experimentalDecorators`编译器选项

+ 常见的装饰器有: `类装饰器`、`属性装饰器`、`方法装饰器`、`参数装饰器`

+ 装饰器的写法: 分为`普通装饰器(无法传参）`和`装饰器工厂(可以传参)`

```
装饰器（Decorator） 仅提供定义劫持，能够对类及其方法、方法入参、属性的定义
并没有提供任何附加元数据的功能。
主要是为了提供附加的功能
```



**启用装饰器**

装饰器是一个实验性的特性，需要在命令行或 tsconfig.json 中启用 experimentalDecorators 选项

1. 命令行：`tsc --target ES5 --experimentalDecorators`

2. tsconfig.json：

   ```json
   {
      "compilerOptions": {
      "target": "ES5",
      "experimentalDecorators": true
      }
   }
   ```

   

##### 定义装饰器

```tsx
function putAName(target:any){
    target.prototype.name = "屿洺";
}

@putAName
class Me {}

let m = new Me();

console.log(m.name); //屿洺
```

上面实际上使用了类装饰器

**多个装饰器可以应用到一个声明上**

```ts
function putAName(target:any){
    target.prototype.name = "屿洺";
}
function putAnAge(target:any){
    target.prototype.age = 20;
}

@putAName
@putAnAge
class Me {}
```



##### 4 类装饰器

###### 类装饰器

类装饰器声明在类声明之前，作用于类的构造函数上，可用来监视、修改或替换类定义。

*不能用在声明文件（.d.ts ）中，也不能用在任何外部上下文（如 declare 类）中*

+ 运行时被当做函数调用，参数为类的构造函数
+ 可用返回一个值用于替换构造函数

```ts
function sealed(constructor:Function){ //方法封闭一个对象，阻止添加新属性并将所有现有属性标记为不可配置
    Object.seal(constructor);          //本来可以修改的属性之后也能修改
    Object.seal(constructor.prototype);
}

@sealed
class DecoratorGreeter{
    greeting:string;

    constructor(message:string) {
        this.greeting = message;
    }
    
    greet(){
        return "Hello, "+this.greeting;
    }
}
```



###### 方法装饰器

*不能用在声明文件（.d.ts ）中，也不能用在任何外部上下文（如 declare 类）中*

接收 3 个参数：

+ 类的构造函数
+ 成员的名字
+ 成员的属性描述符（这个类型是来源于js`Object.getOwnPropertyDescriptor()`方法）

```ts
function unenumerable(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.enumerable = false;
}


class DecoratorGreeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    @unenumerable
    greet() {
        return "Hello, " + this.greeting;
    }
}
```

可以实现为一个方法装饰器工厂（其他装饰器也能这么操作）

```ts
function enumerable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.enumerable = value;
    }
}


class DecoratorGreeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    @enumerable(false)
    greet() {
        return "Hello, " + this.greeting;
    }
}
```



###### 属性装饰器

*不能用在声明文件（.d.ts ）中，也不能用在任何外部上下文（如 declare 类）中*

接收两个参数：

+ 类构造函数
+ 成员名字

```tsx
function logClass(greeting: string){
    return function (constructor: any, attr: any){
        constructor[attr] = greeting;  //构造函数是实例对象的原型对象
    }
}


class DecoratorGreeter {
    @logClass("屿洺")
    greeting: string;

    constructor() {}

    greet() {
        return "Hello, " + this.greeting;
    }
}

let greeter = new DecoratorGreeter();
console.log(greeter.greet()); //Hello, 屿洺
```



###### 参数装饰器

*不能用在声明文件（.d.ts ）中，也不能用在任何外部上下文（如 declare 类）中*

接收 3 个参数：

+ 类的构造函数
+ 成员名字
+ 参数在函数参数列表中的索引

==注意  参数装饰器只能用来监视一个方法的参数是否被传入==

参数装饰器+方法装饰器+元数据实现必填参数

```ts
import "reflect-metadata";

//使用symbol类型避免重叠
const requiredMetadataKey = Symbol("required");
function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  //Reflect.getOwnMetadata(Key, 目标, 属性名)
  //将其设置为一个数组，里面是通过@required标记的属性索引
  let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || [];
  existingRequiredParameters.push(parameterIndex);
  Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey);
}

function validate(target: any, propertyName: string, descriptor:any) {
  //method保存了原函数引用
  let method:any = descriptor.value;
  //修改函数，之后调用方法就执行这个了
  descriptor.value = function () {
    //获取到必选列表
    let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName);
    if (requiredParameters) {
      for (let parameterIndex of requiredParameters) {
        if (parameterIndex >= arguments.length || arguments[parameterIndex] === undefined) {
          throw new Error("Missing required argument.");
        }
      }
    }
    //执行原函数
    return method.apply(this, arguments);
  }
}

class A{
  @validate
  say(@required id:string){
    console.log('say', id);
  }
}

let a = new A();
a.say("name");
```



#### 元数据

Reflect Metadata 是 ES7 的一个提案，它主要用来在声明的时候添加和读取元数据。TypeScript 在 1.5+ 的版本已经支持它，你只需要：

- `npm i reflect-metadata --save`。

- 在 `tsconfig.json` 里配置 `emitDecoratorMetadata` 选项。

  ```json
  "compilerOptions": {
    "emitDecoratorMetadata": true
  }
  ```

作用：辅助装饰器的使用

各类装饰器可能会在各种类中用于装饰，但是我们没有一个很好的手段来知道我们都设置了哪些、设置在哪里

我们需要一个：对象+属性（可选）+Key去随时能访问到的数据表单

==注意：它会在原型链上去寻找==

##### 操作：

1. 添加元数据/设置元数据

   + **@Reflect.metadata(metadataKey, value)**

     作为装饰器调用，由于装饰器可以获取到目标对象，成员名称（类装饰器）所以仅需要传入 Key 和 value

   + **Reflect.defineMetadata(metadataKey, value, target [, targetKey])**

     作为常规函数调用，这时就得传入所有参数了

2. 获取元数据

   + 看是否有

     **Reflect.hasMetadata(metadataKey, target [, targetKey])** 判断是否有，会在原型链上找

     **Reflect.hasOwnMetadata(metadataKey, target [, targetKey])** 跟`Object.prototype.hasOwnProperty`类似, 是只查找对象上的元数据, 而不会继续想上查找原型链上的, 其余的跟hasMetadata一致

   + 获取值

     **Reflect.getMetadata(metadataKey, target [, targetKey])**

     **Reflect.getOwnMetadata(metadataKey, target [, targetKey])** 不在原型链上继续找

   + 获取键

     **Reflect.getMetadataKeys(target)** 返回该target以及原型链上target的所有元数据的keys

     ​     这里要注意：对于实例成员变量、方法的装饰器它的目标对象是该类的原型对象，其他的是它的构造函数

     **Reflect.getOwnMetadataKeys(target)** 不沿着原型链查找

3. 删除源数据

   **Reflect.deleteMetadata(metadataKey, target [, targetKey])**

4. **design:** 获取声明的一些信息

   ```ts
   @Reflect.metadata('type', 'class')
   class A {
       constructor(public name: string, public age: number) {}
   
       @Reflect.metadata(undefined, undefined)
       method(): boolean {
           return true;
       }
   }
   
   // 获取A的design:paramtypes元数据
   const t1 = Reflect.getMetadata('design:paramtypes', A); // [[Function: String], [Function: Number]]
   // 获取A.prototype上的method属性的design:returntype元数据
   const t2 = Reflect.getMetadata('design:returntype', A.prototype, 'method'); // [Function: Boolean]
   // 获取A.prototype上的method属性的design:type元数据
   const t3 = Reflect.getMetadata('design:type', A.prototype, 'method'); // [Function: Function]
   
   console.log(t1, t2, t3); // [[Function: String], [Function: Number], [Function: Boolean], [Function: Function]]
   ```

   注意：

   + ==没有装饰的target是get不到这些metadata的==
   + 必须==手动指定类型==, 无法进行推断, 比如method方法如果不指定, 返回值为`boolean`, 那么t2将是`undefined`
   + 应用的顺序为: `type → paramtypes → returntype`



#### TS编译（tsconfig.js 设置）

tsconfig.js（调用`tsc --init`，会生成一个 tsconfig.json 文件）

```json
{
  "compilerOptions": {
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and*/ 
    "module": "commonjs",                                /* Specify what module code is generated. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */
    "strict": true,                                      /* Enable all strict type-checking options. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  }
}
```

##### compilerOptions：编译选项配置

**几个常用的编译配置**

+ allowJs：允许编译js文件
+ sourceMap：生成一个.map.js的文件，用于其他工具来debugg，类似于webpack的sourceMap

+ noImplicitAny：不允许用any，如果初学ts，建议项目部太复杂的情况下，可以借此来进行限制，前置自己培养对ts的理解

+ module && target：这两个有一定的关联关系

  target 是编译成哪个版本的 js(es3,es5,es6...)

  module 模板生成的形式，默认情况下，当target是es3的时候，那module默认为commonjs形式，否则为es6形式。

  **注意(和outFile搭配使用)** ：生成的模块形式：none、commonjs、amd、system、umd、es6、es2015 或 esnext 只有 amd 和 system 能和 outFile 一起使用 target 为 es5 或更低时可用 es6 和 es2015

+ lib

  引入ES的功能库，比如想在项目中用js中Set，Map等新的数据结构，或promise等，那要在lib中引入es2015

+ removeComments

  编译出的文件是否带注释，当为false的时候可以减少编译出文件的体积

+ allowSyntheticDefaultImports

  这个配置挺重要的，如果不知道会很纳闷，不好排查为啥会报错

  当它为false的时候,引入模块的时候必须以*as的形式，例如引入react

  ```js
  import * as React from 'react'
  ```

  当为true的时候

  ```js
  import React from 'react'
  ```

  但要注意，他要配合module是esModule的格式或者--esModuleInterop为true的时候，因为react是commonjs写的，并没有default,所以import React from 这种default引入是不对的，具体可以看下这篇文章 [blog.leodots.me/post/40-thi…](https://link.juejin.cn/?target=https%3A%2F%2Fblog.leodots.me%2Fpost%2F40-think-about-allowSyntheticDefaultImports.html)

+ jsx

  如果用tsx文件(React-ts)那么该项要配置成 jsx:"react"

+ baseUrl

  举个例子:

  在根目录的src目录有个hello文件夹，其中hello里包含world.ts

  在根目录的app.ts下

  ```JS
  import { example } from "./src/hello/world"
  //当baseUrl: './src' 可简写为
  import { example } from "hello/world"
  ```

  一般不要去动这个设置

+ paths

  以 baseUrl 为基础

  ![image-20230228231243433](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202302282312493.png) 

  那么将可以这样引入：

  ![image-20230228231610979](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202302282316037.png) 

  ```ts
  import creatRibbon from '@/components/coloredRibbon'
  ```

+ 装饰器与元数据（因为它们还是实验性的代码，所以的单独启用）

  ```json
  "experimentalDecorators": true,  //装饰器
  "emitDecoratorMetadata": true    //元数据
  ```

  

##### 对哪些文件进行编译：files，include，exclude

```json
{
    "compilerOptions": {},
    "files": [], 
    "include": [],
    "exclude": [] 
}
```

+ files：指定某个具体的文件，**适用于比较小型的项目，规定几个特定的文件。**（这个只是指定入口文件，在里面依赖的内容会去编译）

+ 多项目：include + exclude

  ```json
  "include": ["src/**/*"],    // '/**'包含子文件夹，'/*'不包含子文件夹， 这行表示会编译src里面所有的（包括子文件夹的）文件
  "exclude": ["src/except.*"]
  ```

  - include可以和file联用
  - exclude只对include有效，对files无效
  - 如果 files 和 include 都未设置，那么除了 exclude 排除的文件，编译器会默认包含路径下的所有 TS 文件

##### extends

- extends 可以通过指定一个其他的 tsconfig.json 文件路径，来继承这个配置文件里的配置
- 在==原文件里的配置先被加载==，然后被来至继承文件里的配置重写

##### references

**项目引用（Project References）** 功能，可以为项目的不同部分使用不同的 TypeScript 配置

在vue里面具体使用就是为 vite 单独配置（vite 需要运行在 node 环境中，但是其他代码是运行在浏览器环境中的）



### Vue.js 应用实例

main.js / main.ts：程序入口文件，主要作用是初始化 Vue.js 应用实例并使用需要的插件

App.vue：页面入口文件（也是根文件，整个应用只有一个），可以引用其他 Vue.js 组件

在这里我们将简要介绍其使用

下面是自动生成的代码：

```tsx
import { createApp } from 'vue'  //从 vue 模块中引入 createApp 方法
import App from './App.vue'  //从主页面中拿到选项对象

createApp(App).mount('#app'); //.mount()让应用实例挂靠到DOM元素#app中
```

*所有 Vue.js 应用都是从使用 createApp 这个全局 API 创建一个新的应用实例开始的*

被 mount() 挂载的组件会成为渲染的起点。该方法返回的是根组件实例



#### Vue.js 语法迭代

==vue.js 发展到现在，代码逐渐变得越来越简洁，目前最新的内容使用 \<script setup> 标签将代码内容全封装进了 setup 函数中==

+ 在这里面定义的所有顶级变量、方法均会自动暴露给目标使用
+ 在这里引入的组件（import 进来）不再需要声明为组件就能直接使用

```vue
<template>
  <div>
    <HelloWorld></HelloWorld>
    {{x}}
  </div>
</template>

<script setup lang="ts">
import HelloWorld from "@/components/HelloWorld.vue";
let x:number = 10;
</script>
```

**远古写法**

```vue
<template>
  <div>
    <!-- 在html中就能引入子组件的内容 -->
    <HelloWorld></HelloWorld>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue";  //通过import导入后

@Options({                                             //交由components指定其为组件
  components: {
    HelloWorld
  },
})
export default class App extends Vue {}
</script>
```

远古写法中只有在最后面抛出组件用于初始化的代码中能暴露方法、变量出来

*大吐槽！！！你文档都更新那么久了，你书还用远古书是吧！！！我tm书都要读完了*



#### 选项对象

上面的例子中 App就是选项对象，它可以用于配置根组件

我们有各种组件选项对组件进行配置

==选项对象中不要使用箭头函数==，因为箭头函数的 this 指向有问题，而在选项对象中 this 是指向 vm 的（createApp(App).mount('#app')）的返回值



#### 应用实例执行方法

```tsx
createApp(App)
    .component('SearchInput',SearchInputComponent)  //注册组件
    .directive('focus', FocusDirective)             //注册指令
    .use(LocalePlugin)                              //使用插件
```



#### Vue.js 的生命周期（vue2）

![image-20220924131045280](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209241310376.png)

这些生命周期函数可以在相对应的位置被调用

##### 生命周期钩子函数

```vue
<script setup lang="ts">
import {onBeforeMount, onBeforeUnmount, onBeforeUpdate, onMounted, onUnmounted, onUpdated} from "vue";

onBeforeMount(()=>{});
onMounted(()=>{});
onBeforeUpdate(()=>{});
onUpdated(()=>{});
onBeforeUnmount(()=>{});
onUnmounted(()=>{});

</script>
```

详情请见[组合式 API：生命周期钩子 | Vue.js (vuejs.org)](https://cn.vuejs.org/api/composition-api-lifecycle.html)



### 响应式基础

1. 使用 `ref()` 定义响应式变量
2. 使用 [`reactive()`](https://cn.vuejs.org/api/reactivity-core.html#reactive) 函数创建一个响应式对象或数组

响应式对象其实是 [JavaScript Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)，其行为表现与一般对象相似。不同之处在于 Vue 能够跟踪对响应式对象属性的访问与更改操作。



#### ref()

[`ref()`](https://cn.vuejs.org/api/reactivity-core.html#ref) 方法来允许我们创建可以使用任何值类型的响应式 **ref**

+ `ref()` 将传入参数的值包装为一个带 `.value` 属性的 ref 对象：

  ```ts
  const count = ref(0)
  
  console.log(count) // { value: 0 }
  console.log(count.value) // 0
  
  count.value++
  console.log(count.value) // 1
  ```

  ==注意：是去操作它的 value 属性哦==

+ 当值为对象类型时，会用 `reactive()` 自动转换它的 `.value`

  ```ts
  const objectRef = ref({ count: 0 })
  
  // 这是响应式的替换
  objectRef.value = { count: 1 }
  ```

==不用担心在传递过程中的响应丢失问题==

**ref 的自动解包**

+ 当 ref 在模板中作为顶层属性被访问时，它们会被自动“解包”，所以不需要使用 `.value`

+ 当一个 `ref` 被嵌套在一个响应式对象中，作为属性被访问或更改时，它会自动解包，因此会表现得和一般的属性一样：

  ```ts
  const count = ref(0)
  const state = reactive({
    count
  })
  
  console.log(state.count) // 0
  
  state.count = 1
  console.log(count.value) // 1
  ```

##### 为 ref() 标注类型

这个是 ts 专属的

ref 会根据初始化时的值推导其类型：

```ts
import { ref } from 'vue'

// 推导出的类型：Ref<number>
const year = ref(2020)

// => TS Error: Type 'string' is not assignable to type 'number'.
year.value = '2020'
```

有时我们可能想为 ref 内的值指定一个更复杂的类型，可以通过使用 `Ref` 这个类型：

```ts
import { ref } from 'vue'
import type { Ref } from 'vue'

const year: Ref<string | number> = ref('2020')

year.value = 2020 // 成功！
```

或者，在调用 `ref()` 时传入一个泛型参数，来覆盖默认的推导行为：

```ts
// 得到的类型：Ref<string | number>
const year = ref<string | number>('2020')

year.value = 2020 // 成功！
```





#### reactive()

使用 [`reactive()`](https://cn.vuejs.org/api/reactivity-core.html#reactive) 函数创建一个响应式对象或数组

```ts
import { reactive } from 'vue'

const state = reactive({ count: 0 })
```

##### 为 reactive() 标注类型

`reactive()` 也会隐式地从它的参数中推导类型：

```ts
import { reactive } from 'vue'

// 推导得到的类型：{ title: string }
const book = reactive({ title: 'Vue 3 指引' })
```

要显式地标注一个 `reactive` 变量的类型，我们可以使用 type 关键字定义联合类型：（也可以用接口实现）

```ts
import { reactive } from 'vue'

type Book {
  title: string
  year?: number
}

const book: Book = reactive({ title: 'Vue 3 指引', year:2019})
```



#### 取消响应式

1. `toRaw()`方法是把被reactive或readonly后的Proxy对象转换为原来的target对象
2. `markRaw()`则直接让target不能被reactive或readonly。



#### DOM 更新时机

==注意 DOM 的更新并不是同步的。==相反，Vue 将缓冲它们直到更新周期的 “下个时机” 以确保无论你进行了多少次声明更改，每个组件都只需要更新一次。 

因此如果需要使用改变后的 DOM，那么你需要 [nextTick()](https://cn.vuejs.org/api/general.html#nexttick) 这个全局 API：

```ts
import { nextTick } from 'vue'

function increment() {
  state.count++
  nextTick(() => {
    // 访问更新后的 DOM
  })
}
```





### Vue.js 组件

之前我们提到了 App.vue 是根组件，那么我们还能有其他组件

通过 vue 的方式将子组件导入到父组件中，然后子组件的内容就能加入到父组件了

==这里只是很浅地涉及到了组件相关知识，包括上面应用实例里面的知识，后面进阶篇有关于组件注册以及模板中DOM元素获取的相关知识==

子组件：

```vue
<template>
  <button @click="count++">
    You clicked me {{ count }} times.
  </button>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count:any = ref(0); //这个是将对象包装成引用对象
</script>
```

父组件：

```vue
<template>
  <div>
    <HelloWorldVue></HelloWorldVue>
  </div>
</template>

<script setup lang="ts">
import HelloWorldVue from './components/HelloWorld.vue';  //现在组件import进来就能直接用了
</script>
```



#### 组件之间的通信

##### 父组件向子组件通信

父组件通过 props 给子组件传数据

在使用 `<script setup>` 的单文件组件中，props 可以使用 `defineProps()` 宏来声明：

```vue
<script setup lang="ts">
defineProps(['msg']);
</script>

<template>
  <div>{{msg}}</div>
</template>

<style scoped>
</style>
```

```vue
<template>
  <div>
    <HelloWorld msg="HelloWorld"></HelloWorld>
  </div>
</template>
```

==更多关于 porps 的内容看进阶篇深入组件==



##### 子组件向父组件通信

子组件通过 emit 事件来给父组件发信息

+ emit**用于子组件调用父组件的方法并传递数据**

+ vm.$emit( event, arg ) //触发当前实例上的事件 （组件内this就是指向vm的）

在 \<script setup> 标签中并没有暴露 vm，所以无法直接调用 $emit 方法

组件要触发的事件可以显式地通过 [`defineEmits()`](https://cn.vuejs.org/api/sfc-script-setup.html#defineprops-defineemits) 宏来声明：

==使用 ` defineEmits()`可以构建一个与 $emit 一样的方法==

+  可以接收一个数组对象，里面放所有要定义的事件名

+ 可以使用纯类型标注来声明触发的事件（TypeScript）

  ```ts
  const emit = defineEmits<{
    (e: 'change', id: number): void  //事件名，方法接受的参数，返回值
    (e: 'update', value: string): void
  }>()
  ```

  

子组件：

```vue
<script setup lang="ts">
let count:number = 0;
let emit = defineEmits(['plusOneEvent']);
let plusOne = function(){
  count++;
  emit('plusOneEvent',count);
}
</script>

<template>
  <button @click="plusOne">+</button>
</template>

<style scoped>
</style>
```

父组件：

```vue
<template>
  <div>
    {{count}}
    <HelloWorld v-on:plusOneEvent="plusOne"></HelloWorld>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
let count = ref(0);  //将基本数据类型包装成响应式对象，这样插值才能拿到更新

let plusOne = function(counter:number){
  count.value = counter;
  console.log(count);
}

let user = {
  msg:"屿洺",
  count:"20"
}
</script>
```



##### 兄弟组件通信

只能先由一个子组件传给父组件，再让父组件传给另一个子组件



#### Vue.js 插槽

Vue.js 实现了一套内容分发的插槽（Slot）API

父组件HTML中放入内容 =》插入到子组件HTML的 \<slot> 标签下

==注意：插槽中可以包含任何模板代码（如 HTML 等）==

==先在父组件计算完毕再放到子组件去==

子组件：

```vue
<template>
  <!-- 留一个插槽 -->
  <slot></slot>
</template>
```

父组件：

```vue
<template>
  <div>
    <!-- 可以注意到是先在父组件计算完毕再放到子组件去的 -->
    <HelloWorld>{{count}}</HelloWorld>
    <button @click="plusOne">+</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
let count = ref(0);

let plusOne = function(){
  count.value++;
}

</script>

<style>
</style>
```

##### **默认内容**

在子组件模板的 \<slot> 标签中可以放入内容作为后备内容，如果父组件没有传入插槽内容那么就会显示后备内容

##### 带名字的插槽

就和影子 DOM 玩法一样，不过在父组件那里绑定**使用的是 v-slot 指令**（缩写为 "#"）==必须要 \<template> 标签==

```vue
<template>
  <slot name="text"></slot>
  <slot name="html"></slot>
</template>
```

```vue
<template>
  <div>
    <HelloWorld>
        
      <template v-slot:text>
        <p>HelloWorld</p>
      </template>

      <template v-slot:html>
        <a href="https://baidu.com">百度</a>
      </template>

    </HelloWorld>
  </div>
</template>
```



##### 获取插槽内容

在 setup 语法糖中无法实现

```vue
<template>
  <slot></slot>
</template>

<script lang="ts">
export default {
  setup(props: any, context: any) {
    console.log(context.slots.default()[0].children);
  }
}
</script>
```

`context.slots.default()` 返回一个数组，**分别保存着插槽中顶级根节点**

```vue
<HelloWorld>
  <p>HelloWorld</p>
  <p>你好</p>
  <p>世界</p>
</HelloWorld>
```

```ts
export default {
  setup(props: any, context: any) {
    // 使用数组返回多个根节点
    console.log(context.slots.default()[0].children);  //HelloWorld  (文本也是节点别忘了)
    console.log(context.slots.default()[1].children);  //你好
    console.log(context.slots.default()[2].children);  //世界
  }
}
```

`context.slots.default().children` 中如果仍然有嵌套（不是文本节点），那么返回的仍然会是一个数组（和上面的一致）

```vue
<HelloWorld>
  <p><span></span></p>
</HelloWorld>
```





#### 动态加载组件

使用 \<component> 标签和 is 属性来实现组件动态加载

+ ==is 组件动态绑定的是代表那个组件的对象，而非原先的纯字符串==

+ proxy会代理reactive中的所有内容

  无需对组件进行proxy代理

  ==必须使用markRaw跳过对组件的代理，否则vue会给警告==

```vue
<template>
  <div>
    <!-- 切换的按钮 -->
    <button v-for="(tab,index) in tabData" v-bind:key="index"
            v-on:click="switchTab(tab.tabComp)">{{tab.name}}</button>
    <!-- 动态加载组件 -->
    <component v-bind:is="currentTab.tabComp"></component>
  </div>
</template>

<script lang="ts" setup>
import { markRaw, reactive} from "vue";
import TemplateOne from "./components/TemplateOne.vue"
import TemplateTwo from "./components/TemplateTwo.vue"

type tab = {
  tabComp:any,
  name:string
}


// proxy会代理reactive中的所有内容
// 无需对组件进行proxy代理
// 必须使用markRaw跳过对组件的代理，否则vue会给警告
let tabData:tab[] = [{
  tabComp: markRaw(TemplateOne),
  name:"TemplateOne"
},{
  tabComp: markRaw(TemplateTwo),
  name:"TemplateTwo"
}];

let currentTab:tab = reactive({
  name:tabData[0].name,
  tabComp:tabData[0].tabComp
});

let switchTab = function(tabComp:any){
  currentTab.tabComp = tabComp;
}
</script>

<style>
</style>
```

==注意：以这种方式动态加载的组件没有缓冲区，也就是说每次切换都会重新把生命周期过一遍==





##### \<keep-alive> 缓存组件

在 \<component> 外面套一层 \<keep-alive> 标签

```vue
<KeepAlive>
  <component v-bind:is="currentTab.tabComp"></component>
</KeepAlive>
```

缓存的组件就只会进行一次初始化，只后就只有激活和停用的生命周期



##### 设置 \<keep-alive> 缓存组件

默认情况下会缓存所有的组件

可以设置一下几个可选属性来限制缓存

+ include：值为 string|RegExp|Array，只有名称匹配的组件才会被缓存
+ exclude：值为 string|RegExp|Array，名称匹配上就不缓存
+ max：number|string，要缓存的组件实例的最大数量



### Vue.js 模板

+ 模板都是动态的会自动更新

  *可以使用 v-once 指令使其不自动更新*

+ 模板都可以在里面进行计算，包括调用函数等（JavaScript 表达式）

==下面的东西实际上就是通过 Vue 在模板上的指令实现的==

==模板表达式里面不能访问用户自定义的全局变量==



#### 插值

##### 文本

双大括号

```vue
<h1>{{msg}}</h1>
```

这个插值会随着 msg 的更新而动态更新（可以使用 v-once 指令使其不自动更新）

```
<h1 v-once>{{msg}}</h1>
```

##### 原生 HTML 代码

使用 v-html 指令

```vue
<template>
  <div>
    <!-- 使用v-html指令-->
    <p v-html="rawHTML"></p>
  </div>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";

export default class HelloWorld extends Vue {
  private rawHTML:string = `<a href="http://waylau.com/">Welcome</a>`
}
</script>

<style></style>
```

##### HTML attribute

绑定 HTML 属性，使用 v-bind 指令（可以简写为 ":"）

```vue
<template>
  <div>
    <!-- 使用v-bind指令，可简写为 :href="" -->
    <p><a v-bind:href="url"></a></p>
  </div>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";

export default class HelloWorld extends Vue {
  private url:string = "http://waylau.com/"
}
</script>

<style></style>
```

==注意：由于绑定特性时，会将大写字母转换为小写字母==，所以可能出现无法绑定的问题





#### 指令

+ 在vue中提供了一些对于页面 + 数据的更为方便的输出,这些操作就叫做指令, 以v-xxx表示
+ 指令中封装了一些DOM行为, 结合属性作为一个暗号, 暗号有对应的值,根据不同的值，框架会进行相关DOM操作的绑定

**常用指令：**

- v-text 元素的InnerText属性,必须是双标签
- v-html 元素的innerHTML
- v-if 判断是否插入这个元素
- v-else-if
- v-else
- v-show 隐藏元素 如果确定要隐藏, 会给元素的style加上display:none

```js
 v-text 只能用在双标签中
 v-text 其实就是给元素的innerText赋值
 v-html 其实就是给元素的innerHTML赋值
 v-if 如果值为false,会留下一个<!---->作为标记，万一未来v-if的值是true了，就在这里插入元素
   如果有if和else就不需要单独留坑了
   如果全用上  v-if 相邻v-else-if 相邻 v-else 否则 v-else-if可以不用
 v-if和v-else-if都有等于对应的值，而v-else直接写
 v-if家族都是对元素进行插入和移除的操作
 v-show是显示与否的问题
   注意: 指令其实就是利用属性作为标识符,简化DOM操作,
 v-model="xxx"
   v-model 代表要做什么  xxx代表针对的js内存对象
   写在那个元素上，就对哪个元素操作
```

+ v-bind 给元素的属性赋值（缩写：":"）

+ - 可以给已经存在的属性赋值 input value
  - 也可以给自定义属性赋值 mydata

+ v-on 处理事件（缩写："@"）

  

**v-bind 和 v-model 的区别：**

- `input v-model="name"`

- - 双向数据绑定页面对于 input 的 value 改变，能影响内存中name变量
  - 内存 js 改变 name 的值，会影响页面重新渲染最新值

- `input :value="name"`

- - 单向数据绑定 内存改变影响页面改变



**v-for的使用**

- 基本语法 `v-for="item in arr"`
- 对象的操作 `v-for="item in obj"`

执行列表渲染时也会要求给每个组件添加上 key 这个属性

*v-bind:key 主要就是为了高效的更新虚拟DOM*，这个 key 是前面列表对象的标识，如果它不发生改变就不用重新渲染了

**v-for的刷新问题**

有时我们的 arr 改变了希望它重新渲染，这时候 key 属性必须绑定一个每个 item 独有的属性值（不能是 index 因为会重复导致不刷新），这样每次切换就能够自己刷新了

![image-20230117190352835](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202301171903934.png)

示例代码中的 subItems 会在运行过程中改变，这时将 key 属性与每个 item 的独有属性绑定就能实现自动刷新了



#### 指令中的动态参数

可以在指令参数中使用 JavaScript 表达式

```vue
<template>
  <div>
    <p><a v-bind:href="url">Welcome</a></p>
    <button v-on:[eventName]='doLog'>{{msg}}</button>
  </div>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";

export default class HelloWorld extends Vue {
  private eventName = "click";
  
  doLog(){
    console.log("Logging...");
  }
}
</script>

<style></style>
```

==注意：这里不允许有引号、空格等无效字符，如果需要计算只能在外面进行然后以函数返回值或者变量的形式填入==



#### 修饰符

**v-on 常用修饰符：**

+ .stop - 调用 event.stopPropagation()，禁止事件冒泡。
+ .prevent - 调用 event.preventDefault()，阻止事件默认行为。
+ .capture - 添加事件侦听器时使用 capture 模式。（事件冒泡时先触发有 capture 模式的元素）
+ .self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
+ .{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
+ .native - 监听组件根元素的原生事件。
+ .once - 只触发一次回调。
+ .left - (2.2.0) 只当点击鼠标左键时触发。
+ .right - (2.2.0) 只当点击鼠标右键时触发。
+ .middle - (2.2.0) 只当点击鼠标中键时触发。
+ .passive - (2.3.0) 以 { passive: true } 模式添加侦听器

**v-bind 指令常用修饰符：**

+ .prop - 被用于绑定 DOM 属性 (property)。(差别在哪里？)
+ .camel - (2.1.0+) 将 kebab-case 特性名转换为 camelCase. (从 2.1.0 开始支持)
+ .sync (2.3.0+) 语法糖，会扩展成一个更新父组件绑定值的 v-on 侦听器。

**v-model 指令常用修饰符：**

+ .lazy - 取代 input ，监听 change 事件（触发change事件时才更新绑定的值）
+ .number - 输入字符串转为数字
+ .trim - 输入首尾空格过滤

```vue
<template>
  <div>
    <input v-model.trim="msg">
    <p>Msg is:{{msg}}</p>
  </div>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";

export default class HelloWorld extends Vue {
  private msg:string = '';
}
</script>

<style></style>
```

![image-20220924155731891](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209241557943.png) 



### Vue.js 计算属性与侦听器

前面我们使用模板的时候没有使用这两个东西，而它们是没有缓存的（每次重绘都需要进行重新计算）

**计算属性**：==有缓存==，内容不变的时候不需要重新计算

**侦听器**：可以异步执行操作，可以限制操作频率或者在得到结果前设置中间状态



#### 计算属性

使用`computed()`函数定义计算属性

+ 参数就是计算属性的值（==这里面可以进行 JavaScript 计算，可以调用函数==）

```vue
<template>
  <p>Has published books:</p>
  <p v-for="bookName in publishedBooksMessage" :key="bookName">{{bookName}}</p>
  <button @click="change">减少</button>
</template>

<script setup lang="ts">
  import { reactive, computed, ref } from 'vue'
  
  let books = ref([
      'Vue 2 - Advanced Guide',
      'Vue 3 - Basic Guide',
      'Vue 4 - The Mystery'
    ])
  
  // 一个计算属性 ref
  const publishedBooksMessage = computed(() => {
    return books.value;
  })

  const change = function(){
    console.log(books.value.shift());
  }
  </script>
```

**注意：**

+ **计算函数不应该有副作用**

  计算属性的计算函数应只做计算而没有任何其他的副作用，这一点非常重要，请务必牢记。举例来说，**不要在计算函数中做异步请求或者更改 DOM**！一个计算属性的声明中描述的是如何根据其他值派生一个值。因此计算函数的职责应该仅为计算和返回该值。在之后的指引中我们会讨论如何使用[监听器](https://cn.vuejs.org/guide/essentials/watchers.html)根据其他响应式状态的变更来创建副作用。

+ **避免直接修改计算属性值**

  从计算属性返回的值是派生状态。可以把它看作是一个“临时快照”，每当源状态发生变化时，就会创建一个新的快照。更改快照是没有意义的，因此计算属性的返回值应该被视为只读的，并且永远不应该被更改——应该更新它所依赖的源状态以触发新的计算。





#### 侦听器

侦听器在数据变化时执行异步或开销较大的操作时很有用

计算属性允许我们声明性地计算衍生值。然而在有些情况下，我们需要在状态变化时执行一些“副作用”：==例如更改 DOM，或是根据异步操作的结果去修改另一处的状态。==

在组合式 API 中，我们可以使用 [`watch` 函数](https://cn.vuejs.org/api/reactivity-core.html#watch)在每次响应式状态发生变化时触发回调函数：

##### 侦听数据源

+ watch 函数的第一个参数
+ 可以是一个 ref (包括计算属性)、一个响应式对象、一个 getter 函数、或多个数据源组成的数组
+ ==注意，你不能直接侦听响应式对象的属性值，需要使用一个 getter 函数==（直接标红报错，控制台发出警告）

回调函数可以接收两个参数：newVal、oldVal（注意：这个并不会留快照而是留引用，所以如果侦听对象是引用类型，你访问到的会是相同的）

```vue
<template>
  <div>
    <button @click="x++">x++</button>
    <button @click="y++">y++</button>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from 'vue'
const x = ref(0);
const y = ref(0);

// 单个 ref
watch(x, (newX) => {
  console.log(`x is ${newX}`)
})

// getter 函数
watch(
  () => x.value + y.value,
  (sum) => {
    console.log(`sum of x + y is: ${sum}`)
  }
)

// 多个来源组成的数组
watch([x, () => y.value], ([newX, newY]) => {
  console.log(`x is ${newX} and y is ${newY}`)
})
</script>
```

通过上面的实例我们可以发现侦听器的触发时异步的（方法执行并不按声明的顺序来）



##### 深层监听器

直接给 `watch()` 传入一个响应式对象，会隐式地创建一个深层侦听器——==该回调函数在所有嵌套的变更时都会被触发：==

```vue
<template>
  <div>
    <span>{{obj.count}}>{{obj.count}}</span>
    <button @click="obj.count++">+</button>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, reactive } from 'vue'

const obj = reactive({ count: 0 })

watch(obj, (obj) => {
  console.log(`count is: ${obj.count}`)
})
</script>
```

*如果我们将这个响应式对象放到 getter 函数中，就会失去这样的深层监听特性* —— 只有当返回不同的对象才会进行回调

```ts
watch(
  () => state.someObject,
  () => {
    // 仅当 state.someObject 被替换时触发
  }
)
```

你也可以给上面这个例子显式地加上 `deep` 选项，强制转成深层侦听器：

```ts
watch(
  () => state.someObject,
  (newValue, oldValue) => {
    // 注意：`newValue` 此处和 `oldValue` 是相等的
    // *除非* state.someObject 被整个替换了
  },
  { deep: true }
)
```

==谨慎使用深度监听==：深度侦听需要遍历被侦听对象中的所有嵌套的属性，当用于大型数据结构时，开销很大。因此请只在必要时才使用它，并且要留意性能。



##### 实例

```vue
<template>
  <div>
    <p>搜索<input v-model="question" /></p>
    <p v-for="answer in answers" :key="answer">{{answer}}</p>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, reactive } from 'vue'

let books: string[] = [
  "Spring 5 开发大全",
  "Node.js 应用开发实战",
  "Java 核心编程",
  "Spring Boot",
  "Java EE",
  "分布式系统常用技术"
];
let question = ref('');
let answers = ref<string[]>([]);

watch(question, (question)=>{
  getAnswer(question);
})

let getAnswer = function(question:string){
  answers.value = [];
  books.forEach((book)=>{
    if(book.indexOf(question)!=-1) answers.value.push(book);
  });
}
</script>
```

![image-20220924162752462](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209241627514.png) 



##### watchEffect() —— 创建时立即执行

`watch()` 是懒执行的：仅当数据源变化时，才会执行回调。

举例来说，我们想请求一些初始数据，然后在相关状态更改时重新请求数据。我们可以这样写：

```ts
watchEffect(async () => {
  const response = await fetch(url.value)
  data.value = await response.json()
})
```

这个例子中，回调会立即执行。在执行期间，它会自动追踪 `url.value` 作为依赖（和计算属性的行为类似）。每当 `url.value` 变化时，回调会再次执行。



**`watch` vs. `watchEffect`**

`watch` 和 `watchEffect` 都能响应式地执行有副作用的回调。它们之间的主要区别是追踪响应式依赖的方式：

- `watch` ==只追踪明确侦听的数据源==。它不会追踪任何在回调中访问到的东西。另外，仅在数据源确实改变时才会触发回调。`watch` 会避免在发生副作用时追踪依赖，因此，我们能更加精确地控制回调函数的触发时机。
- `watchEffect`，则会在副作用发生期间追踪依赖。它会在同步执行过程中，==自动追踪所有能访问到的响应式属性==。这更方便，而且代码往往更简洁，但有时其响应性依赖关系会不那么明确。



##### [回调的触发时机](https://cn.vuejs.org/guide/essentials/watchers.html#callback-flush-timing)

当你更改了响应式状态，它可能会同时触发 Vue 组件更新和侦听器回调。

默认情况下，用户创建的侦听器回调，都会在 Vue 组件更新**之前**被调用。这意味着你在侦听器回调中访问的 DOM 将是被 Vue 更新之前的状态。

如果想在侦听器回调中能访问被 Vue 更新**之后**的DOM，你需要指明 `flush: 'post'` 选项：

```ts
watch(source, callback, {
  flush: 'post'
})

watchEffect(callback, {
  flush: 'post'
})
```

后置刷新的 `watchEffect()` 有个更方便的别名 `watchPostEffect()`：

```ts
import { watchPostEffect } from 'vue'

watchPostEffect(() => {
  /* 在 Vue 更新后执行 */
})
```



##### 异步创建侦听器的删除

如果用异步回调创建一个侦听器，那么它不会绑定到当前组件上，你必须手动停止它，以防内存泄漏。

==最好使用同步代码创建侦听器==

要手动停止一个侦听器，请调用 `watch` 或 `watchEffect` 返回的函数：

```ts
const unwatch = watchEffect(() => {})

// ...当该侦听器不再需要时
unwatch()
```

**使用条件式侦听逻辑来化异步为同步**

注意，需要异步创建侦听器的情况很少，请尽可能选择同步创建。如果需要等待一些异步数据，你可以使用条件式的侦听逻辑：

```ts
// 需要异步请求得到的数据
const data = ref(null)

watchEffect(() => {
  if (data.value) {
    // 数据加载后执行某些操作...
  }
})
```





### Vue.js 样式

在 vue 中 CSS 样式可以通过 v-bind 来进行绑定（style 是直接样式，class 是引用定义好的 css 类（静态的写到 class 中，动态的写道 style 中））

==Vue 对其进行了增强，v-bind 指令表达式结果可以是字符串或者数组==

注意：可以与普通的 class attribute 并存（它们会在渲染时进行合并）

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209241720526.png" alt="image-20220924172051420" style="zoom: 50%;" /> 

相当于只是将本来绑定 class 的字符串更新了一下

==可以绑定对象或者数组== 



#### 在组件上使用class

比如在父组件中，我们在子组件对应HTML中加样式，最终会在渲染时传到子组件中合并（\<template> 下的第一个 \<div> 标签上）



#### css作用域以及深层穿透

vue3 实现了 css 作用域

![image-20230116175033346](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202301161750415.png) 

加上 scoped 后正常编写的样式只会作用到本组件的元素上

**深层穿透**

有时候我们引用别人的组件，需要对组件内部的样式进行修改，就可以用深层穿透实现

![image-20230116175207829](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202301161752896.png) 

此处运用该方法改变了其他组件内部的元素样式



### Vue.js 表达式（if、for）

#### 条件表达式

```vue
<template>
  <div>
    <div v-if="score === 'A'">A</div>
    <div v-else-if="score === 'B'">B</div>
    <div v-else-if="score === 'C'">C</div>
    <div v-else>D</div>
  </div>
</template>

<script lang="ts">
import {Vue} from "vue-class-component";

export default class HelloWorld extends Vue {
  private score:string = '';
}
</script>
<style></style>
```

==注意：这个的显示与否与 v-show 不一样==，v-show 只是控制了元素的 display 属性（元素依然在 DOM 文档中），而这里是真的不存在



#### v-for 循环遍历

==v-for 可以遍历数组，也可以遍历对象（只要实现了迭代器）==

可以使用 v-for 指令基于一个数组来渲染一个列表：

```vue
<template>
  <div>
    <ul>
      <li v-for="book in books" :key="book">{{book}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";

@Options({})

export default class HelloWorld extends Vue {
  private books: string[] = [
    "Spring 5 开发大全",
    "Node.js 应用开发实战",
    "Java 核心编程",
    "Spring Boot",
    "Java EE",
    "分布式系统常用技术"
  ]
}
</script>
<style></style>
```

![image-20220924174009537](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209241740601.png) 

##### v-for 指令第二参数：索引

这个索引是根据提供的数组给出的

如果遍历的是对象，那么此为属性名

```vue
<template>
  <div>
    <ul>
      <li v-for="(book,index) in books" :key="book">{{index}}  {{book}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";

export default class HelloWorld extends Vue {
  private books: string[] = [
    "Spring 5 开发大全",
    "Node.js 应用开发实战",
    "Java 核心编程",
    "Spring Boot",
    "Java EE",
    "分布式系统常用技术"
  ]
}
</script>
<style></style>
```

![image-20220924174225912](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209241742997.png) 

***



### Vue.js 事件

前面已经用过不少了，这里再系统地说一下

使用 v-on 指令来处理事件（简写为 @）

+ 指令参数为事件名
+ 值可以直接是 script 表达式（一般还是调用方法）

```vue
<template>
  <div>
    <button @click="onClick">show</button>
  </div>
</template>

<script setup lang="ts">
import { watch, ref, reactive } from 'vue'

let onClick = function(event:any){ //现在会直接将event对象暴露出来
  console.log(event);
}
</script>
```



#### 在 HTML 代码中监听事件的好处

+ HTML 模板能轻松定位在 JavaScript 代码中对应的方法
+ 无需在 JavaScript 中手动绑定事件，所以 ViewMode 代码可以是非常纯粹的逻辑，与 DOM 事件完全解耦，易于测试
+ 当一个 ViewMode 被销毁时，所有的事件处理器都会被自动删除，无需担心怎么清理它们



#### 一个事件对应多个处理器

Vue.js 支持一个事件对应多个处理器

```vue
<button @click="plusOne, plus">+</button>
```



#### 事件修饰符

Vue.js 为 v-on 提供了事件修饰符

##### v-on 常用修饰符：

+ .stop - 调用 event.stopPropagation()，禁止事件冒泡。
+ .prevent - 调用 event.preventDefault()，阻止事件默认行为。
+ .capture - 添加事件侦听器时使用 capture 模式。（事件冒泡时先触发有 capture 模式的元素）
+ .self - 只当事件是从侦听器绑定的元素本身触发时才触发回调。
+ .{keyCode | keyAlias} - 只当事件是从特定键触发时才触发回调。
+ .native - 监听组件根元素的原生事件。
+ .once - 只触发一次回调。（**这个不仅仅对原生 DOM 起作用，自定义事件也能用**）
+ .left - (2.2.0) 只当点击鼠标左键时触发。
+ .right - (2.2.0) 只当点击鼠标右键时触发。
+ .middle - (2.2.0) 只当点击鼠标中键时触发。
+ .passive - (2.3.0) 以 { passive: true } 模式添加侦听器（**可以提升移动端性能**）

==注意：==

1. 修饰符可以串联

2. 注意修饰符的使用顺序

   比如`v-on:click.self.prevent`会阻止对元素自身的点击事件，而`v-on:click.prevent.self`会阻止所有单击事件

3. 不要将 .passive 和 .prevent 一起使用

   

##### 按键修饰符

在监听键盘事件的时候常常需要检查详细的按键，Vue.js 为其提供了按键修饰符

**常用按键修饰符**

+ .enter
+ .tab
+ .delete
+ .esc
+ .space
+ .up
+ .down
+ .left
+ .right

不用记，要用的时候选就行了

```vue
<input @keydown.ctrl="plusOne">
```

##### 系统修饰符

+ .ctrl
+ .alt
+ .shift
+ .meta

```vue
<template>
  <div>
    <input v-model='msg' @keydown.alt.enter="clear">
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";

@Options({})

export default class HelloWorld extends Vue {
  private msg:string = ''

  clear(){
    this.msg = '';
  }
}
</script>
<style></style>
```

##### 鼠标修饰符

+ .left
+ .right
+ .middle



#### 自定义事件

组件要触发的事件可以显式地通过 [`defineEmits()`](https://cn.vuejs.org/api/sfc-script-setup.html#defineprops-defineemits) 宏来声明

+ 在组件的 `<script setup>` 部分中我们不能再用 $emit 了（不再暴露了）

  但是`defineEmits()`会==返回一个具有相同功能的函数==（**该函数只能在 \<script setup> 的顶级作用域下**）
  
  + 参数可以为一个字符串数组，该数组为所有要声明为事件的字符串名称
  
    ```ts
    let emit = defineEmits(["plusOne","plusTwo"]);
    ```
  
  + 还可以是一个对象：属性名为事件名
  
    属性值可以是一个校验函数，参数为接收到的值（抛出的时候给），返回值为 boolean 表示是否通过校验
  
  + TS 支持使用纯类型标注来声明触发的事件
  
    ```ts
    const emit = defineEmits<{
      (e: 'change', id: number): void  //事件名，方法接受的参数，返回值
      (e: 'update', value: string): void
    }>();
    ```
  
+ 返回的方法

  + 参数一：要抛出的事件名
  + 参数二：附带的值（在系统组件中该值就是 event 对象）







***



### Vue.js 表单



#### 表单输入绑定

还记得 v-model 的双向绑定吗？

你没猜错，在 Vue.js 中它支持在表单的 \<input>、\<textarea>、\<select> 等输入标签上创建双向数据绑定

*v-model 指令会在内部为不同的输入元素使用不同的属性并抛出不同的事件*



##### 复选框

支持将多个复选框绑定到同一个数组

```vue
<template>
  <div>
    <input type="checkbox" id="baozi" value="包子" v-model="checkedNames"><label for="baozi">包子</label>
    <input type="checkbox" id="cake" value="蛋糕" v-model="checkedNames"><label for="cake">蛋糕</label>
    <p>点菜：</p>
    <p v-for="name of checkedNames" :key="name">{{name}}</p>
  </div>
</template>
<script lang="ts">
import {Options, Vue} from "vue-class-component";

@Options({})

export default class HelloWorld extends Vue {
  private checkedNames: string[] = [];
}
</script>
<style></style>
```

![image-20220925122805534](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209251228610.png) 

#### 表单值绑定

记得吗，表单元素的值是其属性，那么我们就可以**用 v-bind 来对属性进行动态绑定了**

这个绑定甚至可以绑定到非字符串上



#### 表单修饰符

+ .lazy

  默认情况下，v-model 指令绑定的值会同步更新，使用该修饰符后，更新挪到 change 事件之后

+ .number

  自动将用户输入的值转换为数值类型（后面如果输入的不是数值就不再同步了）

+ .trim

  自动过滤用户输入的首尾空白字符



***



## 进阶



### 深入组件

#### 组件注册

使用 Vue.js 组件之前要对其进行注册

1. **局部注册：**

   在父组件中通过 @Option 的 components 中进行注册

   一般都是这样的

2. **全局注册：**

   在 main.ts 中，调用应用实例的方法`createApp(App).component()`

   ```ts
   import { createApp } from 'vue'
   import App from './App.vue'
   import HelloWorld from "@/components/HelloWorld.vue";
   
   createApp(App).component('hello',HelloWorld).mount('#app')
   ```

   这样注册完后在任何新创建的组件实例模板中都能以该名字调用组件

   ==代价：哪怕没有渲染该组件，它还是被包含在结果集中==
   
   

#### 模板引用（元素）

有时候我们还是需要直接访问 JavaScript 中的子组件。因此可以用 ref attribute 来为子组件或者 HTML 元素指定引用 ID

```vue
<template>
  <input ref="input">
</template>
```

**访问组件引用**

为了通过组合式 API 获得该模板引用，我们需要声明一个同名的 ref：

```vue
<script setup>
import { ref, onMounted } from 'vue'

// 声明一个 ref 来存放该元素的引用
// 必须和模板里的 ref 同名
const input = ref(null)

onMounted(() => {
  input.value.focus()
})
</script>

<template>
  <input ref="input" />
</template>
```



#### prop对象详解（输入属性）

一个组件需要显式声明它所接受的 props，这样 Vue 才能知道外部传入的哪些是 props，哪些是透传 attribute

在使用 `<script setup>` 的单文件组件中，props 可以使用 `defineProps()` 宏来声明

可以接受的参数：

+ 字符串数组

  ```ts
  defineProps(['msg']);
  ```

+ 对象：==对象形式可以对参数进行类型检测==

  ```ts
  defineProps({
    msg:String,
    count:Number
  });
  ```

+ 如果你正在搭配 TypeScript 使用 `<script setup>`，也可以使用类型标注来声明 props：

  ```ts
  defineProps<{
    title?: string
    likes?: number
  }>();
  ```

在非 setup 语法糖中 props 如下声明

```ts
export default {
  props: ['foo'],
  setup(props) {
    // setup() 接收 props 作为第一个参数
    console.log(props.foo)
  }
}
```



**命名**

属性命名最好是两个单词小驼峰命名或者用短横分隔



##### 使用一个对象绑定多个 prop

使用[没有参数的 `v-bind`](https://cn.vuejs.org/guide/essentials/template-syntax.html#dynamically-binding-multiple-attributes)，即只使用 `v-bind` 而非 `:prop-name`。

```vue
<HelloWorld :="user"></HelloWorld>
```



##### 单向数据流

所有的 props 都遵循着**单向绑定**原则，父组件值的改变会自动流向子组件，而不允许子组件修改值

```ts
let props = defineProps({
  msg:String,
  count:Number
});

props.count++;  //会报错！props.count是只读属性
```

==对于引用属性它没办法禁止==（这是因为 JavaScript 的对象和数组是按引用传递，而对 Vue 来说，禁止这样的改动虽然可能，但有很大的性能损耗，比较得不偿失。）

==不用担心计算属性的更新问题==



***



#### props 传值导致 ref 失去响应式的解决

==一定要记住！！！！==

在使用 props 传值时，由于模板内会自动对 ref 进行解包，导致丢失响应式，然后在子组件内接收到的就没有响应式了

==注意，defineProps 所产生的 props 对象是响应式的，但是里面的属性并不是==

这会导致许多的问题，解决方式：子组件接收时使用 `toRefs()` 或者 `toRef()` 重建其响应式

1. toRefs():

   将一个`响应式对象`，再包装为`普通对象`，其中的属性转换为 `Ref` 对象

   这里我们将 props（响应式）再包装成一个对象，然后里面的属性就保持响应了

   ```ts
   let newProps = toRefs(props);
   ```

2. toRef():

   与`toRefs()`不同点在于它是单独为一个属性进行包装

   ```ts
   let newRefVal = toRef(props, 'key');
   ```

   

***



#### 非 prop 的 attribute

指给一个组件传入信息时，该组件并没有使用相应 prop 或 emit 定义的 attribute。常见的实例包括 class、style、id

非 prop 的 attribute 会被添加到这个组件的根元素上

##### attribute 继承

正如上面所说，子组件会继承父组件中指定的 attribute

在单节点继承中是很直白的，但是在多节点继承中存在一些要手动解决的问题



父组件：

```vue
<template>
  <div>
    <HelloWorld type="radio"></HelloWorld>
  </div>
</template>
```

HelloWorld 组件：

```vue
<template>
  <TemplateOne></TemplateOne>
  <TemplateTwo></TemplateTwo>
</template>
```

TO 和 TT

```vue
<template>
  <input>
</template>
```

结果会丢警告而且 attribute 没有应用上去

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209251512589.png" alt="image-20220925151204494" style="zoom:50%;" /> 

**解决办法：**在 HelloWorld 组件调用子组件时，指定 v-bind="$attrs"（$attrs 暴露了 HelloWorld 上的属性）==这个在现在仍然暴露，能够正常使用==

```vue
<template>
  <TemplateOne :="$attrs"></TemplateOne>
  <TemplateTwo :="$attrs"></TemplateTwo>
</template>
```

![image-20220925151430423](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209251514498.png) 

##### 禁用 attribute 继承

如果不希望组件之间发送这种继承行为，可以在子组件中设置 `inheritAttrs: false`

```tsx
@Options({
  inheritAttrs: false
})
```





#### 自定义事件

==注意： v-on 事件监听器在 DOM 模板中会自动转换为全部小写字母（HTML 不区分大小写）==，所以事件命名只能使用短横线分隔

自定义事件使用 `vm.$emit( event, arg )` 来进行定义

子组件：

```vue
<template>
  <div>
    <h1>点击增加1</h1>
    <!-- 点击触发click事件，该事件处理函数绑定为plusOne() -->
    <button v-on:click="plusOne">+</button>
  </div>
</template>

<script lang="ts">
import {Options,Vue} from "vue-class-component";

@Options({
  props:{
    msg: String
  }
})

export default class HelloWorld extends Vue {
  plusOne(){
    this.$emit("plusOneEvent");  //会向父组件发送一个plusOneEvent事件
  }
}
</script>

<style></style>
```

父组件：

```vue
<template>
  <div>
    <!-- 监听plusOneEvent事件，事件处理程序绑定为handlePlusOneEvent() -->
    <HelloWorld v-on:plusOneEvent="handlePlusOneEvent"></HelloWorld>
    <div>{{counter}}</div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import HelloWorld from "@/components/HelloWorld.vue";

@Options({
  components: {
    HelloWorld
  },
})
export default class App extends Vue {
  private counter:number = 0;

  handlePlusOneEvent(){
    this.counter++;
  }
}
</script>
```

##### setup语法糖内容

组件要触发的事件可以显式地通过 [`defineEmits()`](https://cn.vuejs.org/api/sfc-script-setup.html#defineprops-defineemits) 宏来声明

+ 在组件的 `<script setup>` 部分中我们不能再用 $emit 了（不再暴露了）

  但是`defineEmits()`会==返回一个具有相同功能的函数==（**该函数只能在 \<script setup> 的顶级作用域下**）

  + 参数可以为一个字符串数组，该数组为所有要声明为事件的字符串名称

    ```ts
    let emit = defineEmits(["plusOne","plusTwo"]);
    ```

  + 还可以是一个对象：属性名为事件名

    属性值可以是一个校验函数，参数为接收到的值（抛出的时候给），返回值为 boolean 表示是否通过校验

  + TS 支持使用纯类型标注来声明触发的事件

    ```ts
    const emit = defineEmits<{
      (e: 'change', id: number): void  //事件名，方法接受的参数，返回值
      (e: 'update', value: string): void
    }>();
    ```

+ 返回的方法

  + 参数一：要抛出的事件名
  + 参数二：附带的值（在系统组件中该值就是 event 对象）



#### 依赖注入（广义 prop）

*广义上的 prop*

假设有一个深层嵌套的组件，需要将父组件数据传输到该子组件中，若使用 prop，我们会需要层层往里面传到整个组件链中。

Vue.js 提供 provide 和 inject 来实现 "依赖注入"

+ 父组件通过 provide 提供数据
+ 子组件通过 inject 使用数据

==父组件可以为它所有子组件的依赖项提供数据，而不管组件层次结构有多深==

优点：

+ 父组件不需要知道哪些子组件使用它提供的 property
+ 子组件不需要知道 inject property 来自哪里
+ 可以更安全地开发组件（不需要担心可能会更改/删除子组件所依赖的某些内容）

**provied 和 inject 都必须在 \<script setup> 标签顶级执行域（必须同步代码执行）**



实例：

父组件：

```tsx
<script setup lang="ts">
import { provide } from "vue";
import HelloWorld from "./components/HelloWorld.vue";

provide('user',"屿洺");
</script>
```

子组件：

```vue
<template>
  <p>user: {{user}}</p>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue';

let user = ref('');
user.value = inject('user','默认值');

</script>

<style scoped>
</style>
```

==如果传过来的是响应式对象，它过来后依然是响应式对象，可以直接在模板上用==



#### 异步组件

在大型应用中，并不是所有的组件都需要在应用初始时加载，而是需要时才从服务器加载

Vue.js 中通过 "懒加载" 方式加载的组件就叫异步组件

*异步组件需要将其包装在 `defineAsyncComponent()` 显式 import*

+ 返回组件实例（只有在需要的时候才会进行渲染）

```ts
const AsyncComp = defineAsyncComponent(()=>{
  return new Promise((resolve,reject)=>{
    //从服务器获取成功就resolve并且import
    //获取失败就reject
  })
});
```

*该获取到的组件实例也可以用于全局注册*

```vue
<template>
  <div>
    <HelloWorld></HelloWorld>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';


const HelloWorld = defineAsyncComponent(()=>{
  return import('./components/HelloWorld.vue');
});

</script>
```



##### 选项

将其包装成一个对象传入`defineAsyncComponent()`方法

```ts
const AsyncComp = defineAsyncComponent({
  // 加载函数
  loader: () => import('./Foo.vue'),

  // 加载异步组件时使用的组件
  loadingComponent: LoadingComponent,
  // 展示加载组件前的延迟时间，默认为 200ms
  delay: 200,

  // 加载失败后展示的组件
  errorComponent: ErrorComponent,
  // 如果提供了一个 timeout 时间限制，并超时了
  // 也会显示这里配置的报错组件，默认值是：Infinity
  timeout: 3000
})
```



## 全局错误处理

### app.config.errorHandler

```js
app.config.errorHandler = (err, instance, info)=>{
    console.log(err);      //抛出的error
    console.log(instance); //抛出error的实例（组件）
    console.log(info);     //info 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
}
```

`app.config.warnHandler` 捕获警告

### errorCaptured 生命周期钩子

这个可以丢给 APP.vue 处理

```js
import { onErrorCaptured } from 'vue';

onErrorCaptured((err, instance, info) => {
    console.log(err);      //err对象
    console.log(instance); //报错实例
    console.log(info);     //info 是 Vue 特定的错误信息，比如错误所在的生命周期钩子
})
```

### window.onerror

js 运行异常的捕获

```js
window.onerror = function(message, source, lineno, colno, error) {
    //message：错误信息（字符串）  //source：发生错误的脚本URL（字符串）
    //lineno：发生错误的行号（数字）//colno：发生错误的列号（数字）
    //error：error对象
    console.log('捕获到异常：',{message, source, lineno, colno, error});
}
```





## 逻辑复用



### 组合式函数——方法的复用

我们可以把需要复用的方法 export 出来，其它地方需要用的时候 import 进来就行了

==组合式函数名以“use”开头==（惯例）

在外面的一个工具 .ts 文件中

```ts
// mouse.js
import { ref, onMounted, onUnmounted } from 'vue'

// 按照惯例，组合式函数名以“use”开头
export function useMouse() {
  // 被组合式函数封装和管理的状态
  const x = ref(0);
  const y = ref(0);

  // 组合式函数可以随时更改其状态。
  function update(event:any) {
    x.value = event.pageX
    y.value = event.pageY
  }

  //绑定到生命周期函数上
  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  // 通过返回值暴露所管理的状态
  return { x, y }
}
```

```vue
<template>
  <div>
    <p>坐标 x：{{x}}，y{{y}}</p>
  </div>
</template>

<script setup lang="ts">
import { useMouse } from './assets/tool';
let { x, y } = useMouse();
</script>
```





### 自定义指令

在 @Options 中的 directives 中可以自定义指令

#### 指令的钩子函数

一个指令的定义对象可以提供几种钩子函数 (都是可选的)：

```js
const myDirective = {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
}
```

##### 钩子参数

指令的钩子会传递以下几种参数：

- `el`：指令绑定到的元素。这可以用于直接操作 DOM。
- `binding`：一个对象，包含以下属性。
  - `value`：传递给指令的值。例如在 `v-my-directive="1 + 1"` 中，值是 `2`。
  - `oldValue`：之前的值，仅在 `beforeUpdate` 和 `updated` 中可用。无论值是否更改，它都可用。
  - `arg`：传递给指令的参数 (如果有的话)。例如在 `v-my-directive:foo` 中，参数是 `"foo"`。
  - `modifiers`：一个包含修饰符的对象 (如果有的话)。例如在 `v-my-directive.foo.bar` 中，修饰符对象是 `{ foo: true, bar: true }`。
  - `instance`：使用该指令的组件实例。
  - `dir`：指令的定义对象。
- `vnode`：代表绑定元素的底层 VNode。
- `prevNode`：之前的渲染中代表指令所绑定元素的 VNode。仅在 `beforeUpdate` 和 `updated` 钩子中可用。



#### 定义指令

Vue 3 现在已经很聪明了，我们只需要用驼峰法命名定义一个对象，它就能在模板中识别成短横号分隔的指令

```vue
<template>
  <input v-focus />
</template>

<script lang="ts" setup>

const vFocus = {
  mounted: (element: any) => element.focus()
}

</script>
```



#### 简化形式

对于自定义指令来说，一个很常见的情况是仅仅需要在 `mounted` 和 `updated` 上实现相同的行为，除此之外并不需要其他钩子。这种情况下我们可以直接用一个函数来定义指令，如下所示：

使用 `directive()` 函数创建指令

+ 参数为指令名（v-后面的）
+ mounted 和 updated 钩子上调用的方法

```vue
<div v-color="color"></div>
```

```js
app.directive('color', (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value
})
```



### 插件

插件 (Plugins) 是一种能为 Vue 添加全局功能的工具代码。

一个插件可以是一个拥有 `install()` 方法的对象，也可以直接是一个安装函数本身。

+ 安装函数会接收到安装它的[应用实例](https://cn.vuejs.org/api/application.html)和
+ 传递给 `app.use()` 的额外选项

```ts
const myPlugin = {
  install(app, options) {
    // 配置此应用
  }
}
```

插件发挥作用的常见场景主要包括以下几种：

1. 通过 [`app.component()`](https://cn.vuejs.org/api/application.html#app-component) 和 [`app.directive()`](https://cn.vuejs.org/api/application.html#app-directive) 注册一到多个全局组件或自定义指令。

2. 通过 [`app.provide()`](https://cn.vuejs.org/api/application.html#app-provide) 使一个资源[可被注入](https://cn.vuejs.org/guide/components/provide-inject.html)进整个应用。

3. 向 [`app.config.globalProperties`](https://cn.vuejs.org/api/application.html#app-config-globalproperties) 中添加一些全局实例属性或方法

   getCurrentInstance().appContext 获得 app 组件的信息，然后就能以同样的方式获取到这些内容

4. 一个可能上述三种都包含了的功能库 (例如 [vue-router](https://github.com/vuejs/vue-router-next))。

引入插件后通过`app.use()`来导入插件





实例：一个国际化语言插件方法

```html
<h1>{{ $translate('greetings.hello') }}</h1>
```

我们希望有一个全局的 translate 方法来引用到字典库中的数据

```ts
import type { App } from "vue"

export default {
    install: (app: App, options: object) => {
        // 注入一个全局可用的 $translate() 方法
        app.config.globalProperties.$translate = (key: string) => {
            // 获取 `options` 对象的深层属性
            // 使用 `key` 作为索引
            return key.split('.').reduce((o: any, i: any) => {
                if (o) return o[i]
            }, options)
        }
    }
}
```

在 main.ts 中引入插件

```ts
createApp(App)
    .use(i18nPlugin, {
        greetings: {
            hello: 'Bonjour!'
        }
    })
    .mount('#app');
```

然后就能在全局调用到 $translate() 方法了

```vue
<h1>{{ $translate('greetings.hello') }}</h1>
```



## Vuex全局状态管理

基本使用：

引入Vuex：`npm install vuex@next --save`

基础使用：

```js
import { createStore } from 'vuex'

export default createStore({
    //根节点相关
    state:{},     //存放数据，使用响应式包装
    mutations:{}, //同步修改state内容
    action{},     //执行异步代码，分发mutation
    getters:{},   //获取器
    //模块
    modules:{}
})
```

### state

由于 Vuex 的状态存储是响应式的，从 store 实例中读取状态最简单的方法就是在[计算属性](https://cn.vuejs.org/guide/computed.html)中返回某个状态：

```js
computed: {
  count () {
    return store.state.count
  }
}
```

#### `mapState` 辅助函数

==不要在 setup 使用 mapState！==

+ 因为 mapState 导出 state 是一个函数（computed），这个函数内部使用了 this.$store

+ 而 setup 中 this 是一个空值，所以在 setup 中使用 mapState 会报错

当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以==使用 `mapState` 辅助函数帮助我们生成计算属性==，让你少按几次键：

```js
import { mapState } from 'vuex'

computed:{
    computed: mapState(['likes','friends','token','userInfo']);
}//前面的方法名和获取的属性名是一致的。
```

别名：

```
computed: {   
  value(){
   return this.val++
  },
  ...mapState({
      myLikes:"likes",
      myFriends:"friends",
      theUserInfo:"userInfo"
  })

}
```



### Getter

有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数

Getter 可以认为是 store 的计算属性

+ 接受 state 作为其第一个参数
+ 可以接受其他 getter 作为第二个参数

```js
const store = createStore({
  state: {
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false }
    ]
  },
  getters: {
    doneTodos (state) {
      return state.todos.filter(todo => todo.done)
    }
  }
})
```

Getter 会暴露为 `store.getters` 对象，你可以以属性的形式访问这些值：

```js
store.getters.doneTodos // -> [{ id: 1, text: '...', done: true }]
```

你也可以通过让 getter 返回一个函数，来实现给 getter 传参。在你对 store 里的数组进行查询时非常有用。

```js
getters: {
  // ...
  getTodoById: (state) => (id) => {
    return state.todos.find(todo => todo.id === id)
  }
}
store.getters.getTodoById(2) // -> { id: 2, text: '...', done: false }
```

注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果。



### mutation

更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件

==mutation必须同步执行==（里面的的异步代码状态在debug时无法追踪）

可以接收到两个参数：

+ state：用于修改数据
+ Payload：载荷

```js
const store = createStore({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```

通过`store.commit('方法名', 载荷)`调用



### Action

Action 类似于 mutation，不同在于：

- Action 提交的是 mutation，而不是直接变更状态。
- Action 可以包含任意==异步==操作。

简而言之：Action 可以用异步分发 mutation，可以返回 promise

接收一个参数：

+ context：与 store 实例对象中的内容相同，可以用它分发 mutation

```js
import { createStore } from 'vuex'

export default createStore({
    state:{
        val:0
    },

    mutations:{
        increment(state){
            state.val++;
        }
    },

    actions:{
        asyncIncrement({commit}){
            return new Promise((resolve, reject)=>{
                commit('increment');
                resolve(true);
            })
        }
    }
})
```

使用`store.dispatch('xxx')` 分发 action



### Module

由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成**模块（module）**。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割：

```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = createStore({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```

+ 对于模块内部的 action，局部状态通过 `context.state` 暴露出来，根节点状态则为 `context.rootState`
+ 对于模块内部的 getter，根节点状态会作为第三个参数暴露出来：



#### 命名空间

默认状态下模块内部的 action 和 mutation 仍然是注册在**全局命名空间**的——这样使得多个模块能够对同一个 action 或 mutation 作出响应。

如果希望你的模块具有更高的封装度和复用性，你可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径==调整命名==。例如：

```js
moduleA: store.commit('moduleA/increment');
```

##### 在带命名空间的模块内访问全局内容（Global Assets）

如果你希望使用全局 state 和 getter，`rootState` 和 `rootGetters` 会作为第三和第四参数传入 getter，也会通过 `context` 对象的属性传入 action。

若需要在全局命名空间内分发 action 或提交 mutation，将 `{ root: true }` 作为第三参数传给 `dispatch` 或 `commit` 即可。

```js
modules: {
  foo: {
    namespaced: true,

    getters: {
      // 在这个模块的 getter 中，`getters` 被局部化了
      // 你可以使用 getter 的第四个参数来调用 `rootGetters`
      someGetter (state, getters, rootState, rootGetters) {
        getters.someOtherGetter // -> 'foo/someOtherGetter'
        rootGetters.someOtherGetter // -> 'someOtherGetter'
        rootGetters['bar/someOtherGetter'] // -> 'bar/someOtherGetter'
      },
      someOtherGetter: state => { ... }
    },

    actions: {
      // 在这个模块中， dispatch 和 commit 也被局部化了
      // 他们可以接受 `root` 属性以访问根 dispatch 或 commit
      someAction ({ dispatch, commit, getters, rootGetters }) {
        getters.someGetter // -> 'foo/someGetter'
        rootGetters.someGetter // -> 'someGetter'
        rootGetters['bar/someGetter'] // -> 'bar/someGetter'

        dispatch('someOtherAction') // -> 'foo/someOtherAction'
        dispatch('someOtherAction', null, { root: true }) // -> 'someOtherAction'

        commit('someMutation') // -> 'foo/someMutation'
        commit('someMutation', null, { root: true }) // -> 'someMutation'
      },
      someOtherAction (ctx, payload) { ... }
    }
  }
}
```

##### 在带命名空间的模块注册全局 action

若需要在带命名空间的模块注册全局 action，你可添加 `root: true`，并将这个 action 的定义放在函数 `handler` 中。例如：

```js
{
  actions: {
    someOtherAction ({dispatch}) {
      dispatch('someAction')
    }
  },
  modules: {
    foo: {
      namespaced: true,

      actions: {
        someAction: {
          root: true,
          handler (namespacedContext, payload) { ... } // -> 'someAction'
        }
      }
    }
  }
}
```

##### 带命名空间的绑定函数

当使用 `mapState`、`mapGetters`、`mapActions` 和 `mapMutations` 这些函数来绑定带命名空间的模块时，写起来可能比较繁琐：

```
computed: {
  ...mapState({
    a: state => state.some.nested.module.a,
    b: state => state.some.nested.module.b
  }),
  ...mapGetters([
    'some/nested/module/someGetter', // -> this['some/nested/module/someGetter']
    'some/nested/module/someOtherGetter', // -> this['some/nested/module/someOtherGetter']
  ])
},
methods: {
  ...mapActions([
    'some/nested/module/foo', // -> this['some/nested/module/foo']()
    'some/nested/module/bar' // -> this['some/nested/module/bar']()
  ])
}
```

对于这种情况，你可以将模块的空间名称字符串作为第一个参数传递给上述函数，这样所有绑定都会自动将该模块作为上下文。于是上面的例子可以简化为：

```
computed: {
  ...mapState('some/nested/module', {
    a: state => state.a,
    b: state => state.b
  }),
  ...mapGetters('some/nested/module', [
    'someGetter', // -> this.someGetter
    'someOtherGetter', // -> this.someOtherGetter
  ])
},
methods: {
  ...mapActions('some/nested/module', [
    'foo', // -> this.foo()
    'bar' // -> this.bar()
  ])
}
```

而且，你可以通过使用 `createNamespacedHelpers` 创建基于某个命名空间辅助函数。它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数：

```js
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('some/nested/module')

export default {
  computed: {
    // 在 `some/nested/module` 中查找
    ...mapState({
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    // 在 `some/nested/module` 中查找
    ...mapActions([
      'foo',
      'bar'
    ])
  }
}
```







## 渲染

### 渲染机制

#### 虚拟 DOM

虚拟 DOM (Virtual DOM，简称 VDOM) 是一种编程概念，意为将目标所需的 UI 通过数据结构“虚拟”地表示出来，保存在内存中，然后将真实的 DOM 与之保持同步。

一个运行时渲染器将会遍历整个虚拟 DOM 树，并据此构建真实的 DOM 树。这个过程被称为**挂载** (mount)。

如果我们有两份虚拟 DOM 树，渲染器将会有比较地遍历它们，找出它们之间的区别，并应用这其中的变化到真实的 DOM 上。这个过程被称为**更新** (patch)，又被称为 “比对”(diffing) 或 “协调”(reconciliation)。



### 渲染函数

在绝大多数情况下，Vue 推荐使用模板语法来创建应用。然而在某些使用场景下，我们真的需要用到 JavaScript 完全的编程能力。这时**渲染函数**就派上用场了。

比如有些情况下我们需要大量编写重复模板，它们仅有少许不同或是由 js 来决定生成的

**Vue 提供了一个 `h()` 函数用于创建 vnodes：**

```ts
// 除了类型必填以外，其他的参数都是可选的
h('div')
h('div', { id: 'foo' })

// attribute 和 property 都能在 prop 中书写
// Vue 会自动将它们分配到正确的位置
h('div', { class: 'bar', innerHTML: 'hello' })

// props modifiers such as .prop and .attr can be added
// with '.' and `^' prefixes respectively
h('div', { '.name': 'some-name', '^width': '100' })

// 类与样式可以像在模板中一样
// 用数组或对象的形式书写
h('div', { class: [foo, { bar }], style: { color: 'red' } })

// 事件监听器应以 onXxx 的形式书写
h('div', { onClick: () => {} })

// children 可以是一个字符串
h('div', { id: 'foo' }, 'hello')

// 没有 props 时可以省略不写
h('div', 'hello')
h('div', [h('span', 'hello')])

// children 数组可以同时包含 vnodes 与字符串
h('div', ['hello', h('span', 'hello')])
```

==注意：在组件树中，vnode 必须唯一（因为 dom 元素唯一）==，不能把一个节点放在多个位置

==注意：渲染函数应当放在模板中（不能使用 setup 语法糖），将虚拟 DOM 根节点从 setup() 中返回出来==



实例：通过 level 指定标题级别

组件：

```vue
<template>
</template>

<script lang="ts">
import { h } from 'vue'

export default {
  props:["level"],
  setup(props:any) {
    // 返回根节点
    return () => h(`h${props.level}`,{},["HelloWorld"]); 
      //注意！！！返回的是一个函数，这个函数值可以是vnode、字符串、数组
  }
}
</script>
```

调用组件：

```vue
<HelloWorld :level="1"></HelloWorld>
```

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209301312884.png" alt="image-20220930131256820" style="zoom:50%;" /> 





## 路由——网页跳转

路由推荐使用 Vue Router 库

这个跳转与直接用 a 链接跳转不同

+ a 超链接标签会重新渲染页面==会 "闪烁"==
+ 通过**router-link**进行跳转不会跳转到新的页面，也不会重新渲染，它会选择路由所指的组件进行渲染，避免了重复渲染的“无用功”。



### 安装 Vue Router

打开项目文件，运行指令

`npm install vue-router@4`



### 路由概念

路由由 route、routes、router 和客户端中的路由 4 个核心组成

+ route：一条路由，比如 about 链接映射到 about 内容这就是一条路由
+ routes：一组路由，把上面的每一条路由组合起来形成一个数组
+ router：一个机制，相当于一个管理者：在请求来时，它会到 routes 中查找，找到对应的内容
+ 客户端中的路由：实际上就是 DOM 元素的显示和隐藏。当页面显示内容1时，内容2中的内容全部隐藏



### 静态路由实例

1. 准备好我们要跳转的组件 Home、About

2. 创建一个路由文件（插件）

   ```ts
   import {createRouter, createWebHashHistory} from "vue-router";
   import Home from "./Home.vue"
   
   //路由表
   const routes: Array<any> = [
       {
           path:"/",
           name:"Home",
           component: Home
       },
       {
           path:"/about",
           name:"About",
           //可以进行懒加载
           component: ()=> import("./About.vue")
       },
   ]
   
   //管理器
   const router = createRouter({
       history: createWebHashHistory(),
       routes
   });
   
   export default router;
   ```
   
   管理器由引入的方法`createRouter()`来创建，传入一个对象

   + history：这个看后面，指定历史模式
     + createWebHashHistory
     + createWebHistory
   + 路由表 routes
   
3. 在 main.ts 引入插件

   ```ts
   import { createApp } from 'vue'
   import App from './App.vue'
   import router from './components/router';
   
   import './assets/global.css'
   
   
   createApp(App)
       .use(router)  //引入路由插件
       .mount('#app');
   ```

4. 在 App.vue 上准备好映射区和跳转链接

   ```vue
   <template>
     <div>
       <h1>Router demo</h1>
   
       <div id="nav">
         <div>
           <!-- 跳转链接 -->
           <router-link to="/">Home</router-link>
         </div>
   
         <div>
           <!-- 跳转链接 -->
           <router-link to="/about">About</router-link>
         </div>
       </div>
   
       <div id="content">
         <!-- 映射区 -->
         <router-view></router-view>
       </div>
     </div>
   </template>
   ```

   

### 了解 history 两种模式

history 可以指定 Hash 和 History 两种模式

对于 Vue.js 这类渐进式前端开发框架来说，为了开发 SPA（单页面应用），需要引入前端路由系统==（不难看出前面我们的跳转并没有离开页面，这样就避免了页面重新渲染，不会产生闪烁）==

前端路由的核心在于当试图改变试图的切换时不会向后端发出请求

**这两个模式的区别在于实现方式的不同**

+ Hash 模式：

  地址栏 URL 中有 “#” ，比如 URL："http://hello.com/#/about" 其中 "#/about" 就是 Hash 值，**Hash 值不会被包括在 HTTP 请求中，所以对后端完全没影响**，因此该模式不会重新加载页面

+ History 模式：利用 HTML5 规范中新增的 `pushState()` 方法和 `replaceState()` 方法，通过这两个方法完成 URL 跳转而无需重新加载页面

**一般情形下这两个模式都可使用，实际效果差不多**



### 动态路由

有时项目中的路由并非都是固定不变的，比如我们访问博客网站中的某篇博客时，可以看到不同的博客，其博客 ID 在 URL 中是不同的。

假设博客内容由 Blog.vue 子组件表示，则不同的博客都需要导航到同一个组件）

由上，我们不能将路由中的 path 属性写死

==在 Vue Router 库中，动态部分以 ":" 开头==，在页面中通过 this.$route.params.[] 暴露出来

+ 除了 `$route.params` 之外，`$route` 对象还公开了其他有用的信息，如 `$route.query`（如果 URL 中存在参数）、`$route.hash` 等

Bolg 组件：

```vue
<template>
    <div class="blog">
        <h1>This is Blog</h1>
        <div>ID 是{{this.$route.params.id}}</div>
    </div>
</template>
```

```ts
import {createRouter, createWebHistory} from "vue-router";
import Home from "./Home.vue"


const routes: Array<any> = [
    {
        path:"/",
        name:"Home",
        component: Home
    },
    {
        path:"/blog/:id", //动态的路由url
        name:"Blog",
        //可以进行懒加载
        component: ()=> import("./Blog.vue")
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
```

跳转链接：

```vue
<router-link to="/blog/1">Blog1</router-link>
```



### 嵌套路由

一些应用程序的 UI 由多层嵌套的组件组成。在这种情况下，URL 的片段通常对应于特定的嵌套组件结构

即：导航到一个组件，然后组件下面的内容又需要路由导航

```ts
const routes = [
  {
    path: '/user/:id',
    component: User,
    children: [
      {
        // 当 /user/:id/profile 匹配成功
        // UserProfile 将被渲染到 User 的 <router-view> 内部
        path: 'profile',
        component: UserProfile,
      },
      {
        // 当 /user/:id/posts 匹配成功
        // UserPosts 将被渲染到 User 的 <router-view> 内部
        path: 'posts',
        component: UserPosts,
      },
    ],
      
      
  },
]
```



### 编程式导航

下面在 setup 语法糖和常规标签下有一些区别

+ 语法糖中需要引入组合式函数 useRouter
+ 不在语法糖中通过 $router 暴露

#### 导航到其他位置

| 声明式                    | 编程式             |
| ------------------------- | ------------------ |
| `<router-link :to="...">` | `router.push(...)` |

```ts
router.push('/blog/1');
```

to 与 push 接收的对象种类完全相同

+ 该方法返回一个期约，在导航完成后我们可以知道是否成功

#### 替换当前位置

| 声明式                            | 编程式                |
| --------------------------------- | --------------------- |
| `<router-link :to="..." replace>` | `router.replace(...)` |

它不会产生历史记录

也可以直接在传递给 `router.push` 的 `routeLocation` 中增加一个属性 `replace: true` ：

```tsx
router.push({ path: '/home', replace: true })
// 相当于
router.replace({ path: '/home' })
```

#### 横跨历史

`router.go(1)`

该方法采用一个整数作为参数，表示在历史堆栈中前进或后退多少步，类似于 `window.history.go(n)`



### 路由组件传参

上面的动态路由就使用了路由组件传参

+ 同样在语法糖中需要引入组合式函数 useRoute
+ 不在语法糖中通过 $route 暴露出来

==需要注意的问题==：如果我们是在同一个组件中跳转（比如从博客1 跳转到博客2）那么我们的脚本并不会重新加载（但是目标中如果直接引用是可以更新的）

虽然不会重新加载脚本，但是显然会经过 update 生命周期，我们可以在里面再进行一次更新

+ 元素使用params跳转，使用params接收
+ 元素使用query跳转，使用query接收

```vue
<template>
    <div class="blog">
        <h1>This is Blog</h1>
        <div>ID 是{{id}}</div>
    </div>
</template>

<script setup lang="ts">
import { onUpdated, ref, } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
let id = ref(route.params.id); //路由设置的是：path:"/blog/:id"

onUpdated(() => {  //在onUpdate中进行更新，包括内容的更新
    id.value = route.params.id;
})
</script>
```



### 重定向和别名

#### 重定向

重定向也是通过 `routes` 配置来完成，下面例子是从 `/home` 重定向到 `/`

```ts
const routes = [{ path: '/home', redirect: '/' }]
```

重定向的目标也可以是一个命名的路由：

```tsx
const routes = [{ path: '/home', redirect: { name: 'homepage' } }]
```

甚至是一个方法，动态返回重定向目标（方法接收目标路由作为参数）

==此外，由于导航守卫是作用在目标上==，所以跳转路由不会触发

#### 别名

将 `/` 别名为 `/home`，意味着当用户访问 `/home` 时，URL 仍然是 `/home`，但会被匹配为用户正在访问 `/`。

```tsx
const routes = [{ path: '/', component: Homepage, alias: '/home' }]
```

通过别名，你可以自由地将 UI 结构映射到一个任意的 URL，而不受配置的嵌套结构的限制。

+ 使别名以 `/` 开头，以使嵌套路径中的路径成为绝对路径
+ 可以用一个数组提供多个别名

```ts
const routes = [
  {
    path: '/users',
    component: UsersLayout,
    children: [
      // 为这 3 个 URL 呈现 UserList
      // - /users
      // - /users/list
      // - /people
      { path: '', component: UserList, alias: ['/people', 'list'] },
    ],
  },
]
```

==注意：如果路由中有参数，那么在绝对别名中也要有该参数==



### 导航守卫

有很多方式植入路由导航中：全局的，单个路由独享的，或者组件级的。

#### 全局守卫

==全局守卫注册在路由文件中==

##### 全局前置守卫

使用 `router.beforeEach` 注册一个全局前置守卫：

- **`to`**: 即将要进入的目标 
- **`from`**: 当前导航正要离开的路由 

可以返回的值如下:

- `false`: 取消当前的导航。如果浏览器的 URL 改变了(可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。
- 一个[路由地址](https://router.vuejs.org/zh/api/#routelocationraw)（对象）: 通过一个路由地址跳转到一个不同的地址，就像你调用 [`router.push()`](https://router.vuejs.org/zh/api/#push) 一样，你可以设置诸如 `replace: true` 或 `name: 'home'` 之类的配置。当前的导航被中断，然后进行一个新的导航，就和 `from` 一样。
- 如果什么都没有，`undefined` 或返回 `true`，**则导航是有效的**，并调用下一个导航守卫

```ts
const router = createRouter({ ... })

router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  return false
})
```

###### 可选的第三参数 next

这是一个常见的错误来源，可以通过 [RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0037-router-return-guards.md#motivation) 来消除错误。然而，它仍然是被支持的，这意味着你可以向任何导航守卫传递第三个参数。在这种情况下，**确保 `next`** 在任何给定的导航守卫中都被**严格调用一次**。它可以出现多于一次，但是只能在所有的逻辑路径都不重叠的情况下，否则钩子永远都不会被解析或报错。这里有一个在用户未能验证身份时重定向到`/login`的**错误用例**：

```ts
// BAD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  // 如果用户未能验证身份，则 `next` 会被调用两次
  next()
})
```

下面是正确的版本:

```ts
// GOOD
router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
  else next()
})
```



##### 全局解析守卫

用 `router.beforeResolve` 注册

它确保在导航被确认之前，**同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被正确调用**。

*是获取数据或执行任何其他操作（如果用户无法进入页面时你希望避免执行的操作）的理想位置。*

内容和前置守卫一致



##### 全局后置守卫

`router.afterEach()`注册

==不会接受 `next` 函数也不会改变导航本身：==

*它们对于分析、更改页面标题、声明页面等辅助功能以及许多其他事情都很有用。*

它们也反映了 [navigation failures](https://router.vuejs.org/zh/guide/advanced/navigation-failures.html) 作为第三个参数：

```ts
router.afterEach((to, from, failure) => {
  if (!failure) sendToAnalytics(to.fullPath)
})
```



#### 路由独享的守卫

可以直接在路由配置上定义 `beforeEnter` 守卫：

```ts
const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: (to, from) => {
      // reject the navigation
      return false
    },
  },
]
```

 **只在进入路由时触发**，不会在 `params`、`query` 或 `hash` 改变时触发

你也可以将一个函数数组传递给 `beforeEnter`

```ts
function removeQueryParams(to) {
  if (Object.keys(to.query).length)
    return { path: to.path, query: {}, hash: to.hash }
}

function removeHash(to) {
  if (to.hash) return { path: to.path, query: to.query, hash: '' }
}

const routes = [
  {
    path: '/users/:id',
    component: UserDetails,
    beforeEnter: [removeQueryParams, removeHash],
  },
  {
    path: '/about',
    component: UserDetails,
    beforeEnter: [removeQueryParams],
  },
]
```



#### 组件内的守卫

你可以为路由组件添加以下配置：

- `beforeRouteEnter`
- `beforeRouteUpdate`
- `beforeRouteLeave`

==返回 false 就取消路由==

```ts
const UserDetails = {
  template: `...`,
  beforeRouteEnter(to, from) {
    // 在渲染该组件的对应路由被验证前调用
    // 不能获取组件实例 `this` ！
    // 因为当守卫执行时，组件实例还没被创建！
  },
  beforeRouteUpdate(to, from) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 `/users/:id`，在 `/users/1` 和 `/users/2` 之间跳转的时候，
    // 由于会渲染同样的 `UserDetails` 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 因为在这种情况发生的时候，组件已经挂载好了，导航守卫可以访问组件实例 `this`
  },
  beforeRouteLeave(to, from) {
    // 在导航离开渲染该组件的对应路由时调用
    // 与 `beforeRouteUpdate` 一样，它可以访问组件实例 `this`
    // 通常用于防止用户未保存就离开
  },
}
```

`beforeRouteEnter` 守卫 **不能** 访问 `this`，因为守卫在导航确认前被调用，因此即将登场的新组件还没被创建。

不过，你可以通过传一个回调给 `next` 来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数：

```ts
beforeRouteEnter (to, from, next) {
  next(vm => {
    // 通过 `vm` 访问组件实例
  })
}
```

注意 `beforeRouteEnter` 是支持给 `next` 传递回调的唯一守卫。对于 `beforeRouteUpdate` 和 `beforeRouteLeave` 来说，`this` 已经可用了，所以*不支持* 传递回调，因为没有必要了



##### 组合式API的导航守卫

Vue Router 将更新和离开守卫作为 组合式 API 函数公开：

```ts
import { onBeforeRouteLeave, onBeforeRouteUpdate } from 'vue-router'
```

但是在里面无法访问 this



### active-class 切换router-link的样式

![image-20230114180335302](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202301141803414.png)

router-link 中的属性，当路由到它指定的地方时启动样式



### 其他高阶特效——动画、滚动

见[滚动行为 | Vue Router (vuejs.org)](https://router.vuejs.org/zh/guide/advanced/scroll-behavior.html)



## mitt 实现任意组件之间的通信以及跨框架通信

**安装**

- 推荐使用yarn安装（用过都知道有多丝滑）

```js
yarn add mitt
复制代码
```

- 或者通过npm安装

```js
npm install --save mitt
```



### 暴露方法

该对象暴露了下列方法：

+ `.emit('事件名', ...arguments)`：抛出事件
+ `.on('事件名', 处理函数)`：监听事件
+ `.clear()`：取消所有的 mitte 事件
+ `.off('事件名', 处理函数)`：取消指定的 mitte 事件

==所有事件名都可以写成 '*' 匹配所有的事件==

### 简单使用

```tsx
import mitt from 'mitt';
const emitter = mitt();
```

1. mitt 库默认导出的是一个函数，我们需要执行它从而得到事件总线的对象
2. 然后将这个对象传给各个组件（可以使用 vue 插件的全局设置来弄（在 main.ts 中））

```ts
import mitt from 'mitt';
const emitter = mitt();

let app = createApp(App);
app.config.globalProperties.$emitter = emitter;

app.use(router).mount('#app');
```

3. 在组件中使用，该对象暴露了下列方法：
   + `.emit('事件名', ...arguments)`：抛出事件
   + `.on('事件名', 处理函数)`：监听事件
   + `.clear()`：取消所有的 mitte 事件
   + `.off('事件名', 处理函数)`：取消指定的 mitte 事件

组件1（抛出事件）

```vue
<template>
    <div>
        <button @click="clicked">+</button>
    </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue';

let emitter = getCurrentInstance()?.appContext.config.globalProperties.$emitter;

function clicked(){
    emitter.emit('update', 5);
}
</script>
```

组件2（监听事件）

```vue
<template>
    <div>{{num}}</div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, ref } from 'vue';
let emitter = getCurrentInstance()?.appContext.config.globalProperties.$emitter;

let num = ref(0);

function changeNum(newNum:number){
    num.value = newNum;
}
emitter.on('update', changeNum);
</script>
```





## 轮子

### 可拖动按钮

```vue
<template>
    <div v-show="hide" class="move-button" ref="moveBtn" @mousedown="btnDown" @touchstart="btnDown" @mousemove="btnMove"
        @touchmove="btnMove" @mouseup="btnEnd" @touchend="btnEnd" @touchcancel="btnEnd">
        <div class="button-mainbg"></div>
    </div>
</template>
  
<style scoped>
.move-button {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    position: fixed;
    z-index: 10;
    color: #FFF;
}

.button-mainbg {
    position: relative;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: gray;
    background-size: 50px 50px;
}
</style>

<script setup lang="ts">
import { onMounted, ref } from "vue";

let hide = true;
let img;
let flags = false;
let position = {
    x: 0,
    y: 0
}
let nx = 0, ny = 0, dx = 0, dy = 0;
let xPum = 0, yPum = 0;
let isShow = false;
let moveBtn: any = ref();
let timer: any = null;
let currentTop = 0;

let handleScrollEnd = function () {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    if (scrollTop === currentTop) {
        hide = true;
        clearTimeout(timer);
    }
}

let hideButton = function () {
    timer && clearTimeout(timer);
    timer = setTimeout(() => {
        handleScrollEnd();
    }, 300);
    currentTop = document.documentElement.scrollTop || document.body.scrollTop;
    hide = false;
}

onMounted(() => {
    window.addEventListener('scroll', hideButton);
})

function btnDown(event: any) {
    flags = true;
    let touch;
    if (event.touches) {
        touch = event.touches[0];
    } else {
        touch = event;
    }
    position.x = touch.clientX;
    position.y = touch.clientY;

    dx = moveBtn.value.offsetLeft;
    dy = moveBtn.value.offsetTop;
}

function btnMove(event: any) {
    if (flags) {
        let touch;
        if (event.touches) {
            touch = event.touches[0];
        } else {
            touch = event;
        }
        nx = touch.clientX - position.x;
        ny = touch.clientY - position.y;

        xPum = dx + nx;
        yPum = dy + ny;

        let clientWidth = document.documentElement.clientWidth;
        let clientHeight = document.documentElement.clientHeight;


        if (xPum > 0 && xPum < (clientWidth - moveBtn.value.offsetWidth)) {
            moveBtn.value.style.left = xPum + "px";
        }
        if (yPum > 0 && yPum < (clientHeight - moveBtn.value.offsetHeight)) {
            moveBtn.value.style.top = yPum + "px";
        }

        //阻止页面的滑动默认事件
        document.addEventListener("touchmove", handler, {
            passive: false
        });
    }
}

function btnEnd() {
    flags = false;
    document.addEventListener('touchmove', handler, {
        passive: false
    });
}

function handler(event: any) {
    if (flags) {
        event.preventDefault();
    } else {
        return true;
    }
}

</script>
```



## PWA

PWA：渐进式网页应用

- 消息推送
- 主屏ICON，全屏访问
- 离线存储

==注意：Service Worker 必须运行在 https 或本地 local 环境中==



### manifest.json

***manifest.json***中进行相关设置，可以让我们的网页和手机app一样使用（可以放桌面、有应用名、图标）

在HTML页面的头部，引入一个链接

```html
<link rel="manifest" href="/manifest.json">
```



#### 基础案例

```json
{
  "start_url": "/",
  "name": "MyApp",
  "short_name": "MyApp",
  "icons": [
      {
          "src": "./icons/apple-touch-icon-180x180.png",
          "type": "image/png",
          "sizes": "180x180"
      },
      {
          "src": "./icons/apple-touch-icon-152x152.png",
          "type": "image/png",
          "sizes": "152x152"
      }
        // ...其他尺寸192、512
  ],
  "display": "standalone",
  "background_color": "#1b2740",
  "theme_color": "#1b2740"
}
```

#### 属性介绍

> 只介绍部分常用的属性

- **name**

  WebApp的名称。

  用户保存WebApp到桌面时，将作为App的名称。

- **short_name**

  为应用程序提供简短易读的名称。 这是为了在没有足够空间显示Web应用程序的全名时使用。

  ```json
  "short_name": "I/O 2017"
  ```
  
- **icons**

  应用程序图标。

  用户保存WebApp到桌面时，根据适配，将作为App的图标



```json
"icons": [
  {
    "src": "icon/lowres.webp",
    "sizes": "48x48",
    "type": "image/webp"
  },
  {
    "src": "icon/lowres",
    "sizes": "48x48"
  },
  {
    "src": "icon/hd_hi.ico",
    "sizes": "72x72 96x96 128x128 256x256"
  },
  {
    "src": "icon/hd_hi.svg",
    "sizes": "72x72"
  }
]
```

| 字段    | 描述                                                         |
| :------ | :----------------------------------------------------------- |
| `sizes` | 包含空格分隔的图像尺寸的字符串。                             |
| `src`   | 图像文件的路径。 如果`src`是一个相对URL，则基本URL将是manifest的URL。 |
| `type`  | 提示图像的媒体类型。此字段的目的是允许用户代理快速忽略不支持的媒体类型的图像。 |

- **start_url**

  启动WebApp时，默认进入的URL。

  ```json
  "start_url": "/home"
  ```

- **theme_color**

  定义应用程序的默认主题颜色。

  修改电量/信号栏 背景颜色(需要浏览器支持)

  ```json
  "theme_color": "aliceblue"
  ```

- **background_color**

  web应用程序预定义的背景颜色。

  启动web应用程序和加载应用程序的内容之间创建了一个平滑的过渡。

  ```json
  "background_color": "red"
  ```

- **description**

  Web应用程序的描述。

  ```json
  "description": "这是一个WebApp"
  ```

- **display**

  显示方式

  ```json
  "display": "standalone"
  ```

  | `fullscreen` | 全屏显示, 所有可用的显示区域都被使用, 并且不显示状态栏       | `standalone` |
  | ------------ | ------------------------------------------------------------ | ------------ |
  | `standalone` | 让这个应用看起来像一个独立的应用程序，包括具有不同的窗口，在应用程序启动器中拥有自己的图标等。这个模式中，用户代理将移除用于控制导航的UI元素，但是可以包括其他UI元素，例如状态栏。 | `minimal-ui` |
  | `minimal-ui` | 该应用程序将看起来像一个独立的应用程序，但会有浏览器地址栏。 样式因浏览器而异。 | `browser`    |
  | `browser`    | 该应用程序在传统的浏览器标签或新窗口中打开，具体实现取决于浏览器和平台。 这是默认的设置。 |              |



### Service Worker

==注意：Service Worker 必须运行在 https 或本地 local 环境中==

即服务工作者线程，在==网页已经关闭的情况下还可以运行==, 用来实现页面的缓存和离线, 后台通知等等功能。

#### 生命周期

1. Installing

   注册完 service worker 后，浏览器会下载并解析，默认情况下，service worker会24小时被下载一次。

2. Activating & Activated

   在脚本被安装完成后，service worker 会 依次进入 Activating 和 Activated 状态。失败则会进入Redundant 状态。

3. Redundant

   在 Installing 或 Activating 失败后，会进入此状态，在旧 service worker 被新 service Worker 取代后，也会进入此状态。



#### Catch 全局对象

注意：与 catch 相关的操作返回的均是 Promise

实例方法：

1. **`add()`** 方法接受一个 URL 作为参数，请求参数指定的 URL，并将返回的 response 对象添加到给定的 cache 中。

    `add()` 方法在功能上等同于以下代码：

   ```js
   fetch(url).then(function (response) {
     if (!response.ok) {
       throw new TypeError('bad response status');
     }
     return cache.put(url, response);
   })
   ```

2.  **`addAll()`** 方法接受一个 URL 数组，检索它们，并将生成的 response 对象添加到给定的缓存中。在检索期间创建的 request 对象成为存储的 response 操作的 key。

3. **`delete()`** 方法查询 request 为 key 的 [`Cache`](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache) 条目，如果找到，则删除该 [`Cache`](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache) 条目并返回 resolve 为 true 的 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 。如果没有找到，则返回 resolve 为 false 的 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 。

4.  **`keys()`** 方法返回一个 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) ，这个 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 将解析为一个[`Cache`](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache) 键的数组。

   请求将以它们被插入的顺序返回。

5. **`match()`** 方法，返回一个 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 解析为 (resolve to) 与 [`Cache`](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache) 对象中的第一个匹配请求相关联的[`Response`](https://developer.mozilla.org/zh-CN/docs/Web/API/Response) 。如果没有找到匹配，[`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) 解析为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)。

6. **`matchAll()`** 方法返回一个 [`Promise`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise) ，其 resolve 为 [`Cache`](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache) 对象中所有匹配请求的数组。

7. **`put()`** 方法 允许将键/值对添加到当前的 [`Cache`](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache) 对象中。

   `put()` 将覆盖先前存储在匹配请求的 cache 中的任何键/值对。

   [`Cache.add`](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache/add)/[`Cache.addAll`](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache/addAll) 不会缓存 `Response.status` ==值不在 200 范围内的响应==，而 [`Cache.put`](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache/put) 允许你存储任何请求/响应对。因此，[`Cache.add`](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache/add)/[`Cache.addAll`](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache/addAll) 不能用于不透明的响应，而 [`Cache.put`](https://developer.mozilla.org/zh-CN/docs/Web/API/Cache/put) 可以。

   

#### 处理静态缓存

在Service worker中可以缓存的包括css、js、图片等在内的几乎全部静态资源

首先定义需要缓存的路径, 以及需要缓存的静态文件的列表, 这个列表也可以通过 Webpack 插件生成。

```js
var cacheStorageKey = 'minimal-pwa-1'

var cacheList = [
  '/',
  "index.html",
  "main.css",
  "e.png"
]
```

借助 Service Worker, 可以在注册完成安装 Service Worker 时, 抓取资源写入缓存:

```js
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheStorageKey)
    .then(cache => cache.addAll(cacheList)) //将需要缓存的资源都吃进来
    .then(() => self.skipWaiting())
  )
})
```

使用 `caches.open` 方法新建或打开一个已存在的缓存,`cache.addAll`方法是请求指定连接的资源并把他们存储到这个缓存中，而使用`event.waitUntil`能保证资源被缓存完成前 Service Worker 不会被安装完成，避免发生错误。

调用 self.skipWaiting() 方法是为了在页面更新的过程当中, 新的 Service Worker 脚本能立即激活和生效。



#### 处理动态缓存

网页抓取资源的过程中, 在 Service Worker 可以==捕获到 fetch 事件==, 可以编写代码决定如何响应资源的请求:

```js
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response != null) {
        return response
      }
      return fetch(e.request.url)
    })
  )
})
```

真实的项目当中, 可以根据资源的类型, 站点的特点, 可以专门设计复杂的策略。fetch 事件当中甚至可以手动生成 Response 返回给页面。



#### 版本控制

前面说到，有新的 service worker 后，旧版本的页面会被全部关闭，此时就需要我们清理旧的缓存了，如何识别并找出旧版本的缓存就是重点了。而cacheStorage 提供了简单的API，便于我们能查找出旧的缓存资源。其中CACHE_PREFIX是应用的cache前缀，CACHE_VERSION是本次cache的版本号。

```javascript
function deleteCache() {
    return caches.keys().then(function (keys) {
        var all = keys.map(function (key) {
            if (key.indexOf(CACHE_PREFIX) !== -1 && key.indexOf(CACHE_VERSION) === -1){
                  console.log('Delete success-->' + key);
                  return caches.delete(key);
            }
        });
        return Promise.all(all);
    });
}
```



#### 白名单控制

并不是所有的旧的缓存都不需要，有些缓存可以一直使用，所以需要设置一个白名单，当Service Worker 被激活的时候，将不在白名单中的缓存删掉。

```javascript
const noDelete = ['you_no_delete_source.js'] // 白名单
function deleteCache() {
    return caches.keys().then(function (keys) {
        var all = keys.map(function (key) {
            if (key.indexOf(CACHE_PREFIX) !== -1 && key.indexOf(CACHE_VERSION) === -1 && !noDelete.includes(key)){
                  console.log('Delete success-->' + key);
                  return caches.delete(key);
            }
        });
        return Promise.all(all);
    });
}
```



#### pwa缓存策略

pwa有许多种缓存策略，比如优先使用缓存、优先用网络、优先网络然后用网络资源更新缓存等等

https://juejin.cn/post/6844903613962305543



#### 浏览器缓存

浏览器中有多种缓存

优先级：MEMORY CACHE => PWA => DiskCache => pushCache（调用顺序）

+ Memory Cache

![img](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202302011619980.jpeg) 

最先触发，设置方法是通过http首部设置强缓存和协商缓存策略，它们会命中该缓存

+ PWA

  传输协议必须为 HTTPS或本地local环境中

  第二个触发，通过监听fetch事件

  它的并发请求速度稳定，在访问并发量比较大的时候速度较DiskCache快

  我们可以在使用PWA时进行一个竞争

  ```js
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      (async function () {
        const res = Promise.race([
          // 请求 ServiceWorker Cache
          cache.open(CACHE_NAME).then(cache => cache.match(event.request)),
          // 请求 DiskCache 或者网络资源
          fetch(event.request)
        ]) //注意这里还没有返回
      })();
    );
  });
  ```

  直接向外抛出fetch，如果Disk Cache或者网络请求更快，会让该期约直接解决

+ Disk Cache

  存储在硬盘中的缓存，容量大

+ Push Cache

![img](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202302011617287.jpg) 



## 虚拟列表

如果一口气将长列表全部渲染出来会卡得死，虚拟列表就是为了渲染长列表而诞生的

虚拟列表其实是==按需显示==的一种实现，即==只对可见区域进行渲染==，对非可见区域中的数据==不渲染或部分渲染==的技术，从而达到极高的渲染性能。

### 实现

首次加载时仅加载处于可见区域中的部分表项

滚动发生时通过滚动距离动态计算哪些表项在视口中，并将非可视区域内存在的列表项删除。

由于只是对`可视区域`内的列表项进行渲染，所以为了==保持列表容器的高度并可正常的触发滚动==，将HTML结构设计成如下结构：

```html
<div id="app">
  <div class="container">
    <div class="empty"></div>
    <ul class="list">
      <li class="item"></li>
    </ul>
  </div>
</div>
```

- `container` 为`可视区域`的容器
- `empty` 为容器内的占位，==高度为总列表高度，用于形成滚动条==
- `list` 为列表项的`渲染区域`，设置 `display: flex;` ，让 *list* 和 *empty* 并排展示（左右并排）

**计算过程：**

+ 获取基本信息，包括：单个表项的高度、总列表高度（用于设置占位元素的高度）、显示区域的高度、总共可以显示的量

  此处仅有单个 item 的高度我们是直接固定的

  注意：建议在onMounted中进行初始化，因为 ref 无法第一时间取得到等待dom渲染

  + `emptyHeight = itemHeight * oriData.length(列表总量);`

  + `containerHeight = containerElement.clientHeight` 这个容器元素是渲染好的，可以获取到它的高度

  + `itemCount = Math.ceil(containerHeight / itemHeight);` 向上取整，多渲染一个以对应元素只滚上去一半，下面显示一半的情况

+ 在视口中的内容：`start + itemCount`

+ 滚动计算：start、偏移量

  由于我们实际并没有渲染那么多的项，所以实际高度是不足的，需要对表单进行偏移（向下）

  + `start = Math.floor(scrollTop / itemHeight)`

  + `translateY = scrollTop - (scrollTop % itemHeight)`

    让偏移量能被 itemHeight 整除（这样子在第一个可视元素没被划出去之前偏移量不会改变，他就能只显示一半了，否则就是第一个元素永远对齐顶部）

    偏移时可以用 translate3d 来使用硬件加速

### 实际代码

```vue
<template>
  <div class="fullPage" ref="page">


    <div class="container" ref="container" @scroll="scroll">
      <div class="empty" :style="{ height: `${data.emptyHeight}px` }"></div>
      <ul class="list" :style="{ transform: `translate3d(0,${translateY},0)` }">
        <li class="item" v-for="(item, index) in listData" :key="item" :style="{ height: `${data.itemHeight}px` }">
          {{ item }}
        </li>
      </ul>
    </div>


  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed, onMounted } from 'vue';

let container = ref();
const oriData = Array.from({ length: 1000 }, (v, k) => k) //假数据

//基础数据，只需要初始化，之后无需改动
const data = reactive({
  itemHeight: 20,   //单个表项的高度
  emptyHeight:0,    //总列表高度(占位)
  containerHeight:0,//显示区域的高度
  itemCount:0       //总共可以显示多少
})
function init(){ //初始化上列数据主要是因为ref无法第一时间取得到等待dom渲染
  data.emptyHeight = data.itemHeight * oriData.length;
  data.containerHeight = container.value.clientHeight; //获取显示区域高度
  data.itemCount = Math.ceil(data.containerHeight / data.itemHeight);
}
onMounted(() => {
  init();
})


let start = ref(0);
//由于只渲染了可视部分的，所以实际高度并不够，需要进行偏移
const translateY = ref(); //偏移量
const listData = computed(() => { //计算属性，随着start更新它也会更新
  let showList = oriData.slice(start.value, start.value + data.itemCount + 1);
  return showList;
})

function scroll(event: any) { //更新start和偏移量
  const { scrollTop } = event.target;
  start.value = Math.floor(scrollTop / data.itemHeight);
  translateY.value = scrollTop - (scrollTop % data.itemHeight) + 'px';
}

</script>

<style scoped>
* {
  margin: 0;
}

.container {
  background-color: gray;
  height: 200px;
  width: 30%;
  overflow: auto;
  display: flex;
}
</style>
```

![image-20230203194514381](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202302031945465.png) 



## 秒杀页面——更精确的计时

往往秒杀页面的计时器使用的是 setTimeout() 或者是 setInterval() 实现的

由于 Js 是单线程的，这些异步函数依托于事件循环运行，在计时器结束时并不会立刻执行，而是加入到等待队列中等待循环到它，导致实际运行间隔比设置的大一些

反映到我们的页面上就会出现明明手机时间过了抢购时间，但是页面显示慢几秒，页面迟迟不更新

### 解决方法：

计算误差，对每次的定时器进行修正，保证达到平均1秒的效果。

误差计算：

+ 通过 Date 对象获取标准时间
+ 通过 startTime + counter*1000（1s = 1000ms）计算得到现在计时器的时间
+ 两者相减得到误差

拿到误差后，让定时器提前误差时间终止

js 模拟：

```js
const interval = 1000; //1s
let startTime = new Date().getTime();

//由服务器返回时间与startTime计算得出的
//实际应当先让服务器返回endTime然后再获取startTime，得到countdown
//以此减少由于网络延迟造成的误差影响
let countdown = 50000;

let countDownStart = (() => {
    let counter = 0;
    return function () {
        counter++;
        //计算误差并算出下一次的计时时间
        let offset = new Date().getTime() - (startTime + counter * interval);
        let nextTime = interval - offset;
        if (nextTime < 0) {
            nextTime = 0
        }
        countdown -= interval;
        console.log("误差：" + offset + "ms，下一次执行：" + nextTime + "ms后，离活动开始还有：" + countdown + "ms");

        if (countdown < 0) { //页面要更新，同时结束计时器
            clearTimeout(timeCounter);
        } else {
            timeCounter = setTimeout(countDownStart, nextTime);
        }
    }
})();

let timeCounter;
if (countdown >= 0) {
    timeCounter = setTimeout(countDownStart, interval);
}
```

![image-20230204205339726](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202302042053815.png) 
