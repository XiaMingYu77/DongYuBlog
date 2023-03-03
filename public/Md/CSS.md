# CSS



## 添加样式

==不要把样式放到 body 或者页面底部==，浏览器只有知道全部的 CSS 信息才能给出最佳响应，且需要减少 HTTP 请求

此外最好将 \<script> 标签添加到 HTML 底部的结束标签之前，以避免 “渲染阻塞”（或者在 \<head> 中的 \<script> 标签添加 async 和 defer 属性，前者异步下好了立即执行，后者会等待 HTML 解析完成）

### CSS 选择符

#### 简单选择符

1. **元素选择符**

   ```css
   <style>
       p {
           color: blue;
       }
   </style>
   ```

   如上，会选中所有的 p 标签元素

2. **后代选择符**

   ```css
   <style>
       header h1{
           color: blue;
       }
   </style>
   ```

   只会选中 header 标签下的子标签 h1，下面是对应 html

   ```html
   <header>
       <h1>How I became a CSS Master</h1>
       <p>I'm not blue</p>
   </header>
   ```

   结果：

   ![image-20220902085821825](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209020858863.png)

   这个可以复合其它的类型选择符使用（父选择符+空格+子选择符）

3. **ID 选择符**

   ```css
   <style>
       #m1{
           color: red;
       }
   </style>
   ```

   选中 ID 为 m1 的元素

4. **类选择符**

   ```css
   <style>
       .intro{
           color: red;
       }
   </style>
   ```

   

#### 高级选择符

高级选择符相对于上面的没那么灵活和强大

1. **子选择符**

   与后代选择符不同，子选择符只会选择一个元素的直接后代（>）

   ```css
   <style>
       #myDiv > p{
           color: red;
       }
   </style>
   ```

   html:

   ```html
   <div id="myDiv">
       <p>p1</p>
       <div>
           <p>p2</p>
       </div>
   </div>
   ```

   如果使用后代选择符，所有的后代（包括嵌套起来的），这里只会选中 p1

2. **同辈选择符**

   这个选择符不好用，别弄

   + 相邻同辈选择符：+，选中同辈的下一个元素
   + 一般同辈选择符：~，选中同辈的后面所有元素

   同辈选择符不允许向前选择（考虑浏览器性能）

3. **通用选择符**

   使用 * 匹配任何元素

   ==这个别单独用，他会覆盖那些本来有默认样式的元素==

   还可以用 "," 来匹配多个可选元素 

   

#### 属性选择符

属性选择符基于元素是否有某个属性或者某属性是否有对应值来选择元素

1. **是否存在某属性**

   ```css
   <style>
       abbr[title]{
           border-bottom: 1px dotted #999;
       }
       abbr[title]:hover{
           cursor: help;
       }
   </style>
   ```

   :hover 实现了让鼠标指针浮动在其上，这个后面说

   html：

   ```html
   <p>The term <abbr title="self-contained underwater breathing apparatus">SCUBA</abbr> is an acronym rather than an abbreviation as it is pronounced as a word.</p>
   ```

   指针悬停在带有 title 元素的元素上时多数浏览器会显示一个词条，但是不明显，现在这里我们给了一个下划线、让指针到上面时指针改成问号

2. **属性是否有某值**

   ```css
   <style>
       input[type="submit"]{
           cursor: pointer;
       }
   </style>
   ```

   上指针移动到表单提交按钮时固定显示为手

   **有时候我们需要考虑属性值是否匹配某个模式**，而非某个特定值

   + 以某些字符开头：`a[href^="http:"]`
   + 以某些字符结尾：`img[src$=".jpg"]`
   + 包含某些字符：`a[href*="/about/"]`
   + 匹配以空格分隔的字符串中的属性值（比如 rel 属性的值）：`a[rel~=next]`
   + 匹配以指定值开头或指定值后连一个短划线：`a[lang|=en]`（这样就可以匹配到 en 和 en-us）

   ```css
   a {
     color: blue;
   }
   
   /* 以 "#" 开头的页面本地链接 */
   a[href^="#"] {
     background-color: gold;
   }
   
   /* 包含 "example" 的链接 */
   a[href*="example"] {
     background-color: silver;
   }
   
   /* 包含 "insensitive" 的链接，不区分大小写 */
   a[href*="insensitive" i] {
     color: cyan;
   }
   
   /* 包含 "cAsE" 的链接，区分大小写 */
   a[href*="cAsE" s] {
     color: pink;
   }
   
   /* 以 ".org" 结尾的链接 */
   a[href$=".org"] {
     color: red;
   }
   ```
   
   

#### 伪元素

有时候我们想选择的页面区域并不是通过元素来表示的，而我们也不想为页面添加额外的标记。CSS 为这种情况提供了一种特殊选择符：伪元素

| 伪元素         | 描述                     | 伪元素   | 描述     |
| -------------- | ------------------------ | -------- | -------- |
| ::first-letter | 选择一段文本的第一个字符 | ::before | 内容开头 |
| ::first-line   | 选择一段文本的第一行     | ::after  | 内容结尾 |

::before 和 ::after 非常适合用来插入小图标以及版面装饰符号

给伪元素添加样式和给其他元素添加一样

```css
    .chapter::before{
        content: '“';
        font-size: 15em;
    }
    .chapter p::first-letter{
        float: left;
        font-size: 3em;
    }
```

**伪元素与元素的区别:**

无法通过JS获取其DOM

无法通过浏览器开发者工具直接查看

伪元素默认是 inline

**使用伪元素注意事项：**

1.使用伪元素 before,after 必须设置 content

2.使用伪元素 before,after 显示背景图，一定要使用 display 设置为块元素

3.使用伪元素 before,after 设置为display:inline-block,需要再次设置 vertical-align:middle

![image-20220902113452987](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209021134026.png) 



#### 伪类

==这里列举的伪类不多，更多伪类请见：[伪类 - CSS（层叠样式表） | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)==

有时候我们想基于文档结构以外的情形来为页面添加样式，比如基于超链接或表单元素的状态

伪类用于选择元素的特定状态或关系

1. **最常见的用于超链接伪类**（基础样式表中应该始终包含它们）

   ```css
    /*未访问过的超链接为蓝色*/
       a:link{
           color: blue;
       }
       /*访问过的超链接为绿色*/
       a:visited{
           color: green;
       }
       /*链接在鼠标悬停及获取键盘焦点时为红色*/
       a:hover,a:focus{
           color: red;
       }
       /*活动状态时为紫色*/
       a:active{
           color: purple;
       }
   ```
   
   ==注意：link 和 visited 必须在用户交互的那些之前（这样用户操作时就可以将之前的样式覆盖掉）==

   需要留意的是在触摸屏和键盘等输入方式下不一定整点有悬停状态，因此不要在重要的交互功能中使用 :hover

2. **目标与反选**

   + 目标：

     表示选择匹配 E 的所有元素，且匹配元素被相关 URL 指向。该选择器是动态选择器，只有当存在 URL 指向该匹配元素时，样式效果才能够有效。

     :target 在CSS里发生效力的过程是这样的：当浏览器地址里的hash(地址里#号后面的部分)和 :target 伪选择器指定的ID匹配上时，它的样式就会在这个ID元素上生效。

     ```html
     <!DOCTYPE html>
     <html>
     
     <head>
         <meta charset="UTF-8">
         <style>
             /* would apply to all targetted elements */
             :target {
                 color: #000;
             }
             /* applies to H2's */
             h2:target {
                 color: #f00;
             }
         </style>
     </head>
     <body>
     
     <div>
         <p>点击下面的链接，你会看到浏览器地址是hash值的变化，以及相应链接的CSS样式变化！这是:target伪选择器在起作用。</p>
         <p>
             <a href="#anchor">Heading 1</a> |<br>
             <a href="#anchor2">Heading 2</a> | </p>
         <h2 id="anchor">Anchor 1</h2>
         <h2 id="anchor2">Anchor 2</h2>
     </div>
     
     </body>
     
     </html>
     ```

   + 反选：

     **`:not()`**，用来匹配不符合一组选择器的元素

     ```css
     /* 选择所有不是段落（p）的元素 */
     :not(p) {
       color: blue;
     }
     ```

     ==注意：可以和伪类一起使用产生很好用的效果==
   
   + :nth-child() 选择器：
   
     规定属于其父元素的第二个子元素的每个 p 的背景色：
   
     ```css
     p:nth-child(2)
     {
     background:#ff0000;
     }
     ```
   
     注意：这个不限定元素类型，传入2就是第二个元素
   
   + :nth-of-type() 选择器
   
     规定属于其父元素的第二个 p 元素的每个 p：
   
     ```css
     p:nth-of-type(2)
     {
     background:#ff0000;
     }
     ```
   
     注意：这个是限制元素类型的

#### 结构化伪类

结构[伪类选择器](https://so.csdn.net/so/search?q=伪类选择器&spm=1001.2101.3001.7020)，可以根据元素在文档中所处的位置，来动态选择元素，从而减少HTML文档对ID或类的依赖，有助于保持代码干净整洁。

| 选择器              | 说明                                                         |
| ------------------- | ------------------------------------------------------------ |
| E:last-child        | 选择父元素的倒数第一个子元素E，相当于E:nth-last-child(1)     |
| E:first-child       | 选择父元素的第一个子元素E                                    |
| E:nth-child(n)      | 选择父元素的第n个子元素，n从1开始计算                        |
| E:nth-last-child(n) | 选择父元素的倒数第n个子元素，n从1开始计算                    |
| E:first-of-type     | 选择父元素下同种标签的第一个元素，相当于E:nth-of-type(1)     |
| E:last-of-type      | 选择父元素下同种标签的倒数第一个元素，相当于E:nth-last-of-type(1) |
| E:nth-of-type(n)    | 与:nth-child(n)作用类似，用作选择使用同种标签的第n个元素     |
| E:nth-last-of-type  | 与:nth-last-child作用类似，用作选择同种标签的倒数第一个元素  |
| E:only-child        | 选择父元素下仅有的一个子元素，相当于E:first-child:last-child或E:nth-child(1):nth-last-child(1) |
| E:only-of-type      | 选择父元素下使用同种标签的唯一子元素，相当于E:first-of-type:last-of-type或E:nth-of-type(1):nth-last-of-type(1) |
| E:empty             | 选择空节点，即没有子元素的元素，而且该元素也不包含任何文本节点 |
| E:root              | 选择文档的根元素，对于HTML文档，根元素永远HTML               |



**这个数值参数可以使用表达式形式**

1. 奇数：odd、偶数：even
2. 表达式，如 3n+4 需要注意可能的从 0 溢出

结构伪类选择器很容易遭到误解，需要特别强调。如，==p:first-child 表示选择父元素下的第一个子元素 p，而不是选择 p 元素的第一个子元素。==

需要注意的是，结构伪类选择器中，子元素的==序号是从 1 开始的==，也就是说，第一个子元素的序号是 1，而不是 0。换句话说，当参数 n 的计算结果为 0 时，将不选择任何元素。

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <style>
        .tabMenu li:first-child {
            color: red;
        }
        .tabMenu li:last-child {
            color: green;
        }
    </style>
</head>
<body>

<ul class = "tabMenu">
    <li><a href="# ">公司介绍</a></li>
    <li><a href="# ">产品中心</a></li>
    <li><a href="# ">新闻动态</a></li>
</ul>

</body>

</html>
```

![image-20220902135146189](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209021351225.png) 



#### 表单伪类

| 选择器       | 说明                                                         |
| ------------ | ------------------------------------------------------------ |
| E:focus      | 选择父节点下，获取到焦点的 E 元素                            |
| E:hover      | 选择光标指定到的元素                                         |
| E:required   | 选择父节点下，有必选 required 属性的 E 元素                  |
| E:optional   | 选择父节点下，无必选 required 属性的 E 元素                  |
| E:valid      | 选择父节点下，内容有效的 E 元素                              |
| E:invalid    | 选择父节点下，内容无效的 E 元素                              |
| E:default    | 匹配一组关联元素中的默认元素，例如一组默认选中的按钮中的单选按钮 |
| E:checked    | 匹配一组关联元素中被选中的元素                               |
| in-range     | 针对 type 值为 number 且设置了 max 和 min 属性               |
| out-of-range | 针对 type 值为 number 且设置了 max 和 min 属性               |
| read-only    | 针对 readonly 属性                                           |
| read-write   | 针对 readonly 属性                                           |

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <style>
        #myForm input:valid{
            outline: 2px solid green;
        }
        #myForm input:invalid{
            outline: 2px solid red;
        }
        #myForm input:focus{
            outline: black;
        }
    </style>
</head>
<body>

<form id="myForm">
    <label for="myForm">Name:</label>
    <input type="text" required>
    <label for="myForm">Phone:</label>
    <input type="text" required>
    <label for="myForm">Email:</label>
    <input type="email" required>
    <button type="submit">提交</button>
</form>

</body>

</html>
```

![image-20220903110338734](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209031103776.png)

### 层叠

#### 层叠

在比较复杂一点的样式表中都可能存在多条规则选择同一个元素的情况。CSS 通过**层叠**来解决这样的冲突

层叠机制通过不同的重要程度来处理覆盖

+ 通过样式表的来源设置优先级
+ `!important`：在 CSS 中具有最高优先级

下面是重要级别排序：

+ 标注为 `!important` 的用户样式
+ 标注为 `!important` 的作者样式
+ 作者样式
+ 用户样式
+ 浏览器（或用户代理）的默认样式

```css
.myDiv{
    color: red !important;
}
.myDiv{
    color: blue;
}
```

```html
<div class="myDiv"> Hello </div>
```

会显示为红色

==由于层叠机制的存在，我们必须考虑好样式表的次序==



#### 特殊性

**还需要留意的是写在不同地方、不同写法的样式表特殊性不一样**，关键在于其特殊性

1. 写在元素的 style 属性中
2. 通过 ID 属性应用的规则
3. 其他规则：
   1. 类选择符应用
   2. 元素选择符应用

总之这个就是指代越精确它的优先度越高

应用特殊性可以先为公用元素设置默认样式，然后在特殊的元素上覆盖这些样式



### 继承

有些属性会被应用它们的元素的后代继承

需要注意的是这样的继承没有任何的特殊性，所以会被任何应用到元素上的样式所覆盖（需要注意通用选择符的影响）



### 为文档应用样式

#### link 与 style 元素

1. 本地加载

   样式可以放在 style 元素中，直接放在文档的 head 部分

   ```html
   <head>
       <style>
          .myDiv{
              color: red !important;
          }
          .myDiv{
              color: blue;
          }
       </style>
   </head>
   ```

   如果样式不多且希望立即加载可以这么用

2. 外部加载

   ==更加推荐使用 link 元素==

   **使用 link 元素**能让我们从外部样式表中获取，从而使样式表能够在多个页面中重用

   ````html
   <link href="hello.css" rel="stylesheet">
   ````

   这行代码会告诉浏览器把 hello.css 文件下载下来，并将其作为样式应用到网页上

   此外还可以**使用 @import 指令**加载外部 CSS 文件

   ```html
       <style>
           @import "hello.css";
       </style>
   ```

   注意：在外部样式表中也可以用此方法来添加样式



### attr() 引入html元素中的属性值

`attr()` 用来获取选择到的元素的某一 HTML 属性值，并用于其样式。它也可以用于伪元素，属性值采用伪元素所依附的元素。

***备注：** `attr()` 理论上能用于所有的 CSS 属性但目前支持的仅有伪元素的 [`content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/content) 属性，其他的属性和高级特性目前是实验性的译者注：如果发现浏览器兼容表里 attr() 的高级用法依旧没有良好的支持的话，本文大部分内容都是纸上谈兵*

```css
.cars td:before {
    width: 40%;
    display: inline-block;
    font-style: italic;
    content: attr(data-lable); /*引入html标签中的属性*/
}
```



### 浏览器统一

reset.css 或者 normalize.css

将这两个的内容直接放到我们的 css 头部

- 不同的浏览器在对于CSS没有定义的一些样式属性是不一样的，
- 比如没有在自己的CSS里面规定超链接有没有下划线的时候，有些浏览器有，有些浏览器没有；
- 再比如有一些浏览器规定的超链接默认颜色是蓝色，有一些又是黑色。
- 而这个CSS的功能就是对几乎所有的默认样式进行重置，让所有的浏览器上对于未定义的样式浏览效果达到一致
- （虽然说无法完全一致，但至少可以消除掉大部分差距）

normalize.css：[Normalize.css: Make browsers render all elements more consistently. (necolas.github.io)](http://necolas.github.io/normalize.css/)



## 可见格式化模型

浮动、定位和盒模型是学习 CSS 需要掌握的几个最重要的概念。这几个概念决定了元素在页面上的显示和排布的方式

### 盒模型

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209031339581.jpg" alt="mmexport1662183547528" style="zoom: 50%;" />

对元素盒子而言内边距、外边距都不是必须的，因此默认值为 0 

#### 盒子属性

与安卓那边不一样，这里我们有几种大小计算的模式

1. **content-box**：默认模式，在这里它会将 width 应用给内容区（不包括内边距和边框）
2. **border-box**：此时 width 属性是元素所有可见部分（包括内边距和边框）这个更加直观

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        .myDiv1{
            width: 100px;
            height: 30px;
            padding: 5px;
            border: 5px;
            margin: 20px;
            outline: 2px solid black;
        }
        .myDiv2{
            box-sizing: border-box;
            width: 100px;
            height: 30px;
            padding: 5px;
            border: 5px;
            margin: 20px;
            outline: 2px solid black;
        }
    </style>
</head>
<body>
<div class="myDiv1"> Hello </div>
<div class="myDiv2"> Hello </div>
</body>
</html>
```

第一个是默认模式，第二个使用 border-box，结果也就不一样

![image-20220903133536398](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209031335433.png) 

可以看到不光是宽度，高度计算也和上面描述一致（设置元素高度应当特别注意！！！因为高度应当由其内容共同决定）

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209031339581.jpg" alt="mmexport1662183547528" style="zoom: 50%;" /> 

除开基本的边距属性，还有诸如 margin-left 等这样子指代性更高的属性，命名规则和安卓一样

**百分比符号**

此外和安卓那边一样，可以==使用百分比符号==使得子元素固定占据父元素一部分大小的区域

```html
<div class="group" style="outline:2px solid black; height: 10px; width: 300px">
    <article class="block" style="outline:2px solid black; height: 10px"></article>
</div>
```

```css
<style>
    .group .block{
        box-sizing: border-box;  //如果这里使用默认模式，计算时会不准确（边距等因素影响）
        width: 33.3%;
    }
</style>
```

![image-20220903134502828](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209031345862.png) 

*注意 ：对 margin 之类的边距属性使用百分比符号，取的仍然是父元素的宽度属性为基础值*



#### 最大值和最小值

可以给元素设置诸如 min-width 和 max-width 值

这样对于响应式布局非常有用，它使得元素大小会处在一个合适的范围内

*注意：设置高度需要格外注意，因为元素高度通常应取决于其所包含的内容*，因此不论在什么情况下，在必须设置高度时请使用 min-height



#### 当 width 设置为百分比情况下得到正方形元素

关键：padding 设置为百分比时，参照的是元素的宽度

```css
 .content{
     width: 30%;
     background-color: aqua;
     height: 100%;
 }
 .content::before{
     content: "";
     display: block;
     padding-top: 100%;
 }
```

使用伪元素，用 padding 将其撑开，然后将元素放进去就行了

==注意：==在这个里面放东西（内容部分）会导致高度大于100%宽度，所以想在里面放东西的话，请使用*绝对布局*（拿出文档流）



### 可见格式化模型

**块级元素和行内元素区别**

1. 行内元素同一行水平排列。
2. 块级元素各占据一行，垂直方向排列。
3. 块级元素可以包含行内元素和块级元素。但行内元素不能包含块级元素。
4. 行内元素与块级元素属性的不同，主要是盒模型属性上。
5. 行内元素设置 width 无效，height 无效(可以设置 line-height)，margin 上下无效，padding 上下无效

可以通过**修改样式 display 属性**改变元素是以块级还是行内元素呈现：

+ 当 display 的值设为 block 时，元素将以块级方式呈现；
+ 当 display 值设为 inline 时，元素将以行内形式呈现；
+ 当 display 值设为 none 时，浏览器不生成盒子（元素及其内容不会显示且不占用文档空间）

如果想让一个元素可以设置宽度高度，又让它以行内形式显示，我们可以设置 display 的值为 inline-block。



1. **块级盒子**

   块状元素==排斥其他元素与其位于同一行==，可以设定元素的宽（width）和高（height），块级元素一般是其他元素的容器，可容纳块级元素和行内元素。常见的块级元素有div, p ,h1~h6等。

   ```
    1 <address>//定义地址
    2 <caption>//定义表格标题
    3 <dd>    //定义列表中定义条目
    4 <div>     //定义文档中的分区或节
    5 <dl>    //定义列表
    6 <dt>     //定义列表中的项目
    7 <fieldset> //定义一个框架集
    8 <form> //创建 HTML 表单
    9 <h1>    //定义最大的标题
   10 <h2>    // 定义副标题
   11 <h3>     //定义标题
   12 <h4>     //定义标题
   13 <h5>     //定义标题
   14 <h6>     //定义最小的标题
   15 <hr>     //创建一条水平线
   16 <legend>    //元素为 fieldset 元素定义标题
   17 <li>     //标签定义列表项目
   18 <noframes>    //为那些不支持框架的浏览器显示文本，于 frameset 元素内部
   19 <noscript>    //定义在脚本未被执行时的替代内容
   20 <ol>     //定义有序列表
   21 <ul>    //定义无序列表
   22 <p>     //标签定义段落
   23 <pre>     //定义预格式化的文本
   24 <table>     //标签定义 HTML 表格
   25 <tbody>     //标签表格主体（正文）
   26 <td>    //表格中的标准单元格
   27 <tfoot>     //定义表格的页脚（脚注或表注）
   28 <th>    //定义表头单元格
   29 <thead>    //标签定义表格的表头
   30 <tr>     //定义表格中的行
   ```

2. **行内盒子**

   行内元素==不可以设置宽（width）和高（height），但可以与其他行内元素位于同一行==，行内元素内一般不可以包含块级元素。行内元素的高度一般由元素内部的字体大小决定，宽度由内容的长度控制。常见的行内元素有a, em ,strong等。

   ```
    1 <a>     //标签可定义锚
    2 <abbr>     //表示一个缩写形式
    3 <acronym>     //定义只取首字母缩写
    4 <b>     //字体加粗
    5 <bdo>     //可覆盖默认的文本方向
    6 <big>     //大号字体加粗
    7 <br>     //换行
    8 <cite>     //引用进行定义
    9 <code>    // 定义计算机代码文本
   10 <dfn>     //定义一个定义项目
   11 <em>     //定义为强调的内容
   12 <i>     //斜体文本效果
   13 <img>     //向网页中嵌入一幅图像
   14 <input>     //输入框
   15 <kbd>     //定义键盘文本
   16 <label>     //标签为 input 元素定义标注（标记）
   17 <q>     //定义短的引用
   18 <samp>     //定义样本文本
   19 <select> // 创建单选或多选菜单
   20 <small>     //呈现小号字体效果
   21 <span>     //组合文档中的行内元素
   22 <strong> //加粗
   23 <sub>     //定义下标文本
   24 <sup>     //定义上标文本
   25 <textarea>     //多行的文本输入控件
   26 <tt>     //打字机或者等宽的文本效果
   27 <var>    // 定义变量
   ```

3. **可变元素**

   根据上下文语境决定转为块级元素还是行内元素。

   ```
   1 <button>     //按钮
   2 <del>    // 定义文档中已被删除的文本
   3 <iframe>     //创建包含另外一个文档的内联框架（即行内框架）
   4 <ins>     //标签定义已经被插入文档中的文本
   5 <map>     //客户端图像映射（即热区）
   6 <object>     //object对象
   7 <script>     //客户端脚本
   ```



使用表格相关的标记（table、tr、th 等可以让表格本身表现为块级元素），表格的内容根据生成的行列排布。还可以使用 display 属性让表格元素采用表格的布局方式

后面的 Flexbox、Grid Layout 等 CSS 模块进一步扩展了 display 属性



#### 外边距折叠

**常规块盒子**有一个**外边距折叠**机制：

垂直方向上的两个外边距相遇时，会折叠成一个外边距，==折叠后的外边距高度等于两者中较大者==

==需要注意的是：这种折叠机制发生在任何两个外边距相遇的情况==，无论是上下元素间、元素嵌套（当没有边框或内边距分隔时）、同一个元素（空元素，没有边框或内边距）

而且这个折叠可以持续发生（如果可以的话能一直叠下去）

（这个折叠解决了段间距和上页边距不同的问题）

==这个折叠只发生在常规块盒子==，的垂直方向上，行内盒子、浮动盒子、绝对定位盒子的外边距均不会发生折叠

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209031932451.jpg" alt="mmexport1662204750069" style="zoom: 50%;" /> 



#### 元素定位

指定不同的 position 属性的值可以让元素有不同的定义方式

##### 静态定位：static

不指定 position 属性的值（默认 static），无法让元素偏移



##### 相对定位：relative

position 值设置为 relative

可以通过设置 top、right、bottom、left 属性，使该元素相对于初始位置平移一定距离<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209031946471.jpg" alt="mmexport1662205548960" style="zoom: 50%;" />

==注意：相对定位的元素原来的位置还占着==（元素相对于它在常规流中的初始位置来定位），因此这样平移可能会挡住其他元素



##### 绝对定位：absolute

position 设置为 absolute

绝对位置会将元素拿出文本流，因此它==不再占用原来的空间==。与此同时，文档流中的其他元素会各自重新定位

***绝对定位元素的包含块是距离它最近的定位祖先**（position 属性不是 static 的非静态定位元素）*，如果没有这个定位祖先，那么它就相对于文档根元素（html）定位（根元素也叫起始包含块）

==绝对定位可以用于填充其包含块的所有高度（没有明确指定高度使用的底部来填充的，这个例子在后面有），还可以设定左右两边的间距以填充中间宽度==

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209031958842.jpg" alt="mmexport1662206322801" style="zoom:50%;" />  

**z-index 属性：**z-index 的值越大越靠近用户（以解决层叠次序的问题）==这个需要配合堆叠层级使用，详情见定位里面==

绝对定位近来已经很少用来构造整体布局了，因为它脱离了常规文档流，因此很难用它们创建出自适应或者响应式的布局（Web 技术决定了不太可能指定元素在页面上的确切位置和大小）

###### 使用 clip: rect() 来裁剪元素

clip 属性剪裁绝对定位元素。clip 属性允许定义一个元素的可见尺寸，当一幅图像的尺寸大于包含此元素时，此图像就会被修剪并显示为这个元素定义的形状。

```
clip: rect(0,0,0,0);
```

分别对应图片的上，右，下，左四个方位 

注意：

- 如果先有"overflow：visible"定义了元素，clip属性就不起作用。
- css中的clip:rect()只能在绝对定位的元素上使用，包括fixed属性的元素，因为fixed也算绝对定位

根据上面对top right bottom left的释义，如果left >= right或者bottom <= top，则元素会被完全裁掉而不可见，即“隐藏”。通过这种方式隐藏的元素是可以被屏幕阅读器等辅助设备识别的，从而提高了页面的可用性。



##### 固定定位：fixed

固定定位由绝对定位衍生出来，==固定定位元素的包含块是视口==。

因此，固定定位可以用于创建始终在窗口相同位置的浮动元素（很多网站都使用它让导航区始终可见）

==注意：当父元素（不仅仅是直系）设置了 transform 会导致子元素的 fixed 退化为以该父元素为内容块的 absolute==







##### 粘性布局：sticky

这个也会脱离常规文档流，但其结果有点像固定定位和相对定位的结合

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209032018483.jpg" alt="mmexport1662207453604" style="zoom: 50%;" />

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209032019789.jpg" alt="mmexport1662207492144" style="zoom: 50%;" />

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209032019813.jpg" alt="mmexport1662207524470" style="zoom: 50%;" />

###### 行盒子与清除

==注意：常规元素盒子中的文本内容会记住浮动元素的大小并对其进行规避==

浮动就是为了实现文本环绕图片引入的一种布局模型

对受影响的元素添加 clear 属性可以清除浮动盒子的影响

clear 属性有以下值：

+ left、right、both、none
+ 用于指定盒子的哪一侧不应该紧挨着浮动盒子
+ 作用时浏览器会自动添加一个外边距



还是之前福尔摩斯探案集的例子

```css
.chapter::before{
    position: sticky;
    float: left;
    content: '“';
    font-size: 10em;
}
.chapter p::first-letter{
    position: sticky;
    float: left;
    font-size: 3em;
}
h1{
    text-align: center;
}
```

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209032036738.png" alt="image-20220903203604651"  />

排版没有仔细设置的，反正大概就是这么个意思

   

###### 浮动布局

*现在有以下的需求：左侧放一个媒体（插图、图片或视频）、右侧放一段说明文字。此外希望这两个元素被包含在一个有背景颜色的边框中*

图片左浮、文本框右浮，但是此时会出现一个问题，由于它们的浮动（被拿出文本流），导致它们的父容器——有背景颜色的边框不会占用空间

![image-20220904093344526](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209040933598.png)

可以看到边框并没有其作用（重叠在一起画出了那一条线）

*解决方法：在这个边框元素内部某处应用 clear（这样就创造出了足够的垂直外边距）*

1. 添加一个额外的空元素并给其应用 clear

   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <meta charset="UTF-8">
       <style>
           .media-block{
               background-color: gray;
               border: solid 1px black;
           }
           .media-fig{
               position: sticky;
               float: left;
               width: 20%;
           }
           .media-body{
               position: sticky;
               float: right;
               width: 55%;
           }
           .clear{
               clear: both;
           }
       </style>
   </head>
   <body>
   <div class="media-block">
       <img class="media-fig" src="1594295891872.png" alt="The pic">
       <div class="media-body">
           <h3>Title of this</h3>
           <p>Brief description of this</p>
       </div>
       <div class="clear"></div><!-- 额外添加的空div --> 
   </div>
   </body>
   </html>
   ```

   但是这个盒子可以用伪元素来创建

2. ==使用伪元素来创建盒子==

   ```css
   .media-block::after{
       content: " ";
       display: block;
       clear: both;
   }
   ```

   要设置一个内容物，还得让它以块级元素展示

   ![image-20220904094436838](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209040944900.png)





###### 块级格式化上下文

*使用 BFC 解决网页布局遇到的问题，始终要记住一个词：**隔离**。就像生死隔离一样，生与死是两个世界，互相不影响，里面的逃不出去，外面的进不来。*

下列方式会让元素建立自己的块级格式化上下文

+ display 属性为 block、inline-block 或 table-cell 之类的元素
+ 浮动元素（float 属性不为 none）
+ 绝对定位的元素
+ overflow 属性值不是 visible 的元素

格式化上下文影响布局，通常，**我们会为定位和清除浮动创建新的 BFC**，而不是更改布局，因为它将：

1. 包含内部浮动（不再溢出）

2. 块元素与浮动元素重合（使得左边界不会延伸到浮动元素底部）

3. 阻止外边距重叠（两个上下相邻的块不再发生层叠）



根据以上的说明我们有多种方式给元素**创建新的 BFC：**

1. 将 overflow 设置为 auto

   `overflow` 属性会告诉浏览器应该怎样处理溢出的内容，但是可能有副作用（可能会遇到不希望出现的滚动条或阴影）

2. 将 display 设置为 flow-root

   可以创建**无副作用**的 BFC。在父级块中使用 `display: flow-root` 可以创建新的 BFC。

   给 `<div>` 元素设置 `display: flow-root` 属性后，`<div>` 中的**所有内容**都会参与 BFC，浮动的内容不会从底部溢出。

   你可以从 `flow-root` 这个值的名字上看出来，它创建一个新的用于流式布局的上下文，类似于浏览器的根（`html`）元素。



应用这个我们可以再次变化上面的例子

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        .media-block{
            display: flow-root;
            background-color: gray;
            border: solid 1px black;
        }
        .media-fig{
            position: sticky;
            float: left;
            width: 8%;
            margin-right: 20px;
        }
        .media-body{
            overflow: auto;
            width: 20%;
        }
    </style>
</head>
<body>
<div class="media-block">
    <img class="media-fig" src="1594295891872.png" alt="The pic">
    <div class="media-body">
        <h3>Title of this</h3>
        <p>Brief description of this
            Reach the goals --山姆沃尔顿
            My life has been a trade-off

            If I wanted to reach the goals I set for myself, I had to get at it and stay at it everyday

            I had to think about it all the time .

            I had to get up everyday with my mind set on improving something.

            I was driven by a desire to always be on the top of the heap.</p>
    </div>
</div>
</body>
</html>
```

![image-20220904105354682](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209041053730.png)

###### 吸顶组件（粘性布局实现）

使用`position: sticky` 配合 [`left`, `right`, `top`, `bottom`] 中一个即可实现粘性布局

==注意：==下列情况会导致粘性失效

+ 必须满足父元素在需要粘的轴上的空间 > 粘性布局子元素在需要粘的轴上的大小（例如子元素设置`top`/`bottom`粘垂直轴，父元素的高度需要大于子元素的高度，这样才有可以活动的空间嘛）
+ 父元素不能设置 overflow 属性

`sticky` 粘性效果失效时，其表现与 `relative` 差不多

![image-20230206210125580](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202302062101644.png) 



***



## 网页排版

### CSS的基本排版技术



#### 文本颜色

正常情况下文字会被直接设置成黑色（完全黑），过高的对比度容易导致人视觉疲劳，且影响可读性

此外链接的蓝也 “过于蓝”

**推荐：**

1. 正文使用 #3b4348
2. 链接使用 #235ea7

![image-20220904121413893](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209041214945.png) 



#### 字体族

字体族（font-family）属性是一个备选字体的列表，按优先级从左往右排列，此外它是一个可继承的元素

我们看看 \<body> 元素和标签中默认的字体族：

```css
body{
    font-family: 'Georgia Pro', Georgia, Times, 'Times New Roman', Serif;
}
h1,h2,h3,h4,h5,h6{
    font-family: Avenir Next, SegoeUI, arial, sans-serif;
}
```

这种后备机制使得网页能够适配不同操作系统

其中 Serif 和 sans-serif 是通用字体族（没得选择的时候选择）

**通用字体族：**（上面两个是比较常用的）

+ Serif 和 sans-serif

+ monospace：

  *如果网页中要**显示代码**，优先使用 monospace 字体（又叫等宽字体，它也是通用的）*

+ fantasy：花式字体

+ cursive：手写字体



#### 字型大小

在设置字形大小时我们都**使用 em 单位或 rem**

1. **em 单位**

   使用 em 单位时是基于继承的

   计算方法：em X font-size缩放因子 = px（font-size 默认都是 16 像素，但是如果用户手动修改，则相应元素大小也会调整）

   ==注意：由于 em 的继承特性，这常常会出以下错误：==

   ```html
   <p style="background-color: gray">Hello</p>
   <article>
       <p style="background-color: aqua">Hello</p>
   </article>
   ```

   ```css
   p{
       font-size: 1.314em;
   }
   article{
       font-size: 1.314em;
   }
   ```

   下面那个p由于继承的影响，它的实际大小会变成：1.314x1.314x16（下面的要比理想大一圈）

   ![image-20220904124642324](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209041246367.png) 

2. **rem 单位**

   rem 始终基于根元素的 em 大小来缩放（不存在上面的继承问题）

   ```css
   p{
       font-size: 1.314rem;
   }
   article{
       font-size: 1.314rem;
   }
   ```

   ![image-20220904124857478](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209041248519.png) 



##### “纯四度” 推荐标题大小数学比例

这里推荐上一级标题会比下一级标题的字形大小大自身的 1/4（或者说下一级表）

可以使用[Modularscale](https://www.modularscale.com/)来进行预设测试



#### 行间距、对齐以及行盒子的构造

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209041301250.jpg" alt="mmexport1662267655990" style="zoom: 50%;" />

每行文本都会生成一个**行盒子**，行盒子还能进一步分成表示行内元素的**行内盒子**，或者连接两个行内盒子的**匿名行内盒子**

**内容区**：显示文本，高度由 font-size 决定（内容区不一定会限制字形，比如 g 会超出内容区）

**行高**：行盒子总高度（通俗叫做行间距，排版术语叫铅空）

**x高度：**小写字母 x 的上边界（通常该值大会显得字体大）



1. **设置行高**（line-height 属性）

   设置行高时需要考虑当前字体的大小**一般行高在 1.2~1.5 范围内**（font-size 的多少倍）

   **x 高度**较大的字体考虑将行高设置高一些

2. **垂直对齐**

   行内盒子会收到 vertical-align 属性影响

   + 默认值是 baseline（表示子元素的基线和父元素的基线对齐）
   + 还有以下值：super（上标）、sup、top、bottom、text-top、text-bottom（text-top 和这个的关系很复杂，只有父元素和行内盒子的 font-size、line-height 不同时才有用）、middle
   + 设置长度值（em 或者 %）可以让元素的基线偏离父元素基线

   ==注意：使用 vertical-align 调整文字，可能会扩展行盒子的高度==

   ```html
   <p>这个文本是专门用来演示垂直对齐效果的：<span style="vertical-align: super">super</span> <span style="vertical-align: sub">sub </span>然后是 <span style="vertical-align: top">top </span>
       <span style="vertical-align: bottom">bottom </span><span style="vertical-align: middle">middle </span>
       <span style="vertical-align: 2em">2em </span><span style="vertical-align: -100%">-100%</span>
   </p>
   ```

   这个很长没必要仔细看，看下面的图

   ![image-20220904132949236](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209041329283.png) 

#### 文本阴影

text-shadow 属性可以给文本添加阴影

语法：

指定相对于源文本 x 轴和 y 轴的偏移量（可正可负）、模糊距离（0表示完全不模糊）和颜色值，用空格分隔

```css
h1{
    text-shadow:-.2em .4em .2em #ccc
}
```





#### 文本粗细

**使用 font-weight** 指定文本粗细

+ 可以指定成关键字：normal、bold、bolder、lighter，也可以直接给出数字值（都是100的整数倍，最大900）

Avenir Next 和 SegoeUI（都是我们的首选字体），它们包含很多粗细的字体。需要注意的是如果使用的字体没有想要的粗细，浏览器可以模拟加粗（尽管效果不好），但是==无法模拟变细==



#### 下划线

text-decoration 属性可以指定下划线颜色

将该属性设置为 none 可以去除下划线



#### 斜体

设置 font-style 可以设置字体样式

| 值      | 描述                                   |
| :------ | :------------------------------------- |
| normal  | 默认值。浏览器显示一个标准的字体样式。 |
| italic  | 浏览器会显示一个斜体的字体样式。       |
| oblique | 浏览器会显示一个倾斜的字体样式。       |
| inherit | 规定应该从父元素继承字体样式。         |

![image-20220904151148960](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209041511999.png) 这两个显示起来没有什么区别，而且 oblique 很少用且很少有字体支持它



#### 大小写转换与小型大写变体

通过 text-transform 可以进行大小写转换

+ uppercase：大写
+ lowercase：小写
+ none：默认

```css
h1{
    text-transform: uppercase;
}
```

**小型大写变体：**通过 font-variant 属性，设置值为 small-caps 可以将英文文本转换为 “小型大写字母”

这时虽然字母都是大写，但是字形却缩小到了 x 高度

==注意：这个它只能将原本的小写字母转换过去，原先是大写的转换不了，需要先将其全部转为小写==

```html
<p><span style="text-transform: lowercase;font-variant: small-caps">small-caps ABC</span>;NORMAL</p>
```

![image-20220904152600133](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209041526170.png)

 

#### 换行控制与行数控制

1. 英文字符会默认将容器撑大，设置强制换行

   ```css
   .wrap {
       table-layout: fixed;
       word-wrap: break-all;
       word-break: normal;
       overflow: hidden;
   }
   ```

   + white-space: normal; 设置文字的自动换行；（默认，对亚洲这边的字符都有效）
   + white-space: pre-wrap; 设置文字的强制换行，但只对中文起作用。

   + word-break: break-all; 设置文字的强制换行，但只对英文起作用，以字母作为换行依据。
   + word-wrap: break-word; 设置文字的强制换行，但只对英文起作用，以单词作为换行依据。

2. 强制不换行，超出部分隐藏

   ```css
   .wrap {
       white-space: nowrap;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space: nowrap;
       overflow: hidden;
       text-overflow: ellipsis;
   }
   ```

   + **white-space:nowrap;** 设置文字禁止换行（强制不换行）

   + overflow:hidden; 设置把多余内容隐藏起来，不让多出来的内容撑破容器。

   + text-overflow:ellipsis; 设置多出的内容以省略号…来表达。

     注意：Opera浏览器要考虑兼容性，使用-o-text-overflow:ellipsis; 才可以实现效果

     而在Firefox浏览器中就没有这个功能了，只能把多出的内容隐藏起来。

3. 行数控制

   因使用了WebKit的CSS扩展属性，该方法适用于WebKit浏览器及移动端；

   注：

   1. -webkit-line-clamp用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的WebKit属性。常见结合属性：
   2. display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
   3. -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。

   ```css
   display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: 3;
   overflow: hidden;
   ```

   



### 版心宽度、律动和毛边

#### 行长（版心宽度）

这里讨论一个对阅读体验有很大影响的因素：行长（用排版的行话说就是**版心宽度**）

Robert Bringhurst 提到，**主体内容的文本长通常是 45~75 个字符，平均值为 66 个字符**。对于小屏幕（或者远距离观看的大屏幕，如电影等）行长也至少应该有 40 个字符

==一个字符大概 0.5em==

控制行长可以通过设定包含文本的段落、标题等元素的宽度来实现（给段落设置一个宽度上限，使用 em单位 避免字体缩放的影响）

```css
.chapter{
    max-width: 36em;
    margin: 0 auto;  //上下边界为0,左右边界auto表示根据宽度自适应居中
    color: #3b4348;
}
```

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209041809778.png" alt="image-20220904180909710" style="zoom: 67%;" />



#### 缩进与对齐

1. **缩进**

   默认情况下文本是左对齐的，我们可以给每段设置缩进

   使用 text-indent 属性

   ```css
   .chapter p{
       text-indent: 1.25em;
   }
   ```

   <img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209041815480.png" alt="image-20220904181520420" style="zoom: 67%;" />

2. **对齐**

   可以注意到上面文本的右边是参差不齐的（毛边），这在左对齐时没什么大的影响，但是在居中对齐时就很影响阅读了，需要尽量减少毛刺

   居中对齐很适合小型用户界面元素（如按钮）或短标题

   **text-align 属性：**可接受以下关键字值

   + left、right、center（**居中**）、justify（使用这个可以平均分部间距以消除毛边）
   + start、end（CSS Text Level 3 定义，为了适配不同地区的语言阅读习惯）

   使用 jastify 消除毛边时可以注意到最后一行是不应用这个修改的，我们可以通过创建内部盒子的方式让最后一行变成倒数第二行、

   ==需要注意：这里的居中对齐是让其文字内容相当于于它的容器居中，于元素没有影响==

   

#### 连字符

在 html 语言环境为英语时，可以让它自己帮我们添加连字符以减轻毛刺问题

`<html lang="en">`

然后通过 CSS 将相关元素的 hyphens 属性设置为 auto

```css
.chapter {
    hyphens: auto;
}
```



#### 多栏文本

将整篇文章的宽度都设置为 36em 可以限制版心宽度，但对于大屏幕而言，版面浪费了很多

**CSS Multi-column Layout Module 定义的属性可以让我们将文本内容切分成多个等宽的栏**

```css
.chapter {
    hyphens: auto;
    max-width: 80em;
    columns: 20em;
    column-gap: 4em;
    margin: 0 auto;
    color: #3b4348;
}
```

+ max-width：增加以能容纳下多栏
+ columns：是 column-count 和 column-width 的简写形式，如果两者同时设置，前者会作为最大栏数，后者会作为最小栏宽
+ column-gap：设置栏间距

![image-20220904185919193](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209041859270.png)

稍微改了一下html

##### 跨栏

上面的例子中的所有元素都排在了栏内文本流中。其实我们可以让某些元素排到该文本流之外，强制它们伸长以实现跨栏效果

```css
.chapter h1,hr,.source{
    column-span: all; /*或 column-span: none 关闭跨栏特性*/
}
```

![image-20220904191628020](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209041916106.png)

##### 垂直律动与基线网格

在印刷设计中一般都要遵循一种律动关系，保证正文文本都会排进**基线网格**。即使标题、引用或其他页面部件会不时打破这种律动，但是整体还是不受影响

但是可以注意到由于标题的存在，各栏中的文本并没有严格对齐

我们需要做以下**调整：**

==**解决方法：** 所有标题的上外边距 + 行高 + 下外边距 = n * 正文行高 (倍数n，为正整数)==

```css
.chapter h1{
    font-size: 1.75rem;
    line-height: 1.25;
    margin-top: 1rem;
    margin-bottom: 1rem;  //和为5
}
.chapter hr{
    margin-top: 0.625rem;
    margin-bottom: 0.625rem; //和为1.25
}
```

这里我们使用的是 1.25 倍行距

![image-20220904195154289](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209041951366.png)



### Web 字体

上面我们使用的字体都是用户电脑上有的，现在正式开始教怎么在网页中嵌入远程字体

#### 许可

多数字体设计者都施加了安全限制，比如只允许从指定的域名下载字体，或者要求定期修改字体，以防止盗链

*Web 字体托管服务，是尝试使用 Web 字体最简单的方式，有一些是收费的，比如 Adobe Typekit，它们会负责一切。还有一些免费的比如 Google Fonts*

使用字体托管的好处在于复杂的事情我们不用管，只用关系如何在自己的网站中使用就行了

#### @font-face 规则

嵌入 Web 字体的关键字是 @font-face。通过它可以指定浏览器下载 Web 字体的服务器地址，以及如何在样式表中引用该字体

```css
@font-face {
    font-family: Vollkorn;
    font-weight: bold;
    src: url("fonts/vollkorn/Vollkorn-Bold.woff") format('woff');
}
h1, h2, h3{
    font-family: Vollkorn, Georgia, Serif;
    font-weight: bold;
}
```

@font-face 块中声明了在 font-family 值为 Vollkorn 且为粗体时应该应用此规则，之后提供了一个 URL，供浏览器下载包含粗体字体的 Web 开放字体格式

声明了新字体 Vollkorn 后就可以在随后的 css 中通过 font-family 属性正常使用它了

1. **字体文件格式**

   所有现代浏览器都支持 WOFF 格式，有些支持较新的 WOFF2

   **src 中可以声明多个值**，让浏览器自己选择，以适配不同浏览器

   ```css
   @font-face {
       font-family: Vollkorn;
       src: url("fonts/vollkorn/Vollkorn-Bold.woff") format('woff2'),
       url("fonts/vollkorn/Vollkorn-Bold.woff") format('woff'),
       url("fonts/vollkorn/Vollkorn-Bold.woff") format('embedded-opentype'),
       url("fonts/vollkorn/Vollkorn-Bold.woff") format('truetype'),
       url("fonts/vollkorn/Vollkorn-Bold.woff") format('svg');
   }
   ```

   上面的代码涵盖了各种浏览器以及各种远古版本，之后只会使用 WOFF 和 WOFF2

2. **字体描述符**

   @font-face 规则可以接受几个声明，多数是可选的，常见的如下：

   + font-family：必须，字体族的名称
   + src：必须，URL 或 URL 列表，用于下载字体
   + font-weight：可选的字体粗细，默认值为 normal
   + font-style：可选的字体样式，默认为 normal

   ==注意：与通常规则中的 font 属性不一样，这几个不是属性而是**字体描述符**==，它们只是告诉浏览器什么情况下可以触发使用这个特定的字符文件

   *这里有一个陷阱：上面的例子中我们只定义了一次 Vollkorn，那么其他粗细也会使用此字体文件（font-family 的优先级更高）*

   我们可以**为同一字型定义不同粗细不同文件**

   

#### 使用 JavaScript 加载字体

css 加载需要等待网络资源加载完毕后文字才能显示，而使用 js 动态加载我们可以先显示一个不一样的，然后将其替换为我们要的

FontFace 对象，通过使用 javascript 来定义字体对象，并且引入客户端没有安装得字体文件，可以是者服务器端，或者是第三方字体库文件

==这是一个新的对象方法==

```javascript
concat fontFace  = new FontFace('fontFamily', 'url(fontUrl) | ArrayBuffer', descriptors);
```

参数说明：

1. fontFamily：字符串，自定义的要应用到页面或者元素中得字体名称；

2. fontUrl：字符串，字体文件的路径，可以是第三方字体文件路径,但是需要请求的地址服务器开启跨越访问，此值必须要用url()包裹起来；

3. ArrayBuffer：用于描述的外部资源构建的二进制编码数组

4. descriptions：对象形式，可选值，用来设置字体归属于那种属性下的字体规则，如字体样式，字体加粗，字体字符串范围等，还有该规则的显示行为等；可以设置的值：

+ family: 定义字体名称，这里的设置会被第一个参数值替代，但是我们可以通过实例对象的fontFace.family属性进行更改。
+ style: 设置当前字体规则的font-style值，也就是当应用改规则的元素设置了相对于的值将加载改字体规则，取值为对应css中的font-style取值；
+ weight: 设置字体的粗细值，对应css中的font-weight取值；
+ stretch: 设置如何拉伸字体，对应css中的font-stretch取值；
+ unicodeRange: 定义字体支持的UNICODE字符范围
+ variant: variant
+ featureSettings: Feature settings
+ display：设置字体在没有加载完的显示规则取值如下：
  + auto 字体显示策略由用户代理定义。
  + block 为字体提供一个短暂的阻塞周期和无限的交换周期。也就是说等字体加载完以后字体显示效果会自动更新成改字体
  + swap 为字体提供一个非常小的阻塞周期和无限的交换周期。也就是说等字体加载完以后字体显示效果会自动更新成改字体
  + fallback 为字体提供一个非常小的阻塞周期和短暂的交换周期。也就是说等字体加载在过了一定的交互周期后加载完字体将不进行更新显示
  + optional 为字体提供一个非常小的阻塞周期，并且没有交换周期。也就是说等字体加载不进行更新显示

**FontFace 对象方法：**

1. `load()`：`FontFace`对象为我们提供了一个方法，表示当字体文件加载完毕以后的方法，它返回一个`Promise`对象，并且使用当前的`FontFace`对象进行解析



##### 将创建的FontFace字体添加到页面中

我们创建完对象以后并不能直接在页面中生效，需要我们通过`FontFaceSet`对象方法将字体添加到页面中，才能使页面中的字体生效，我们可以通过使用`document.fonts`隐式引用`FontFaceSet`对象，并且使用它的`add()`方法将字体添加到页面。

**通过字体Promise回调添加**

```javascript
var myFonts = new FontFace('myFontName', 'url(ShouShu.ttf)',{});
myFonts.load().then((loadFace)=>{
    document.fonts.add(loadFace);
});
```



##### 在页面中使用字体

1. **css 中先定义好，之后页面加载完成后由 js 补充**

   ```html
   <!-- css -->
   <style>
     .box{
       font-family: myFont; /*这里我们先定义好使用的字体*/
     }
   </style>
   
   <!-- html -->
   <div class="box">执子之手，方知子丑，泪流满面，子不走我走</div>
   
   <!-- js -->
   <script>
     // 页面加载完以后加载字体文件
     window.onload = function(){
       var myFonts = new FontFace('myFont', 'url(ShouShu.ttf)',{display: 'swap'});
       myFonts.load().then(function(loadFace){
         document.fonts.add(loadFace);
       });
     }
   </script>
   ```

2. js 直接更改元素样式



### 高级排版特性

如果使用的 OpenType 特性，那么在大多数现代浏览器中都可以控制更多的 CSS 特性

可以通过特定属性和一种底层属性指定（见 [`font-feature-settings`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/font-feature-settings)）来控制。

某些字体中启用了这些特性的一或多个（通常是字偶距 [kerning] 和默认连字），而其他特性留给设计师或开发者选择性地在特定场景中启用。

#### [了解字体的可用特性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Fonts/OpenType_fonts_guide#了解字体的可用特性)

有时，最麻烦的问题在于你没有字体的说明文档（许多字体设计师和厂商会提供样张和 CSS 范例，以便用户了解字体特性）。不过，有一些网站可以方便地显示出字体特性。例如，访问 [wakamaifondue.com](https://wakamaifondue.com/)，把你的字体文件拖到圈里（页面上有提示），过一会就可以得到该字体文件功能、特性的完整报告。[Axis-praxis.org](https://axis-praxis.org/) 也提供类似的功能，只需点击一下字体特性，就可以在相应的文本块中打开或关闭这些特性。



**高级特性的一些作用**

- **连字**（比如“ﬀ”或“ﬁ”）可以使字母间距更均匀，阅读更流畅。
- **分数形式**，可以让家居装修、食谱网站变得更易阅读和理解。
- 文本段落中的“老式”**数字风格**和小写字母搭配更合适；“表格数字”在表格里的费用清单里排列得更整齐；而“齐行”数字单独使用或与大写单词搭配使用显得更为统一。

```css
/* 启用 small-caps */
.ex1 { font-feature-settings: "smcp" on; }

/* 将大写和小写都转换为小型大写字母 */
.ex2 { font-feature-settings: "c2sc", "smcp"; }

/* 没有常见的连字 */
.ex3 { font-feature-settings: "liga" 0; }

/* 任意连字 */
.ex3 { font-feature-settings: "dlig"; }

/* 启用自动分数 */
.ex4 { font-feature-settings: "frac"; }
```



#### 使用 js 库来获取更加优秀的排版

可以使用 JavaScript 提升排版的品质（jQuery 排版插件）



## 盒子的美化

### 背景颜色

可以使用 background-color 或者 background（这是一个简写属性，可以同时设置多种属性） 来为盒子添加背景颜色

使用 background 需要注意可能会覆盖之前的属性

#### 颜色值与不透明度

1. **十六进制表示法**

   #+三组十六进制数值（每组各两位）

   如果三组数字的两位数字相同可以简写：#aabbcc -> #abc

2. **rgb() 函数式表示法**

   每个值用一个十进制数值表示（0~255），也可以是一个百分比值

3. **rgba() 表示法**

   rgb() 的升级，多了一个控制透明度的阿尔法通道（0~1.0，1.0表示完全不透明）

**通过 opacity 属性控制不透明度**，==但是注意：使用该属性改变透明度后，无法再让它的子元素变得不透明==，可以利用这个实现元素淡出效果



### 背景图片

CSS 为我们提供了一系列操作图片的方法

**背景图片与内容图片：**

内容图片使用 html 的 \<img> 标签来添加

背景图片通过 css 添加 background-image

+ 如果去除掉图片后网页本身仍然有意义，那么该图片就可以当做背景图片
+ 去除图片后网页观感完全变样，且图片本身具有意义，那么应该作为内容图片

```css
.profile-box{
    width: 100%;
    height: 600px;
    background-color: #8Da9cf;
    background-image: url("对不起.png");
}
```

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209050902244.png" alt="image-20220905090211024" style="zoom:25%;" /> 

可以看到效果并不理想，图片在整个元素盒子中平铺，呈拼贴状

1. **禁止重复**

   background-repeat 属性的默认值为 repeat

   + repeat-x：沿 x 轴重复
   + repeat-y：沿 y 轴重复
   + on-reapeat：完全禁止重复

   后来新规则==扩展了该属性==

   1. 扩展语法：支持以空格分隔分别对两个方向进行设置
   2. 扩展关键字：
      + space：如果（未经裁剪和缩放的）背景图片可以在元素内完全重复两次以上，那么它就会重复相应次数，图片直接补充空白
      + round：图片会被缩放使得恰好能在元素中重复整数次

   ==这些重复特性没啥用，一般情况下直接给它关了==



#### 加载图片（以及其他文件）

1. 相对路径：

   + url(img/cat.jpg)：会在保存当前样式表的目录的 img 子目标中寻找图片
   + url(/img/cat.jpg)：以斜杠开头，会在相对于 CSS 文件所在域的顶级目录的 img 子目录中寻找图片

2. 绝对路径

3. 数据 URL：

   数据 URL 的值由文件中二进制编码的数据转换而来的长字符串，很多工具可以实现这样的转换

   这里提供一个[dataURL在线转换 - base64图片转换工具 - whsir在线工具](https://tools.whsir.com/dataurl/)

   数据 URL 会导致样式表体积增大，但是减少了 HTTP 请求



#### 图片格式

+ JPGE：位图格式，有损压缩，适合照片。不支持透明度设置
+ PNG：位图格式，无损压缩（会很大），适合图标、插图等小尺寸文件。支持阿尔法透明度设置
+ GIF：早期位图格式，现在多用于动图（虽然 PNG 也有动图，但是支持不好）。支持透明度设置，但是不支持阿尔法分级
+ SVG：矢量图格式，本身也是一种标记语言。可以直接嵌入到网页中，也可以作为资源引用
+ WebP：Google 开发的一种新图片格式，结合了 JPGE 的高压缩率与 PNG 的阿尔法透明特性。目前支持还参差不齐

之前弄过安卓就知道 SVG 的矢量图用来做图标之类的相当方便，它可以任意缩放、使用代码控制各种细节



#### 背景图片语法

##### 背景位置

背景图片的位置由 **background-position 属性**控制

该属性可以使用关键字、像素、em、百分比（只有使用百分比的时候是对应图片中心位置，其他都是左上角）

使用关键字时：

+ x 轴：left、center、right
+ y 轴：top、center、bottom

```css
.profile-box{
    width: 100%;
    height: 600px;
    background-color: #8Da9cf;
    background-image: url("对不起.png");
    background-repeat: no-repeat;
    background-position: 50% 50%;
}
```

该属性现在支持**添加外边空**声明：先写边间关键字，再写长度值

```css
.profile-box{
    background-position: right 1em top 50%; /*表示放在距离右侧1em、距离上边缘50%的位置*/
}
```

**使用 calc() 函数定位**

```css
.profile-box{
    background-position: calc(100% - 1em) 50%; /*表示放在距离右侧1em、上下居中的位置*/
}
```

加空格是为了区分负数和减号，可以在里面操作多种单位



#### 背景裁剪与原点

##### 背景裁剪

默认情况下，背景图片时绘制在元素边框以内的，我们将边框颜色设置出来并且让它半透明我就就能看到这个效果

background-clip 属性可以改变其裁剪行为：

+ border-box：默认，图片在边框内
+ padding-box：图片在内边距盒子内
+ content-box：图片仅在内容区

展示：==只有裁剪方式变了，定位方式不变 padding-box（默认）==

![image-20220905114958506](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209051149617.png)

```css
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        header{
            box-sizing: border-box;
            display: inline-block;
            width: 33%;
            height: 300px;
            background-color: #8Da9cf;
            background-image: url("对不起.png");
            background-repeat: no-repeat;
            background-position: 50% -30em;
        }
        header{
            border: 10px solid rgba(220, 220, 160, 0.5);
        }
        .profile-box2{
            background-clip: padding-box;
        }
        .profile-box3{
            padding: 1em;
            background-clip: content-box;
        }
    </style>
</head>
<body>
<header class="profile-box1"></header>
<header class="profile-box2"></header>
<header class="profile-box3"></header>
</body>
<script>

</script>
</html>
```

##### 更改原点

可以使用 background-origin 属性控制原点位置：

+ border-box
+ padding-box（默认）
+ content-box



#### 背景附着

正常情况下背景会附着在指定元素后面，跟着元素移动

可以**通过 background-attachment 属性**来改变这样的行为

```css
.profile-box{
    background-attachment: fixed;
}
```

应用这个之后就能让图片看起来好像是锚定的，元素更像一个展示框，会上下动

这个属性有以下**可选值**：

+ scroll：默认
+ fixed：与页面锚定
+ local：让背景图片相对于元素内的内容固定（即如果这个元素是一个可滚动的，背景图片会随着内容滚动（元素大小固定，overflow 设置为 auto 或 scroll 且内容超出元素范围））

![image-20220905133128296](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209051331546.png)

这里贴出所有代码：

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        header {
            box-sizing: border-box;
            display: inline-block;
            width: 100%;
            height: 30rem;
            background-color: #8Da9cf;
            background-image: url("对不起.png");
            background-repeat: no-repeat;
            background-position: 50% 180%;
        }

        .personal {
            display: inline-block;
            background-color: saddlebrown;
            position: relative;
            top: 55%;
            left: 2%;
        }

        .personal, .personalImg {
            border-radius: 0.5em;
        }

        .personalText {
            border-radius: 999em;
        }

        .personalImg {
            box-sizing: border-box;
            object-fit: cover;
            object-position: 75% 50%;
            width: 12rem;
            height: 15rem;
            margin: 0.5rem;
        }

        .personalText {
            box-sizing: border-box;
            margin: 0.5rem;
            background: antiquewhite;
            font-size: 1.25rem;
            text-align: center;
            line-height: 1.25;
        }

        .profile-box {
            background-attachment: fixed;
            background-size: cover;
        }

        .article h1 {
            text-align: center;
            font-size: 2.5em;
            color: #3b4348;
        }

        .article p {
            text-align: center;
            color: #3b4348;
        }

        .author {
            font-style: italic;
        }

        .personal {
            box-shadow: .25em .25em .5em rgba(0, 0, 0, 0.3);
        }
    </style>
</head>
<body>
<header class="profile-box">
    <div class="personal">
        <img src="1594295891872.png" class="personalImg">
        <h1 class="personalText">墨屿洺qwq</h1>
    </div>
</header>
<article class="article">
    <h1>《我爱这土地》</h1>
    <hr>
    <p class="author">作者：艾青</p>
    <p>假如我是一只鸟，</p>
    <p>我也应该用嘶哑的喉咙歌唱：</p>
    <p>这被暴风雨所打击着的土地，</p>
    <p>这永远汹涌着我们的悲愤的河流，</p>
    <p>这无止息地吹刮着的激怒的风，</p>
    <p>和那来自林间的无比温柔的黎明……</p>
    <p>——然后我死了，</p>
    <p>连羽毛也腐烂在土地里面。</p>
    <p>为什么我的眼里常含泪水？</p>
    <p>因为我对这土地爱得深沉……</p>
</article>
</body>
</html>
```



#### 背景大小

我们想要我们的这个页面可以在任意大小的显示器上显示，那么我们就需要考虑缩放的问题

使用 background-size 指定图片大小，为了保证它适配各种显示器，需要使用百分号，后面那一个 auto 是为了让它能保持图片比例缩放

```css
.profile-box{
    background-size: 100% auto;
}
```

+ contain：尽可能保持图片最大化，会露白
+ cover：缩放以覆盖元素同时不会变形（这个就是我们想要的效果）



### 多重背景

到目前为止我们都是使用一张图片作为背景，虽然一般来说也是这样的

Level 3 Background and Borders 规范在支持一个元素设置多个背景图片

1. background-imge：背景属性可以使用**多值语法**，使用逗号 "," 分隔
2. background-position：可以分别设置每一个图片的位置，同样使用 "," 分隔
3. background-repeate：同样能分别进行设置重复

==如果随后的属性值没有图片多，那么最后一个属性会重复==

```css
.multi-bg{
    background-image: url(img/spades.png),url(img/hearts.png);
    background-position: left top, right top;
}
```

多重背景按照声明的先后顺序自上而下堆叠（最后声明的在最底下（颜色层在最底下））

同样可以使用简写属性来声明



### 边框与圆角

之前我们浅用过盒模型的边框

==注意一点：圆角对布局不产生影响，但是对可点击区域有影响==

**边框属性：**

+ 可以分别为盒子的各边设置边框，也可以一次性为四边都设置
+ border-width 设置边框宽度，也可以类似 border-top-width 这样为某一条边设置
+ border-color 设置颜色
+ border-style 设置边框样式（同样可以为不同边分别指定）：
  + solid：实线
  + dashed：虚线
  + dotted：虚点
  + none：删除全部边框
+ border 简写属性来设置所有边框属性

#### 圆角

**使用 border-radius 属性**，可以设置圆角

这是一个简写形式，可以一次性设置盒子4个角的半径

```css
.personal,.personalText,.personalImg{
    border-radius: 0.5em;
}
```

![image-20220905144922392](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209051449450.png) 

**分别设置：**

1. 使用 border-radius 属性，左上角开始，顺时针依次列出各个值（同样存在重用的规则）
2. 使用 border-top-left-radius、... 等属性分开设置



#### 正圆和胶囊形状

border-radius 属性还可以接收百分比

**创建圆形：**将圆角半径设置为 50%

**胶囊形：**将圆角半径设置得很大，以得到半圆形，最后拼接得到胶囊



#### 边框图片

Level 3 Background and Borders 规范还允许开发者指定一张图片作为边框。

**border-image 属性**支持把一张图片切成 9 块，我们只需要管切分规则，浏览器会自动进行无变形切割

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209051710705.jpg" alt="mmexport1662369002179" style="zoom:25%;" /> 

该属性会自动将每一块对应到相应的位置上，不过我们也可以改变这样的行为

此外也可以告诉浏览器让这几个图片如何覆盖边框，如：拉伸、重复、补白。默认情况下每边中段的图片会拉伸、

```css
.motto {
    border: 40px solid #f9b256;
    border-image: url("VCG211359309448.png") 40%;
    width: fit-content;
}
```

![image-20220905172348061](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209051723110.png) 

本来之前这个最大的用途就是创建圆角边框，但是显然现在不需要了，这个操作的使用频率也就不高了



### 盒阴影

**使用 box-shadow 属性给元素添加阴影**

（这个和 text-shadow 属性的语法类似，但是这个后面可以多加一个可选的值用于扩展半径，使用 insert 关键字可以实现内阴影）

```css
.personal {
    box-shadow: .25em .25em .5em rgba(0, 0, 0, 0.3);
}
```

![image-20220905174640370](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209051746430.png) 已经加上了阴影

**扩展半径：**用于扩展阴影的大小，这个值默认为0，即阴影与元素一样大，增大这个值阴影相应增大，负值缩小

```css
.personal {
    box-shadow: .25em .25em .5em .25em rgba(0, 0, 0, 0.3);
}
```

![image-20220905175110743](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209051751802.png) 阴影大了一圈



#### 内阴影

使用 insert 关键字

把元素当成投影表面，可以创造出一种镂空效果（之前是悬浮）

```css
.personal {
    box-shadow: inset 0 -.5em .5em  .5em rgba(0, 0, 0, 0.3);
}
```

![image-20220905175516456](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209051755524.png) 内陷效果



#### 多阴影

甚至可以给一个元素应用多个阴影，以逗号分隔多组值

可以利用这个创建出多边框效果（使用不同颜色且模糊半径设置为0）、



### 渐变

background-image 属性支持渐变色

在背景上使用渐变色是一种常用设计

假设我们有一个个人主页，用户尚未上传背景图片，我们就可以来显示一个渐变背景

```css
.profile-box {
    background-image: linear-gradient(to bottom, #b4d9f3 0%, #546479 100%);
}
```

![image-20220905195235446](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209051952547.png)

#### 线性渐变

linear-gradient() 函数，参数：

+ 角度（方向）：可以使用关键字（to bottom（默认方向）、to top left）或者角度（...deg）

+ 颜色与所在位置 x 2，（所在位置默认分别是 0%、100%），当然位置还可以使用绝对位置指定

  

#### 放射渐变

从一个中心点开始向四周扩散，覆盖的范围可以是圆形或椭圆形

radial-gradient() 函数，参数稍微复杂一点：

+ 放射渐变的类型：circle（圆）、ellipse（椭圆形）

+ 射线半径（决定渐变范围大小）：

  + 圆形只接收一个半径，只接收长度值，不能用百分比
  + 椭圆接收 x y 值，且可以用百分比

  还可以接收关键字：closest-side、farthest-side（最近边、最远边）；closest-corner、farthest-corner（最近角、最远角）

+ 渐变区域中心位置：**使用 at 关键字**表示它是位置，x y 值（可以是绝对值，也可以是%）

+ 色标沿渐变方向指定，逗号分隔

```css
.profile-box {
    background-image: radial-gradient(circle closest-corner at 50% 70%, #cfdfee, #2c56a1);
}
```

![image-20220905202648024](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209052026370.png)

可以重复几次相同的色标

```css
.profile-box {
    background-image: radial-gradient(circle closest-corner at 50% 70%, #cfdfee, #2c56a1, #cfdfee, #2c56a1, #cfdfee, #2c56a1);
}
```

![image-20220905202803026](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209052028341.png)

#### 重复渐变

repeating-linear-gradient()

repeating-radial-gradient()

==这两个实现出来效果异常烂，不仅一点都不渐变而且还很多毛刺==



### 为嵌入图片和元素添加样式

文档中的图片与其他元素不同，它本身是有像素宽度和高度的，而且宽度和高度的比例固定。

在可伸缩设计时我们需要元素宽度随着浏览器窗口宽度变化而变化，这时就要用 CSS 控制



#### css 插入图片资源

我们没办法直接指定 src，但是我们可以同 contain 属性来添加



#### 控制对象大小

我们需要控制图片的大小，同时需要避免它的变形

我们可以**使用 object-fit 属性**来控制缩放

+ fill：填满容器，会变形

+ contain：保留其长宽比，会留边

+ cover：保留长宽比，会裁剪

+ none：保持其原有的尺寸

+ scale-down：内容的尺寸与 `none` 或 `contain` 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些

  

### 可保持宽高比的容器

对于具有固定宽高比的位图，把高度设为 auto，只改变宽度，或者把宽度设置为 auto，只改变高度都是可以的

*但是如果是没有固定宽高比的元素，我们需要在其可伸缩的同时保持固定宽高比，那么我们需要一些特别的操作*

**\<iframe>、\<object> 元素就属于这样的情形，某些情况下的 SVG 内容也是**

例子：用 \<iframe> 嵌入网页

```css
.myWebSite{
    width: 100%; /*给一个可伸缩的宽度*/
}
```

![image-20220905212411714](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209052124866.png)

现在它的宽高比是不固定的，显然我们也无法通过设置其高度来解决这个问题（很可能会变成 150 像素，CSS 规定对于没有大小的可替代内容（如 iframe、img、object），最终的默认大小时 300 像素宽或 150 像素高），实测下来确实是这样的

**为了解决这个尴尬的问题，我们需要给它穿一个外套**

1. 让这个外层的元素具有我们想要的宽高比：

   ```css
   .object-wrapper{
       width: 100%;
       height: 0;
       padding-bottom: 45%; /*之前介绍过，如果内边距和外边距使用百分比设置，那么它们实际上是基于包含块的*/
   }
   ```

   ==如果我们正常设置高度是没有办法实现指定是我们需要的百分值的==，多余的高度会被吃掉

   此时我们拥有了一个具有宽高比的元素

2. 现在我们想让我们的目标元素填满准备的外套元素（正常的静态布局由于之前我们设置 height 为0，会导致无法显示）

   将模板元素设置为绝对布局，然后将外套元素设置为相对布局（目的是为了让外套成为模板元素的包含块）

   ```css
   .object-wrapper{
       width: 100%;
       height: 0;
       padding-bottom: 45%;
       position: relative;
   }
   .myWebSite {
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
   } 
   ```

   <img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209052201701.png" alt="image-20220905220158533" style="zoom: 50%;" /> 

如果我们以后想更改大小，比如缩一半，我们可以直接在外面再套一个外套

```css
.outer {
    width: 50%;
    height: 0;
    padding-bottom: 22.5%;
    position: relative;
}
```

```html
<div class="outer">
    <div class="object-wrapper">
        <iframe class="myWebSite" width="420" height="315" src="https://www.bilibili.com/" allowfullscreen></iframe>
    </div>
</div>
```

![image-20220905220743175](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209052207321.png)

### 减少图片大小

这个需要借助一系列的工具来压缩图片大小

压缩工具：https://tinypng.com/ 在线转换

SVG 图形：Jake Archibald 的 OMGSVG 可以帮忙优化（这个工具可以离线使用）



***



## 光标美化

每个能悬停光标的地方都能设置 cursor 属性

| 值          | 描述                                                         |
| :---------- | :----------------------------------------------------------- |
| *url*       | 需使用的自定义光标的 URL。**注释：**请在此列表的末端始终定义一种普通的光标，以防没有由 URL 定义的可用光标。 |
| default     | 默认光标（通常是一个箭头）                                   |
| auto        | 默认。浏览器设置的光标。                                     |
| crosshair   | 光标呈现为十字线。                                           |
| pointer     | 光标呈现为指示链接的指针（一只手）                           |
| move        | 此光标指示某对象可被移动。                                   |
| e-resize    | 此光标指示矩形框的边缘可被向右（东）移动。                   |
| ne-resize   | 此光标指示矩形框的边缘可被向上及向右移动（北/东）。          |
| nw-resize   | 此光标指示矩形框的边缘可被向上及向左移动（北/西）。          |
| n-resize    | 此光标指示矩形框的边缘可被向上（北）移动。                   |
| se-resize   | 此光标指示矩形框的边缘可被向下及向右移动（南/东）。          |
| sw-resize   | 此光标指示矩形框的边缘可被向下及向左移动（南/西）。          |
| s-resize    | 此光标指示矩形框的边缘可被向下移动（南）。                   |
| w-resize    | 此光标指示矩形框的边缘可被向左移动（西）。                   |
| text        | 此光标指示文本。                                             |
| wait        | 此光标指示程序正忙（通常是一只表或沙漏）。                   |
| help        | 此光标指示可用的帮助（通常是一个问号或一个气球）。           |
| not-allowed | 此光标表示不可点击，这个会同时限制鼠标点击事件pointer-events: none |

### 禁用光标

pointer-events: none



## 内容布局

### 定位

之前提到过定位并不适合总体布局，因为它会把元素拉出页面的正常流。但是却在一些情况下非常合适

#### 绝对定位

绝对定位非常适合创建弹出层、提示和对话框这类**覆盖于其他内容之上**的组件。

##### 利用初始位置

比如我们想添加一个行内的评注

```html
<p>这被暴风雨所打击着的土地，</p>
<aside class="comment">I've never done this. Is that really ture?</aside>
<p>这永远汹涌着我们的悲愤的河流，</p>
```

这里面添加了一个评注 aside

```css
.comment {
    position: absolute; /*弹出正常流，不影响正文显示*/
    width: 7em;
    left: 50%;
    margin-left: -17em; /*设置负值可以把我们的元素从里面拉出来*/
    margin-top: -2.5em;
}
```

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209061006560.png" alt="image-20220906100605461"  /> 

**继续实现**

创造一个三角形：

```css
.comment:after {   /*让这个元素没有宽度、高度，用边框来填充，然后将对应边透明以实现箭头*/
    position: absolute;
    content: " ";
    display: block;
    width: 0;
    height: 0;
    border: .5em solid #dcf0ff;
    border-bottom-color: transparent;  /*下边缘、右边缘透明*/
    border-right-color: transparent;
    right: -1.5em;   /*向右上偏移*/
    top: .5em;
}
```

![image-20220906102049782](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209061020832.png) 

然后我们将文本框给弄出来

```css
.comment {
    background-color: #dcf0ff;
    border: .5em solid #dcf0ff;
    border-radius: .5em;
}
```

![image-20220906102225045](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209061022119.png) 



##### 利用偏移实现自动大小

![image-20220906105450360](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209061054729.png)

```css
<header class="photo-header">
    <img src="1594295875594.png" alt="墨屿洺" class="photo">
    <div class="photo-header-plate">
        <h1>QWQ</h1>
        <p>photo from SpaceX on <a>墨屿洺</a></p>
    </div>
</header>
```

```css
.photo-header-plate {
    position: absolute;
    right: 4em;  /*这里我们不想设置明确宽度，就用这种方式*/
    bottom: 4em;
    left: 4em;
    background-color: #fff;
    background-color: rgba(255, 255, 255, 0.5);
    padding: 2em;
}
```

这样子设置的框框无论我们怎么动它都能



##### 堆叠上下文（堆叠元素次序）

之前我们提到过 z-index 属性可以控制堆叠元素的次序

不过这个堆叠是基于**堆叠上下文**的

==任何设定了 position: absolute 及 z-index 的值不是 auto 的定位元素都会创建一个自己后代元素的堆叠上下文==

不同的堆叠上下文中堆叠次序是不受影响的

设置小于 1 的 opacity（不透明度） 值也可以触发新的堆叠上下文（这个是因为浏览器对透明元素需要独立渲染）（还有 transform 和 filter 属性也会创建新的堆叠上下文）

**换句话说，如果容器A本身的层级比B低，无论我们将A中内容z-index设置得多高也不会到B上面**

```css
.B{
    z-index: 1;
}
.B .C{
    z-index: 9999;
    background-color: aqua;
    top: 150px;
    left: 150px;
}
.D{
    z-index: 2;
    background-color: burlywood;
    top: 300px;
    left: 300px;
}
```

![image-20220906135004366](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209061350443.png) 蓝色没有到棕色上头去



### 水平布局

正常情况下添加的元素还会沿垂直方向扩展

CSS 专门引入 Flexbox 来解决水平布局问题，除此之外还能使用浮动、inline-block 显示，或者表格显示模式



#### 浮动

浮动特别时候来实现文字环绕图片这样的模式，这个前面讲得比较清楚了



#### 行内块布局

将 display 属性设置为 inline-block 可以让我们的元素变成行内块

此时可以使用 vertical-align 属性来调整对其位置，详情见字体那边

==inline-block 中的元素还会应用 font-size 的空白符间隔==，这对导航条影响很大，需要将该属性设置为 0

而这个对齐也是参照的 **x 高度**

**在容器元素中垂直居中：**

```css
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        .author-image{
            width: 5em;
            height: 5em;
            object-fit: cover;
        }
        .author-image,.author-info{
            display: inline-block;
        }
        .author-name,.author-email{ /*让作者名和邮箱分两行*/
            display: block;
        }
        .author-info,.author-image{
            vertical-align: middle;
        }
        .author-meta {  /*容器*/
            height: 10em;
            background-color: gray;
        }
        .author-meta:before { /*增加一个行内块，使它占据100%高度，这样会让middle关键字认为容器的垂直中点是对齐点*/
            content: " ";
            display: inline-block;
            vertical-align: middle;
            height: 100%;
            margin-right: -.25em; /*抵消掉空格大小，但是这只是在当前字体的空格大小，所以只能零时充数*/
        }
        .author-meta{
            text-align: center; /*让实际内容居中对齐*/
        }
        .author-info{
            text-align: left; /*这个本来被上面一行默认改成居中对齐了，我们想让它靠左对齐*/
        }

    </style>
</head>
<body>
<p class="author-meta">
    <img class="author-image" src="1594295891872.png">
    <span class="author-info">
        <span class="author-name">墨屿洺</span>
        <a class="author-email" href="9083518@qq.com">9083518@qq.com</a>
    </span>
</p>
</body>
<script>

</script>
</html>
```

![image-20220906210737000](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209062107082.png)



#### 表格显示属性

将 display 设置为 table

table-layout 属性用来设置表格布局时所用的布局算法，属性的可选值如下：

| 值        | 描述                                                         |
| --------- | ------------------------------------------------------------ |
| automatic | 默认值，自定表格布局，表示表格中每列的宽度视单元格中的内容而定 |
| fixed     | 固定表格布局，表示表格的宽度由列宽度、单元格边框、单元格之间的间距等因素而定 |
| inherit   | 从父元素继承 table-layout 属性的值                           |

border-collapse 属性用来设置是否合并表格中相邻的边框，属性的可选值如下：

| 值       | 描述                                                         |
| -------- | ------------------------------------------------------------ |
| separate | 默认值，相邻的两个边框是分开的，使用它不会忽略 border-spacing 和 empty-cells 属性 |
| collapse | 相邻的两个边框会合并为一个单一的边框，使用它会忽略 border-spacing 和 empty-cells 属性 |
| inherit  | 从父元素继承 border-collapse 属性的值                        |

引入表格会带来**表格的问题**：

1. 渲染表格单元的元素无法应用外边距
2. 给表格单元应用定位的行为无法预料

这个在后面再讨论 HTML 表格与 CSS 表格显示模式

**使用表格来实现导航条：**

```css
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link href="https://www.bootcdn.cn/" rel="stylesheet">
    <style>
        .navbar ul{
            width: 100%;
            display: table;
            table-layout: fixed;
            background-color: #486a8e;
            padding-left: 0;  /*屏蔽掉浏览器默认行为（会默认给个空白）*/
        }
        .navbar li{
            height: 3em;
            width: 25%;
            background-color: #3a4a7e;
            outline: 1px solid #fff;
            display: table-cell;
            vertical-align: middle;  /*让下面的文本垂直居中*/
        }
        .navbar li a{
            display: block;
            line-height: 1.75em;
            color: #fff;
            text-align: center;  /*文本水平居中*/
        }

    </style>
</head>
<body>
<nav class="navbar">
    <ul id="table">
        <li><a href="/home">Home</a></li>
        <li><a href="/spaceships">Spaceships</a></li>
        <li><a href="/planets">Planets</a></li>
        <li><a href="/stars">Stars</a></li>
    </ul>
</nav>
</body>
<script>
</script>
</html>
```



### FlexBox

这个布局就是为了解决前面我们提到的水平布局问题

#### 轴线

FlexBox 可以有两根轴线，一根主轴，一根辅轴

**主轴**

主轴由 `flex-direction` 定义，可以取 4 个值：

- `row`
- `row-reverse`
- `column`
- `column-reverse`

如果你选择了 `row` 或者 `row-reverse`，你的主轴将沿着 **inline** 方向延伸。

![If flex-direction is set to row the main axis runs along the row in the inline direction.](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox/basics1.png)

==注意：这个方向并不固定为从左到右（根据语言环境而定）==，所以最好以起止来描述而非左右

选择 `column` 或者 `column-reverse` 时，你的主轴会沿着上下方向延伸 — 也就是 **block 排列的方向。**

![If flex-direction is set to column the main axis runs in the block direction.](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox/basics2.png) 

交叉轴

辅轴的方向与主轴交叉

交叉轴垂直于主轴，所以如果你的`flex-direction` (主轴) 设成了 `row` 或者 `row-reverse` 的话，交叉轴的方向就是沿着列向下的。

![If flex-direction is set to row then the cross axis runs in the block direction.](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox/basics3.png)

如果主轴方向设成了 `column` 或者 `column-reverse`，交叉轴就是水平方向。

![If flex-direction is set to column then the cross axis runs in the inline direction.](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox/basics4.png)

#### Flex 容器

把一个容器的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 属性值改为 `flex` 或者 `inline-flex`以创建 Flex 容器

容器中的直系子元素就会变为 **flex 元素**。所有 CSS 属性都会有一个初始值，所以 flex 容器中的所有 flex 元素都会有下列行为：

- 元素排列为一行 (`flex-direction` 属性的初始值是 `row`)。
- 元素从主轴的起始线开始。
- 元素不会在主维度方向拉伸，但是可以缩小。
- 元素被拉伸来填充交叉轴大小。
- [`flex-basis`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis) 属性为 `auto`。
- [`flex-wrap`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-wrap) 属性为 `nowrap`。

![image-20220907093451262](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209070934318.png) *这里只设置了文本元素的宽度（让第三个变成两行)，然后默认它会将 flex 容器扩大，前两个元素被拉伸填充交叉轴大小*

默认情况下如果元素过大（当然在元素可以压缩的情况下会收缩）则会溢出而不是换行



+ 简写属性 [`flex-flow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-flow)。第一个指定的值为 `flex-direction` ，第二个指定的值为 `flex-wrap`.

##### flex-direction（主轴） 定义元素填充方向

详细参数见轴线

##### flex-wrap 实现多行 Flex 容器

默认情况下行超出部分会自动溢出，可以使用 flex-wrap 属性实现多行

在使用多行时，应当==把每一行看作一个新的`flex`容器==。任何空间分布都将在该行上发生，而==不影响该空间分布的其他行==。

![image-20220907094943080](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209070949125.png) *将 flex-wrap 设置为 wrap（为了能让它分行，我对flex容器进行了限宽)，可以注意到下面一行的拉伸并没有影响到第一行*

flex-wrap **属性值**：

+ nowrap：默认值，不进行换行（当然在元素可以压缩的情况下会收缩）
+ wrap：常规换行
+ wrap-reverse：换行的方向反向，比如本来换行后元素在下面，用这个后就会出现在上面



##### flex 元素伸缩属性

- [`flex-grow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-grow)：控制 flex 元素在行内的延展
- [`flex-shrink`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-shrink)：控制 flex 元素在行内的收缩
- [`flex-basis`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-basis)：定义了该元素的**空间大小**

这 3 个属性可以直接控制 flex 的行为

###### [Flex 元素属性：`flex-grow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox#flex_元素属性：flex-grow)

+ `flex-grow` 若被赋值为一个正整数， flex 元素会以 `flex-basis` 为基础，沿主轴方向增长尺寸。这会使该元素延展，并占据此方向轴上的可用空间（available space）。如果有其他元素也被允许延展，那么他们会各自占据可用空间的一部分。

  如果我们给上例中的所有元素设定 `flex-grow` 值为 1，容器中的可用空间会被这些元素平分。它们会延展以填满容器主轴方向上的空间。

+ flex-grow 属性可以按比例分配空间。如果第一个元素 `flex-grow` 值为 2，其他元素值为 1，则第一个元素将占有 2/4（上例中，即为 200px 中的 100px）, 另外两个元素各占有 1/4（各 50px）。

###### [Flex 元素属性： `flex-shrink`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox#flex_元素属性：_flex-shrink)

+ `flex-grow`属性是处理 flex 元素在主轴上增加空间的问题，相反`flex-shrink`属性是处理 flex 元素收缩的问题。如果我们的容器中没有足够排列 flex 元素的空间，那么可以把 flex 元素`flex-shrink`属性设置为正整数来缩小它所占空间到`flex-basis`以下。与`flex-grow`属性一样，可以赋予不同的值来控制 flex 元素收缩的程度 —— 给`flex-shrink`属性赋予更大的数值可以比赋予小数值的同级元素收缩程度更大。

+ 在计算 flex 元素收缩的大小时，它的最小尺寸也会被考虑进去，就是说实际上 flex-shrink 属性可能会和 flex-grow 属性表现的不一致。因此，我们可以在文章《[控制 Flex 子元素在主轴上的比例](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Controlling_Ratios_of_Flex_Items_Along_the_Main_Ax)》中更详细地看一下这个算法的原理。

###### [Flex 元素属性：`flex-basis`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox#flex_元素属性：flex-basis)

+ `flex-basis` 定义了该元素的**初始空间大小（\**the size of that item in terms of the space\**）**，flex 容器里除了元素所占的空间以外的富余空间就是**可用空间** available space。 该属性的默认值是 `0%` 。此时，浏览器会检测这个元素是否具有确定的尺寸。 在上面的例子中，所有元素都设定了宽度（width）为 100px，所以 `flex-basis` 的值为 100px。

+ 如果没有给元素设定尺寸，`flex-basis` 的值采用元素内容的尺寸。这就解释了：我们给只要给 Flex 元素的父元素声明 `display: flex` ，所有子元素就会排成一行，且自动分配小大以充分展示元素的内容。

+ "flex-basis:auto" 的含义是 "参照我的`width`和`height`属性".

+ 关于该属性有些问题，见下面滚动问题

  

###### flex 属性简写（一般写法是这个）

`Flex` 简写形式允许你把三个数值按这个顺序书写 

+ `flex-grow`，`flex-shrink`，`flex-basis`。

有预设值：

- `flex: initial`：把 flex 元素重置为 Flexbox 的初始值（相当于 `flex: 0 1 auto`）
- `flex: auto`：等同于 `flex: 1 1 auto`（与 initial 不同在于它可以拉伸适用容器长）
- `flex: none`：等同于 `flex: 0 0 auto`



#### 元素的空间对齐与分配

1. **交叉轴方向上的对齐**

   + 整体

     默认情况下那种自动垂直拉伸填充的表现其实是 align-items: stretch 的表现

     [`align-items`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/align-items) 属性控制元素在==交叉轴==方向的对齐。

     + `stretch`：默认
     + `flex-start`
     + `flex-end`
     + `center`

     ==注意：一旦我们将该属性设置为其他值，那么就会失去默认值在高度上进行填充的特性==

   + 单个元素

     `align-self`会对齐当前 flex 行中的元素，并覆盖已有的 `align-items` 的值

     + `auto`：设置为父元素的`align-items`值。
     + `stretch`：默认
     + `felx-start`
     + `flex-end`
     + `center`
     + `baseline`：沿着交叉轴方向，按照项目内的文字对齐。

2. **主轴方向上的对齐**

   + 整体

     [`justify-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/justify-content)属性用来使元素在主轴方向上对齐（该属性是针对容器内的列，当然在 flex 布局中只能使用这个，但是在 grid 中需要考虑）

     + `stretch`：默认
     + `flex-start`
     + `flex-end`
     + `center`
     + `space-around`：使每个元素的左右空间相等（有点像 margin）
     + `space-between`：把元素排列好之后的剩余空间拿出来，平均分配到元素之间（元素之间间隔相等）
     + `safe`：与对齐关键字一起使用，如果选定的关键字会导致元素溢出容器造成数据丢失，那么将会使用 `start` 代替它。

   + 单个元素

     `justidy-self`属性让单个元素在主轴方向上对齐




#### Flex 布局下子元素滚动问题

现在存在的问题：在 flex 布局下某个子元素在过长时它不进行滚动，相反它试图撑大父元素

例如想实现效果：

![image.png](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202302271614631.webp) 

结果却变成这个样子：

![image.png](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202302271614427.webp) 

问题解决关键：

+ flex-basis：用于指定 flex 元素在主轴方向上的初始大小
  + flex-basis：具有比 `width` (或者在 `flex-direction: column` 情况下设置了`height`)的优先级更高 
+ flex-basis：==默认值为0%，在父元素高度不确定的情况下会被解析为 content==

这就是问题所在，flex-basis 默认值为0%，优先级比 height 高，但是此时 height 并不是一个固定的值，还不能确定它的大小，导致 0% 被解析为 content，然后它又具有比 height 更高的优先级，导致 height:100% 无法限制其高度，子元素撑大父元素

==解决==：将 flex-basis 设置为 0px，即初始大小为 0



#### Flex 实现色子的面

例子：三![image-20230206202925936](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202302062031502.png)

```html
<body>
<div class="dots">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
</div>
</body>

<style>
    .dots {
        height: 50px;
        width: 50px;
        background-color: #f5f5f5;

        display: flex;
        flex-direction: column;
        justify-content: space-between; //由于肯定存在空隙，要将空隙均匀地分部到点之间
    }

    .dot {
        height: 10px;
        width: 10px;
        background-color: black;
        border-radius: 20px;
    }

    .dot:nth-child(2) {
        align-self: center; //对交叉轴对齐处理
    }

    .dot:nth-child(3) {
        align-self: flex-end;
    }
</style>
```







## 页面布局

之前介绍的 Flexbox 是一维布局，稍微想一下就知道要是拿它来给页面做布局会多麻烦

### 二维布局：CSS Grid Layout

#### 网格布局中的术语

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209080910870.png" alt="image-20220908091001532" style="zoom: 33%;" /> 

+ 被设置为 display: grid 的元素叫**网格容器**（grid container），即图中的粗线框区域
+ 容器被**网格线**（grid line）分为多个区域，每个区域叫**网格单元**（grid cell）
+ 网格线之间的路径叫**网格轨道**（grid track）：1. **网格行**（grid row）；2. **网格列**（grid column） 
+ 相邻网格单元组和起来的矩形区域叫**网格区**（grid area）
+ 网格容器的直接子元素叫**网格项**（grid item），网格项可以放在网格内



#### 定义行和列

创建网格需要告诉浏览器网格行与列的数量和行为

通过网格模板（grid template）指定行和列的数量以及大小

```css
.area {
    display: grid;
    grid-template-rows: 300px 300px;  /*行高300px，两行*/
    grid-template-columns: 1fr 1fr; /*两列*/
}
```

**grid-template-rows**：

+ 指定行数和行高，以空格分隔

**grid-template-columns**：

+ 指定列数和列宽，以空格分隔

里面可以填的单位：

+ 正常的绝对位置、%
+ fr 单位：这个表示空间中剩余可用的部分（最后计算）
+ `reapeat()`函数：可以省去重复的行、列声明（reapeat(5, 1fr) => 1fr 1fr 1fr 1fr 1fr）

+ `minmax()`函数：在设定行高、列高时可以使用（minmax(4em, 1fr) => 至少 4em 高，还要占据相等的可用空间）

**grid-template**：上面两个的简写，先是行再是列，中间用 "/" 分隔

==由于网格轨道在 DOM 中没有特定的元素表示，所以无法通过 max-width 或 min-width 之类的属性来指定大小，只能用上面的 minmax() 函数来限制==



#### 添加网格项

添加网格要以其起止处的网格线作为参考

+ grid-row-start
+ grid-column-start
+ grid-row-end
+ grid-column-end

==注意：网格项是可以重叠的，重叠时遵循堆叠上下文规则，可以使用 z-index 控制堆叠顺序==

**简写**：起止声明放在一起，中间用 "/" 来分隔

+ **grid-row**

+ **grid-column**

  *默认跨度是一个网格单元（grid-row: 1 等价于 grid-row: 1/2）*

==支持负值表示行号（列号），grid-row: 1/-1 表示从第一行到最后一行==

**终极简写**：grid-area：分别表示 grid-row-start、grid-column-start、grid-row-end、grid-column-end，同样支持省略（用默认跨度）



#### 对齐网格项

grid 的一些行为和 flex 是很相似的，比如默认的高度自动扩展、水平、垂直方向上的对齐

Flexbox 和 Grid Layout 都是根据 CSS Box Alignment 规范确定其子项行为的

1. **垂直对齐**

   与 Flexbox 一样，使用 align-items 和 align-self 来控制

   + 整体：align-item
     + stretch：默认
     + start
     + end
     + center
   + 单个网格项：align-self
     + stretch：默认
     + start
     + end
     + center

2. **水平对齐**

   通过 justify-items 和 justify-self 属性指定

   + 整体：justify-items

     + stretch：默认
     + start
     + end
     + center

   + 单个网格项：justify-self

     + stretch：默认
     + start
     + end
     + center

     

#### 对齐网格轨道

可以在网格容器中对齐网格轨道（只要网格轨道的总和没有覆盖整个网格容器）

1. **垂直方向**：align-content
   + stretch：默认
   + start
   + end
   + center
   + space-between
   + space-around
   + space-evenly
2. **水平方向**：justify-content
   + stretch：默认
   + start
   + end
   + center
   + space-between
   + space-around
   + space-evenly

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209081052858.png" alt="image-20220908105220545" style="zoom: 33%;" /> 



#### 网格间的空距

可以给网格项声明外边距、利用网格轨道的不同对齐方式

我们也可以通过 grid-column-gap 和 grid-row-gap 属性

```css
.grid{
    grid-column-gap: 1.5em;
    grid-row-gap: 1.5em;
}
```



#### 命名模板区

这个特性是 Grid Layout 最为有趣的特性之一

1. 使用 grid-template-areas 属性声明网格布局

   ```css
   .grid-b {
       display: grid;
       grid-template-columns: 20% 1fr 1fr 1fr;
       grid-template-areas: "hd st1 . st2"
                            "hd st1 . st2";
   }
   ```

   <img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209081516326.png" alt="image-20220908151654159" style="zoom:25%;" />

   =="." 表示的是匿名单元，没有名字且不会合成为一个==

   在同一行/一列的同名网格单元会合并为一个**命名网格区**

2. 使用 grid-area 将网格项放入网格中

   但是这里使用的参数不太一样，这里**使用自定义的网格区名**

   

以后如果要修改布局，比如中间命名为 "." 的需要在 st1、st2 上下还需要加六个，我们只需要改 grid-template-areas

```css
.grid-b {
    display: grid;
    grid-template-columns: 20% 1fr 1fr 1fr;
    grid-template-areas: "hd  .  .  ."
                         "hd st1 . st2"
                         "hd st1 . st2";
                         "hd  .  .  ."
}
```





## 响应式 Web 设计与 CSS

从 CSS 的角度来看，响应式 Web 设计最核心的一点就是可以适配不同视口大小的流式布局

为此我们先需要知道怎么识别我们的用户视口



### 浏览器视口

CSS 像素和物理像素实际上是有区别的，但是我们并不需要管那么多，我们只用对 CSS 像素进行编程就可以了

#### 视口定义的区别

1. 默认视口和理想视口

   智能手机把事情搞得有些复杂，**默认视口**是一个模拟的视口，而**理想视口**才是与设备自身尺寸接近的视口

   默认视口就是桌面浏览器的理想视口，但是在只能手机或者平板电脑中就有所不同的

   理想视口：

   + 手机：宽度大约 300~500 CSS 像素
   + 平板电脑：大约 800~1400 CSS 像素

2. 可见视口与布局视口

   可见视口就是用户可见的部分，布局视口是整个布局

   当我们缩放网页时，可能会有部分布局被隐藏起来

#### 配置视口

+ 使用 \<meta> 标签让不同设备都能使用各自的理想视口

  ```html
  <meta name="viewport" content="width=devic-width, initial-scale=1">
  ```

  这行代码告诉浏览器我们希望使用该设备的理想尺寸（`devic-width`）作为视口宽度；这里还设置了 `initial-scale=1` 表示设置与理想视口匹配的缩放级别（这可以帮我们避免 ios 中一些奇怪的缩放行为）（有一些设备再设置缩放级别后会自动设置 devic-width）

+ 使用 @viewport 声明样式

  ```html
  <style>
      @viewport {
          width: auto;
      }
  </style>
  ```

  ==注意：使用该方法时千万不要把它写到 CSS 文件里面去==，因为浏览器必须在 CSS 文件加载完成之前就知道视口大小



### 媒体查询

媒体查询使用 @media 规则，该规则与 @support 规则相似，都是 CSS 中的 if 语句

媒体查询可以用在 link 元素中，也可以使用在 CSS 文件中

1. 写在 link 元素中

   ```html
   <link rel="script" href="main.css" media="screen and (min-width: 600px)">
   ```

2. 在 CSS 文件中

   ```css
   @media screen and (min-width: 600px) {
       /*...*/
   }
   ```

#### 媒体类型

其中 screen 指**媒体类型**，现在有用的媒体类型只有下面 3 个了

+ screen：屏幕
+ print：打印机
+ all

媒体类型可以省略

#### 关键字

+ and
+ 逗号 ","：相当于 or
+ not
+ only：防止旧版浏览器误解媒体查询

#### [媒体特性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media#媒体特性)

*媒体特性*（*Media features*）描述了 [user agent](https://developer.mozilla.org/zh-CN/docs/Glossary/User_agent)、输出设备，或是浏览环境的具体特征。媒体特性表达式是完全可选的，它负责测试这些特性或特征是否存在、值为多少。每条媒体特性表达式都必须用括号括起来。

| 名称                                                         | 简介                                                         | 备注                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| [`any-hover`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/any-hover) | 是否有任何可用的输入机制允许用户（将鼠标等）悬停在元素上？   | 在 Media Queries Level 4 中被添加。                          |
| [`any-pointer`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/any-pointer) | 可用的输入机制中是否有任何指针设备，如果有，它的精度如何？   | 在 Media Queries Level 4 中被添加。                          |
| [`aspect-ratio`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/aspect-ratio) | 视窗（viewport）的宽高比                                     |                                                              |
| [`color` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color) | 输出设备每个像素的比特值，常见的有 8、16、32 位。如果设备不支持输出彩色，则该值为 0 |                                                              |
| [`color-gamut` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-gamut) | 用户代理和输出设备大致程度上支持的色域                       | 在 Media Queries Level 4 中被添加。                          |
| [`color-index` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/color-index) | 输出设备的颜色查询表（color lookup table）中的条目数量，如果设备不使用颜色查询表，则该值为 0 |                                                              |
| [`display-mode` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/display-mode) | 应用程序的显示模式，如 web app 的 manifest 中的[`display`](https://developer.mozilla.org/zh-CN/docs/Web/Manifest#display) 成员所指定 | 在 [Web App Manifest spec](http://w3c.github.io/manifest/#the-display-mode-media-feature)被定义。 |
| [`forced-colors` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/forced-colors) | 检测是 user agent 否限制调色板                               | 在 Media Queries Level 5 中被添加。                          |
| [`grid` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/grid) | 输出设备使用网格屏幕还是点阵屏幕？                           |                                                              |
| [`height` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/height) | 视窗（viewport）的高度                                       |                                                              |
| [`hover`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/hover) | 主要输入模式是否允许用户在元素上悬停                         | 在 Media Queries Level 4 中被添加。                          |
| [`inverted-colors` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/inverted-colors) | user agent 或者底层操作系统是否反转了颜色                    | 在 Media Queries Level 5 中被添加。                          |
| `light-level`                                                | 环境光亮度                                                   | 在 Media Queries Level 5 中被添加。                          |
| [`monochrome` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/monochrome) | 输出设备单色帧缓冲区中每个像素的位深度。如果设备并非黑白屏幕，则该值为 0 |                                                              |
| [`orientation`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/orientation) | 视窗（viewport）的旋转方向                                   |                                                              |
| [`overflow-block` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/overflow-block) | 输出设备如何处理沿块轴溢出视窗 (viewport) 的内容             | 在 Media Queries Level 4 中被添加。                          |
| [`overflow-inline` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/overflow-inline) | 沿内联轴溢出视窗 (viewport) 的内容是否可以滚动？             | 在 Media Queries Level 4 中被添加。                          |
| [`pointer` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/pointer) | 主要输入机制是一个指针设备吗？如果是，它的精度如何？         | 在 Media Queries Level 4 中被添加。                          |
| [`prefers-color-scheme`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-color-scheme) | 探测用户倾向于选择亮色还是暗色的配色方案                     | 在 Media Queries Level 5 中被添加。                          |
| [`prefers-contrast` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-contrast) | 探测用户是否有向系统要求提高或降低相近颜色之间的对比度       | 在 Media Queries Level 5 中被添加。                          |
| [`prefers-reduced-motion`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/prefers-reduced-motion) | 用户是否希望页面上出现更少的动态效果                         | 在 Media Queries Level 5 中被添加。                          |
| `prefers-reduced-transparency`                               | 用户是否倾向于选择更低的透明度                               | 在 Media Queries Level 5 中被添加。                          |
| [`resolution` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/resolution) | 输出设备的像素密度（分辨率）                                 |                                                              |
| `scan`                                                       | 输出设备的扫描过程（适用于电视等）                           |                                                              |
| [`scripting` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/scripting) | 探测脚本（例如 JavaScript）是否可用                          | 在 Media Queries Level 5 中被添加。                          |
| [`update` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/update-frequency) | 输出设备更新内容的渲染结果的频率                             | 在 Media Queries Level 4 中被添加。                          |
| [`width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/@media/width) | 视窗（viewport）的宽度，包括纵向滚动条的宽度                 |                                                              |

可以通过检测屏幕的宽高比来确定输出样式

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <link href="https://www.bootcdn.cn/" rel="stylesheet">
    <style>
        img{
            width: 30em;
            height: 30em;
            object-fit: cover;
        }
        .area{
            display: grid;
            grid-template-columns: 1fr 20% 1fr;
            grid-template-areas: "picture1 text picture2";
            justify-items: center;
        }
        .area article:nth-child(1){
            grid-area: picture1;
        }
        .area article:nth-child(2){
            grid-area: picture2;
        }

        @media (max-aspect-ratio: 5/5) { /*宽高比如果小于1比1的时候，下面的样式会覆盖掉上面的样式*/
            .area{
                grid-template-columns: 1fr;
                grid-template-areas: "picture1"
                                     "text"
                                     "picture3";
            }
        }
    </style>
</head>
<body>
<div class="area">
    <article>
        <img src="1594295891872.png">
    </article>
    <h1>Hello World</h1>
    <article>
        <img src="1594295891872.png">
    </article>
</div>
</body>
<script>
</script>
</html>
```

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209081624379.png" alt="image-20220908162413251" style="zoom:25%;" /> 

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209081624758.png" alt="image-20220908162434660" style="zoom:25%;" /> 

我们还可以进一步设置从宽高比由小变多的过程中，栏目从一条到两条到很多条



### 响应式设计

#### 移动优先的 CSS

移动设备屏幕小，输入不便，但使用频率又比较高，在开发时我们应当优先满足移动设备的需求

在后续可以引入扩展的能力适配其他设备

1. 基本的版式、盒子、跳转与浏览组件
2. 对移动设备进行适配
3. 使用断点（媒体查询）扩展其他设备

CSS 内部要实现响应式布局我们已经比较熟悉了，根据实际需求开发就行



#### 响应式嵌入媒体

对于嵌入页面中的对象，CSS 有时候会显得力不从心

1. **响应式媒体基础：**

   前面“盒子的美化”中讲过实现图片、视频以及其他对象弹性化的基本技术

   在不同的使用场景下需要使用不同的方法来控制它们的大小

   

2. **响应式图片：**

   由于浏览器会对网页进行**预处理**，图片等资源会在浏览器构建完整个页面或运行 JavaScript 之前就开始下载，这意味着不可能仅凭脚本就解决图片的响应式问题（根据用户设备使用不同的图片）

   **srcset** 属性可以解决这个问题

   srcset 及其对应的 sizes 属性，是对 img 元素最简单的扩展

   + 哪个是当前图片可替换的源文件，其宽度为多少
   + 在各个断点中，它们的 CSS 宽度时多少

   *通过在 HTML 而非 CSS 中指定这个信息，浏览器的预解析器能迅速决定下载哪个图片*

   [HTMLImageElement.srcset - Web API 接口参考 | MDN (mozilla.org)](https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLImageElement/srcset)



##### Picture 元素

该元素是 img 元素的容器，同时扩展了 srcset 和 sizes 属性的能力

要决定加载哪个 URL，[user agent](https://developer.mozilla.org/zh-CN/docs/Glossary/User_agent) 检查每个 `<source>` 的 [`srcset`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/source#attr-srcset)、[`media`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/source#attr-media) 和 [`type`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/source#attr-type) 属性，来选择最匹配页面当前布局、显示设备特征等的兼容图像。

```css
<picture>
    <source srcset="1594295875594.png"
    media="(min-width: 800px) and (max-width: 1000px)">
    <source srcset="VCG211359309448.png"
            media="(min-width: 1000px)">
    <img src="1594295891872.png">
</picture>
```

+ srcset：资源指向
+ media：媒体条件 (media condition)（类似于媒体查询）
+ type：允许为元素的 `srcset` 属性指向的资源指定一个 [MIME 类型](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types)



#### 响应式排版

1. **设备不同，大小不同**

   + 在大屏幕上，一行 45~70 个字符比较舒服
   + 手机上一行 35~45 个字符

   随着每行字符数的减少，行高通常也可以相应减小（台式机如果是 1.5 那么移动设备就可以 1.3 左右）

2. **让字体适配视口大小**

   为了响应我们已经使用了 em 等可伸缩单位，下一把就是让字体大小（font-size）适配视口大小

   视口相关单位：（这里 1 表示 1%）

   + vw：视口宽度
   + vh：视口高度
   + vmin：表示宽度和高度中较小的
   + vmax：表示宽度和高度中较大的

   这样我们的文本就不用通过媒体查询来修改大小了（但是这也极具风险，桌面浏览器视口宽度是 1400 像素，如果这样用 14x5=70像素，这也太大了）

   所以哪怕这样实现，我们还是得用断点来实现字体大小调整



## 表单与数据表

### 设计数据表

#### 表格专有元素

表格通过 table 元素创建，表格由 tr（table row，行）和 td（table data cell，数据单元）

1. **表题**

   + caption，表格标题

2. **表头、表体、表脚**

   + thead：表头

   + tbody：表体

   + tfoot：表脚

   一个表上只能有一个 thead 和 tfoot，可以有多个 tbody

   + th：标题

     通过属性 scope 说明是行标题还是列标题（row/col）

     scope 属性还可以是 rowgroup 或 colgroup 表示这个行标题或列标题的范围覆盖多行或多列

   + tr：给某一行添加样式

表格的基本构成最少需要三个元素：< table >、< tr >、< td >，其他的一些作为可选铺助存在。

| 元素名称 | 说明                                |
| -------- | ----------------------------------- |
| table    | 表示表格                            |
| thead    | 表示标题行                          |
| tbody    | 表示表格主体                        |
| tfoot    | 表示表脚                            |
| tr       | 表示一行单元格                      |
| th       | 表示标题行单元格（可以设定为行/列） |
| td       | 表示单元格                          |
| col      | 表示一列                            |
| colgroup | 表示一组列                          |
| caption  | 表示表格标题                        |

这个里面的元素是确实可以定位到对应位置的（比如css 中 col 可以定位到整条对应列）

```css
<table class="cal">
    <caption><strong>January</strong> 2015</caption>
    <colgroup>
        <col class="cal-mon">
        <col class="cal-tue">
        <col class="cal-wed">
        <col class="cal-thur">
        <col class="cal-fri">
        <col class="cal-sat cal-weekend">
        <col class="cal-sun cal-weekend">
    </colgroup>
    <thead>
    <th scope="col">Mon</th>
    <th scope="col">Tue</th>
    <th scope="col">Wed</th>
    <th scope="col">Thur</th>
    <th scope="col">Fri</th>
    <th scope="col">Sat</th>
    <th scope="col">Sun</th>
    </thead>
    <tbody>
    <tr>
        <td class="cal-inactive">29</td>
        <td class="cal-inactive">30</td>
        <td class="cal-inactive">31</td>
        <td><a href="#">1</a></td>
        <td><a href="#">2</a></td>
        <td><a href="#">3</a></td>
        <td><a href="#">4</a></td>
    </tr>
    <tr>
        <td><a href="#">5</a></td>
        <td><a href="#">6</a></td>
        <td><a href="#">7</a></td>
        <td><a href="#">8</a></td>
        <td><a href="#">9</a></td>
        <td><a href="#">10</a></td>
        <td><a href="#">11</a></td>
    </tr>
    </tbody>
</table>
```



#### 为表格应用样式

css 标准规定了两种表格边框模型：分离型和折叠型

+ 分离型：每个元素四周都有边框 border-collapse:  separate
+ 折叠型：相邻单元共享边框  border-collapse: collapse

```css
.cal{
    border-collapse: collapse;
    table-layout: fixed; /*默认auto（根据单元格内容确定宽度），设置为fixed能根据第一行每一个单元格或col、colgroup宽度来确定*/
    width: 100%;
    max-width: 25em;
    text-align: center;
}
```



#### 响应式表格

表格会在空间不够时自动扩展（因为它有两个轴向概念），这会导致复杂的表格占据相当多的空间，从而违反响应式设计的目标

==表格元素有自己的显示模型==，我们可以在小屏幕上取消掉本来的 “网格性质”，从而实现我们想要的布局

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=devic-width, initial-scale=1">
    <title>Title</title>
    <link href="https://www.bootcdn.cn/" rel="stylesheet">
    <style>
        .cars{
            width: 100%;
            border-collapse: collapse;
        }
        .cars caption{
            text-align: left;
            font-style: italic;
            border-bottom: 1px solid #ccc;
        }
        .cars tr:nth-child(even){
            background-color: #eee;
        }
        .cars caption,.cars th,.cars td{
            text-align: left;
            padding: 0.5em;
            line-height: 2;
        }
        .cars thead{
            border-bottom: 2px solid;
        }

        @media only screen and (max-width: 760px){
            .cars{
                display: block;  /*取消掉了表格元素的网格性质*/
            }
            .cars caption{
                border-bottom: 1px solid;
            }
            .cars thead{
                display: none;
            }
            .cars tr{
                border-bottom: 1px solid;
            }
            .cars td, .cars th{
                display: block; /*取消掉了表格元素的网格性质*/
                width: 40em;
                box-sizing: border-box;
            }
            .cars th{
                font-weight: 600;
                border-bottom: 2px solid;
                padding-top: 10px;
            }
            .cars td:before {
                width: 40%;
                display: inline-block;
                font-style: italic;
                content: attr(data-lable); /*引入html标签中的属性*/
            }
        }
    </style>
</head>
<body>
<table class="cars">
    <caption>Tesla car models</caption>
    <thead>
    <tr>
        <th scope="col">Model</th>
        <th scope="col">Top speed</th>
        <th scope="col">Range</th>
        <th scope="col">Length</th>
        <th scope="col">Width</th>
        <th scope="col">Weight</th>
        <th scope="col">Starting price</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td data-lable="Model">Model S</td>
        <td data-lable="Top speed">201 km/h</td>
        <td data-lable="Range">426 km</td>
        <td data-lable="Length">4976 mm</td>
        <td data-lable="Width">1963 mm</td>
        <td data-lable="Weight">2108 kg</td>
        <td data-lable="Starting price">$69900</td>
    </tr>
    <tr>
        <td data-lable="Model">Roadster</td>
        <td data-lable="Top speed">201 km/h</td>
        <td data-lable="Range">393 km</td>
        <td data-lable="Length">3946 mm</td>
        <td data-lable="Width">1873 mm</td>
        <td data-lable="Weight">1235 kg</td>
        <td data-lable="Starting price">$109000</td>
    </tr>
    </tbody>
</table>
</body>
<script>
</script>
</html>
```

这里我们将表格元素 \<table> 也设置为了块级元素，理论上来说这是非必须的，这么做是为了避免有些屏幕阅读器发现表格中的单元格都显示为块级元素时出现问题，将表格设置为块级元素可以让其任务表格中包含的是文本流 



#### 高级响应表单

可以使用 Tablesaw

http://www.filamentgroup.com/lab/tablesaw.html

这里提供了很多 jQuery 插件



### 表单

HTML 表单涉及到的相关元素和属性实在太多了，这里只进行外表样式的讨论

#### 简单的表单

建议和 JavaScript 那边的表单笔记联合食用

**常用的[表单](https://so.csdn.net/so/search?q=表单&spm=1001.2101.3001.7020)元素**

1. form: 定义供用户输入的表单。

2. fieldset: 定义域。分组相关信息块

3. [legend](https://so.csdn.net/so/search?q=legend&spm=1001.2101.3001.7020)：定义域的标题，即边框上的文字。

4. label：定义一个控制的标签。如输入框前的文字，用以关联用户的选择。

5. input: 定义输入域，常用。可设置type属性，从而具有不同功能。

6. textarea: 定义[文本域](https://so.csdn.net/so/search?q=文本域&spm=1001.2101.3001.7020)(一个多行的输入控件)，默认可通过鼠标拖动调整大小。

   需要留意的是如果这个需要能让用户进行缩放，这个不同浏览器允许方向不一样，我们将其设置为 resize: vertical

7. button: 定义一个按钮。

8. select: 定义一个选择列表，即下拉列表。

9. option: 定义下拉列表中的选项。

一个基本的信息表：（这里是输入文本的处理）

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=devic-width, initial-scale=1">
    <title>Title</title>
    <link href="https://www.bootcdn.cn/" rel="stylesheet">
    <style>
        fieldset{
            border: 0;
            padding: 0;
            margin: 0;
            min-width: 0;  /*屏蔽浏览器默认行为*/
        }
        .fieldset-wrapper{
            padding: 1em;
            margin-bottom: 1em;
            border:1px solid #eee;
            background-color: #fff;
            box-shadow: 0 0 4px rgba(0,0,0,0.25);
        }
        legend{
            padding: 0 0 0.5em 0; /*不能使用外边距，不同浏览器legend外边距结果不一样*/
            font-weight: bold;
            color: #777;
        }
        input textarea{
            font: inherit;  /*让输入文本字体继承外面*/
        }
        .field-text label,.field-text input{
            display: block; /*使字段名和输入框分开两行*/
            width: 100%;
            box-sizing: border-box;
        }
        .field-text{
            max-width: 20em; /*不让输入条太长了*/
        }
        .field-text label{ /*改变鼠标光标为输入样式*/
            cursor: pointer;
        }
        .field-text input{
            padding: .375em .3125em .3125em; /*让输入框内的文字和输入框有一点间隔*/
            border: 1px solid #ccc;
            border-radius: .25em;
        }
        .field-text input:focus{  /*处理获取到焦点时的表现*/
            box-shadow: 0 0 .5em rgba(93,162,248,0.5);
            border-color: #5da2f8;
            outline: 0;
        }
    </style>
</head>
<body>

<form id="comments_form" action="/comments/" method="post">
    <div class="fieldset-wrapper">
        <fieldset>
            <legend>Your Contact Details</legend>
            <p class="field field-text">
                <label for="comment-author">Name:</label>
                <input name="comment-author" id="comment-author" type="text">
            </p>
            <p class="field field-text">
                <label for="comment-email">Email Address:</label>
                <input name="comment-email" id="comment-email" type="email">
            </p>
            <p class="field field-text">
                <label for="comment-url">Web Address:</label>
                <input name="comment-url" id="comment-url" type="url">
            </p>
        </fieldset>
    </div>
</form>

</body>
<script>
</script></html>
```

![image-20220910153601289](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209101536358.png) 



#### **选择按钮**

1. radio：单选框（单选）

2. checkbox：多选框（多选）

   语法：\<input type="" name="组名" value="取值" />

   注意：同一组选项要让组名一致

3. checked 属性标签（不用给它值）可以让选项默认被选中

```css
<fieldset>
    <legend>Remember Me</legend>
    <p class="field">
        <label><input name="comment-remember" type="radio" value="yes">Yes</label>
    </p>
    <p class="field">
        <label><input name="comment-remember" type="radio" value="no">No</label>
    </p>
</fieldset>
```

可以注意到 lable 字段名会出现在右侧，且由于我们将 input 放置在它里面，不会因为 display: block 而分成两行

![image-20220910181855551](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209101818613.png) 



#### 表单反馈与帮助

1. **输入示例**：

   可以通过 placeholder 属性为输入字段提供一个输入示例

   ```html
   <input name="comment-url" id="comment-url" type="url" placeholder="https://example.com">
   ```

   ![image-20220910182635175](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209101826234.png) 

   可以使用伪类定位到 placeholder 给它添加样式

   ```css
   ::placeholder{
       font-style: italic;
   }
   ```

2. **帮助文本**

   我们希望在字段没有焦点的时候隐藏这些文本

   ```html
   <p class="field field-text">
       <label for="comment-url">Web Address:</label>
       <input name="comment-url" id="comment-url" type="url" placeholder="https://example.com">
       <span id="comment-url-help" role="tooltip" class="form-help">Fill in your URL if you have one. Make sure to include the "http://"-part.</span>
   </p>
   ```

   ```css
   .form-help {
       display: block;
       position: absolute;   /*裁剪元素的前置*/
       overflow: hidden;
       width: 1px;
       height: 1px;
       clip: rect(0,0,0,0);  /*裁剪元素*/
   }
   input:focus + .form-help,input:hover + .form-help{ /*获取到焦点、悬浮更改样式*/
       padding: .5em;
       margin-top: .5em;
       border: 1px solid #5da2f8;
       border-radius: .25em;
       font-style: italic;
       color: #737373;
       background-color: #fff;
       position: static;
       width: auto;
       height: auto;
       crop: auto;
   }
   ```

   ![image-20220910192134558](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209101921627.png) 



#### 高级表单样式

我们可以使用 Flexbox 等现代 css 控制字段的布局，以实现更加复杂的表单

##### 带前缀/后缀的输入字段

```html
<p class="field field-text">
    <label for="application-twitter-prefix">Twitter handle:</label>
    <span class="field-prefixed">
        <span class="field-prefix" id="application-twitter-prefix" aria-label="You can omit the @">@</span>
        <input aria-describedby="applicant-twitter-prefix" name="applicant-twitter" id="application-twitter"
           type="text"/>
    </span>
</p>
```

```css
.field-prefixed {
    display: flex;
}
.field-prefix{
    border-radius: .25em;
    display: flex;        /*让前置文字垂直居中*/
    align-items: center;
    border: 1px solid #ccc;
    margin-right: 0.25em;
    background-color: #f5f5f5;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.25);;
}
```

![image-20220911123418287](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209111234379.png) 



##### 使用多栏布局组织复选框

在这里我们试图将复选框组织为列以节省空间

Multi-Column Layout 模式非常适合这种布局

**常用属性：**

1. column-count: 属性设置列的具体个数
2. column-width: 属性控制列的宽度
3. column-gap: 两列之间的缝隙e间隔
4. column-rule: 规定列之间的宽度、样式和颜色
5. column-span: 规定元素应横跨多少列(n:指定跨n列  all:跨所有列）

可以在外框元素中指定 max-width 来限定大小

```html
<fieldset>
    <legend>Language</legend>
    <p class="checkbox">
        <label><input type="checkbox" name="lang-as" value="ActionScript">ActionScript</label>
        <label><input type="checkbox" name="lang-as" value="C++">C++</label>
        <label><input type="checkbox" name="lang-as" value="CSS">CSS</label>
        <label><input type="checkbox" name="lang-as" value="Java">Java</label>
        <label><input type="checkbox" name="lang-as" value="Python">Python</label>
        <label><input type="checkbox" name="lang-as" value="BASIC">BASIC</label>
        <label><input type="checkbox" name="lang-as" value="Clojure">Clojure</label>
        <label><input type="checkbox" name="lang-as" value="HTML">HTML</label>
        <label><input type="checkbox" name="lang-as" value="C#">C#</label>
        <label><input type="checkbox" name="lang-as" value="JavaScript">JavaScript</label>
    </p>
</fieldset>
```

```css
.checkbox{
    padding: 0;
    column-count: 5;
    column-width: 10em;
    max-width: 75%;
}
.checkbox label{
    margin-bottom: 0.75em;
    display: block;
    width: 10em;
}
```

==这里有个骚操作：将选择框 input 元素隐藏（设置为 absolute 然后裁剪元素），然后以一个图片来伪造选择框==



#### 其他自定义表单组件

这里推荐几个库：

+ Filament Group：发布过一个简单的 jQuery 选项菜单插件（https://github.com/filamentgroup/select）这个插件的出发点是快速给 select 元素而非选项列表添加样式。这个库也通过类似的手段实现了文件上传
+ Chosen（http://harvesthq.github.io/chosen/）和 Select2（https://select2.github.io/）是两个着眼于选项菜单增强的更流行的插件。支持对占位符和选项添加样式，支持搜索和筛选，并为多项选择提供了更好的 UI
+ Todd Parker：一个纯 css 的方案（http://filamentgroup.github.io/select-css/demo/）能够实现基本的 select 元素下拉菜单样式的增强



***



## 变换、过渡与动画

### 二维变换

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209111549435.png" alt="image-20220911154904264" style="zoom: 33%;" />

从技术上来说，变换改变的是元素所在的**坐标系统**。元素本身还是在页面原来的位置，但它们“畸变”后的影像变换了

所以不管元素最终变换到哪里去了，我们仍然可以用它本来在视口中的坐标描述其位置

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209111556422.png" alt="image-20220911155628336" style="zoom: 50%;" />

==由于以上的特性，变换不需要重新计算文本大小，其性能是很好的==

 

#### 变换原点

默认情况下原点在边框盒子的中心，我们可以通过控制**原点属性 transform-origin 改变原点**

+ 可以给它设置 1~3 个值，分别表示 x、y 和 z 轴坐标
+ 如果只给一个值，则第二个值用默认值 center



#### 2D变换

通过使用 CSS `transform` 属性，您可以利用以下 2D 转换方法：

- `translate()`：平移，分别设置 x偏移、y偏移
- `rotate()`：旋转，旋转的单位：deg（°）
- `scaleX()`
- `scaleY()`
- `scale()`：方法增加或减少元素的大小（根据给定的宽度和高度参数），多少倍
- `skewX()`
- `skewY()`
- `skew()`：方法使元素沿 X 和 Y 轴倾斜给定角度。

==多重变换：可以用空格分隔的列表形式传给 transform 属性，按照声明的顺序依次应用==

==注意：如果分开声明变换，后面的变化会使前面的变换失效==



### 过渡

过渡是一种动画，可以从一种状态过渡到另一种状态

==有些属性可以进行过渡，有些则不行==（见 http://oli.jp/2010/css-animatable-properties/ ）

我们可以**通过 transition 属性来控制变换时间**，这个属性是一个缩写：

+ transition-property：变化的属性
+ transition-duration：过渡持续时间
+ transition-delay：过渡延迟，如果设置为负值会跳过
+ transition-timing-function：过渡计时函数

```css
button{
    border: 0;
    padding: .5em 1em;
    color: #fff;
    border-radius: .25em;
    background-color: #173b6d;
    box-shadow: 0.15em .25em 0.1em rgba(23,59,109,0.3);
    transition: all 150ms;
}
button:active{ /*按钮被按下后处于活动状态，激活这个规则*/
    box-shadow: 0 0 0 rgba(23,59,109,0.3), inset 2px 2px 1px rgba(8, 20, 38, 0.3); /*多重阴影*/
    transform: translate(0.15em,.25em); /*挪动到之前阴影所在的地方*/
}
```

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209111818486.png" alt="image-20220911181820402" style="zoom: 50%;" />

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209111818024.png" alt="image-20220911181837949" style="zoom: 50%;" />

#### 过渡计时函数

默认情况下，过渡变化的速度是一个先变快后变慢的平滑过程（**缓动**）

CSS 通过相应的数学函数来控制这些变化，这些函数由 **transition-timing-function** 属性来指定

+ linear
+ ease-in：慢开始后块
+ ease-out：快开始后慢
+ ease-in-out：两头慢，中间快

*这个也可以在简写 transition 属性来指定*



#### 自定义缓动函数

通过 `cubic-bezier()` 函数指定缓动函数（cube-bezier() 函数定义三次贝塞尔曲线）

https://cubic-bezier.com 这个网站可以帮我们创建



#### 步进函数

**transition-timing-function** 属性指定为 `steps(x, start)` 指将过程切分为 x 个状态，第二个参数用于指定是在状态起始改变还是在每一步结束时改变

这个非常适合来做定格动画

==该函数存在一个致命的问题：如果在过渡完成前反转状态（比如按钮按下马上松开了），那么过渡也会逆向发生，但是逆向的却不是和正向一一对应的（比如正向共6个状态，变化了3个状态，回去的时候仍然会是6个状态）==

这时我们需要设置不同的正向和反向过渡



#### 不同的正向和反向过渡

1. 直接跳过反向过渡

   我们可以让反向过渡直接跳过

   1. 正常情况下设置过渡时间为 0
   2. 获取到焦点后再设置真实的过渡时间

   ```css
   .hello{
       transition: background-position 0s steps(6);
   }
   .hello:hover{
       transition-duration: .6s;
   }
   ```

2. 不让反向过渡

   实现方法：

   1. 将正常情况下的过渡事件设置得超级超级大
   2. 获取到焦点后再设置真实的过渡时间



### 关键帧动画

#### 创建关键帧块

```css
@keyframes roll {
     from{
         transform: translateX(-100%);
         animation-timing-function: ease-in-out;
     }
    20%{
        transform: translateX(-100%) skewX(15deg);
    }
    45%{
        transform: translateX(-100%) skewX(-5deg) rotate(20deg) scaleY(1.1);
        animation-timing-function: ease-in-out;
    }
    50%{
        transform: translateX(-100%) rotate(45deg) scaleY(1.1);
        animation-timing-function: ease-in;
    }
    60%{
        transform: translateX(-100%) rotate(90deg);
    }
    65%{
        transform: translateX(-100%) rotate(90deg) skewY(10deg);
        animation-timing-function: ease-in-out;
    }
    70%{
        transform: translateX(-100%) rotate(90deg) skewY(0deg);
    }
    to{
        transform: translateX(-100%) rotate(90deg);
    }
 }
```

使用 @keyframes 规则来定义一个关键帧序列（后面的是名称）

关键字 from 和 to 分别表示 0% 和 100%

通过 animation-* 属性绑定连接规则（这个命名和上面的过渡命名一样）



#### 将关键帧绑定连接到元素

1. 通过 animation-name 把元素的动画序列指定为上面声明的关键帧序列

2. 关键帧中写的能将元素中指定的属性覆盖

3. animation 可以作为属性简写

   - animation-name

   - animation-duration

   - animation-timing-function

   - animation-delay

   - animation-iteration-count

   - animation-direction：定义是否应该轮流反向播放动画。

     + 默认值是：normal

     + reverse 反向

     + alternate、alternate-reverse 轮流反向播放

       注意：如果把动画设置为只播放一次，则该属性没有效果。

   - animation-fill-mode

   fill-mode：

   + none

     当动画未执行时，动画将不会将任何样式应用于目标，而是已经赋予给该元素的 CSS 规则来显示该元素。这是默认值。

   + forwards

     目标将保留由执行期间遇到的最后一个[关键帧 (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes)计算值。

   + backwards

     动画将在应用于目标时立即应用第一个关键帧中定义的值，并在[`animation-delay`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/animation-delay)期间保留此值，应用最后一个关键帧的样式

   + both

     动画将遵循`forwards`和`backwards`的规则，从而在两个方向上扩展动画属性。

==注意：应用在同一个元素上的多个动画，后加入的属性会覆盖前面的，所以我们可以给外元素添加动画以实现多动画复合运动==



### 三维变换

三维变换概念还是一样的，多引入了一个 z 轴，遵循近大远小的规则

#### 透视

利用 perspective & perspective-origin 设置 3D视距，实现透视/景深效果

`perspective` 为一个元素设置三维透视的距离，仅作用于元素的后代，而不是其元素本身。

简单来说，当元素没有设置 `perspective` 时，也就是当 `perspective:none/0` 时所有后代元素被压缩在同一个二维平面上，不存在景深的效果。

而如果设置 `perspective` 后，将会看到三维的效果。

![image-20220912133840468](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209121338538.png)

而 `perspective-origin` 表示 3D 元素透视视角的基点位置，默认的透视视角中心在容器是 `perspective` 所在的元素，而不是他的后代元素的中点，也就是 `perspective-origin: 50% 50%`。

换句话说是视野聚焦的点

==如果要给个别元素更改透视，在 transform 中使用 `perspective()` 函数==



#### 使用 transform-style 启用 3D 模式

要利用 CSS3 实现 3D 的效果，最主要的就是借助 `transform-style` 属性。`transform-style` 只有两个值可以选择：

```CSS
// 语法：
transform-style: flat|preserve-3d;
 
transform-style: flat; // 默认，子元素将不保留其 3D 位置
transform-style: preserve-3d; // 子元素将保留其 3D 位置。
```

当我们指定一个容器的 transform-style 的属性值为 preserve-3d 时，容器的后代元素便会具有 3D 效果，这样说有点抽象，也就是当前父容器设置了 preserve-3d 值后，它的子元素就可以相对于父元素所在的平面，进行 3D 变形操作。



#### 正方体

```css
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        li{
            list-style: none;
        }
        .demo-cube{
            position: relative;  /*之后每个面都是绝对布局的，所以需要这个来帮忙对齐*/
            margin-top: 15em;
        }
        .cube-inner {
            transform-style: preserve-3d;
            transform: rotateX(-33.5deg) rotateY(45deg);
        }
        li {
            left: 0; top: 0; right: 0; bottom: 0; /*利用绝对元素的延展特性实现居中对齐*/
            margin: auto;
            position: absolute;
            width: 100px;
            height: 100px;
            background: rgba(141, 214, 249);
            border: 1px solid #fff;
        }
        .top {                         /*面旋转平移就来到了应该在的位置*/
            transform: rotateX(90deg) translateZ(50px);
        }
        .bottom {
            transform: rotateX(-90deg) translateZ(50px);
        }
        .front {
            transform: translateZ(50px);
        }
        .back {
            transform: rotateX(-180deg) translateZ(50px);
        }
        .left {
            transform: rotateY(-90deg) translateZ(50px);
        }
        .right {
            transform: rotateY(90deg) translateZ(50px);
        }
    </style>
</head>
<body>

<div class="demo-cube perspective">
    <ul class="cube-inner">
        <li class="top"></li>
        <li class="bottom"></li>
        <li class="front"></li>
        <li class="back"></li>
        <li class="right"></li>
        <li class="left"></li>
    </ul>
<!--    <ul class="cube">-->
<!--        <li class="top"></li>-->
<!--        <li class="bottom"></li>-->
<!--        <li class="front"></li>-->
<!--        <li class="back"></li>-->
<!--        <li class="right"></li>-->
<!--        <li class="left"></li>-->
<!--    </ul>-->
</div>
</body>
</html>
```



**终极形态：来回旋转**

```css
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>

    <style>
        li{
            list-style: none;
        }
        .demo-cube{
            position: relative;
            margin-top: 15em;
        }
        .cube-inner {
            transform-style: preserve-3d;
            transform: rotateX(-25deg) rotateY(45deg);
            animation: fastspin 6s ease-in-out infinite 2s;
        }
        .cube-inner li {
            left: 0; top: 0; right: 0; bottom: 0;
            margin: auto;
            position: absolute;
            width: 100px;
            height: 100px;
            background: #527C93FF;
            border: 1px solid #fff;
        }
        .cube-inner .top {
            transform: rotateX(90deg) translateZ(50px);
        }
        .cube-inner .bottom {
            transform: rotateX(-90deg) translateZ(50px);
        }
        .cube-inner .front {
            transform: translateZ(50px);
        }
        .cube-inner .back {
            transform: rotateX(-180deg) translateZ(50px);
        }
        .cube-inner .left {
            transform: rotateY(-90deg) translateZ(50px);
        }
        .cube-inner .right {
            transform: rotateY(90deg) translateZ(50px);
        }


        .cube{
            transform-style: preserve-3d;
            transform: rotateX(-25deg) rotateY(45deg);
            animation: slowspin 6s ease-in-out infinite 2s;
        }
        .cube li{
            left: 0; top: 0; right: 0; bottom: 0;
            margin: auto;
            position: absolute;
            width: 200px;
            height: 200px;
            background: rgba(141, 214, 249, 0.5);
            border: 1px solid #fff;
        }
        .cube .top {
            transform: rotateX(90deg) translateZ(100px);
        }
        .cube .bottom {
            transform: rotateX(-90deg) translateZ(100px);
        }
        .cube .front {
            transform: translateZ(100px);
        }
        .cube .back {
            transform: rotateX(-180deg) translateZ(100px);
        }
        .cube .left {
            transform: rotateY(-90deg) translateZ(100px);
        }
        .cube .right {
            transform: rotateY(90deg) translateZ(100px);
        }

        @keyframes fastspin {
            0% {
                transform: rotateX(-25deg) rotateY(45deg);
            }
            40%,
            to {
                transform: rotateX(-25deg) rotateY(-315deg);
            }
        }

        @keyframes slowspin {
            0% {
                transform: rotateX(-25deg) rotateY(45deg);
            }
            40%,
            to {
                transform: rotateX(-25deg) rotateY(315deg);
            }
        }
    </style>
</head>
<body>

<div class="demo-cube perspective">
    <ul class="cube-inner">
        <li class="top"></li>
        <li class="bottom"></li>
        <li class="front"></li>
        <li class="back"></li>
        <li class="right"></li>
        <li class="left"></li>
    </ul>
    <ul class="cube">
        <li class="top"></li>
        <li class="bottom"></li>
        <li class="front"></li>
        <li class="back"></li>
        <li class="right"></li>
        <li class="left"></li>
    </ul>
</div>
</body>
</html>
```

![image-20220912152247243](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209121522320.png)



## 高级特效

==会最先把元素基础属性弄好，然后应用滤镜，再是剪切，之后应用蒙版，最后整体合成（这一步会应用 opacity 属性）==

### CSS Shapes

之前我们知道，网页布局基本上是由矩形构成的，因此 HTML 元素天生有方形的特征

CSS Shapes 是一个新标准，旨在让 Web 设计者能使用各种形状（这里的形状会影响内容流）

该标准包含两组新属性：

+ 盒子中的内容形状：shape-inside（现在实现得还很不好）
+ 设置影响周边内容流的形状：shape-outside

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209121551820.png" alt="image-20220912155153579" style="zoom:33%;" /> 

shape-outside 属性值：

+ `circle()`：圆

  半径加位置

+ `ellipse()`：椭圆

  两个半径值加位置

+ `polygon()`：多边形

  创建多边形最简单的是使用 CSS Shapes Editor 插件获取

+ `insert()`：嵌入在盒子边界的矩形，也可以指定圆角

  一组长度值，分别表示到上、右、下、左边的距离，可以用 round 关键字指定圆角（与 border-radius 类似）

+ 基于透明度创建形状：如果我们的图片时透明 PNG 等自带透明度的图片，可以使用 url 函数将该图片传给 shape-outside

  通过 shape-image-threshold 可以设定不透明阈值（0~1.0）这样可以让不完全透明的部分不包含在形状内

```css
.sun{
    position: sticky;
    float: right;
    max-width: 60%;
    object-fit: cover;
    shape-outside: circle(); /*让外面受影响的是一个圆*/
}
```

![image-20220912163303260](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202209121633405.png)



#### 形状盒子与边距

我们可以将边距（这个边距可以是圆角的）指定为形状盒子

```css
.fig-moon{
    border-radius: 50%;
    shape-outside: border-box;
}
```

这个同样适用于：content-box、padding-box、margin-box



#### 给形状设置外边距

适用 shape-margin 可以给形状添加外边距

==这个和创建形状的方法无关==



***



### 剪切与蒙版

+ 剪切：会影响元素的响应区域
+ 蒙版：不会影响元素的响应区域

#### 剪切

使用 clip-path 属性

+ 它可以使用 CSS 形状中的基本形状函数定义如何裁剪
+ 也可以使用 SVG 文档裁剪，只要通过 URL 引用一个 \<clipPath> 元素即可

形状请参考上面的 CSS Shapes

==注意：由于裁剪产生的空白区域，可以给其他元素设置一个负外边距来解决==

#### 蒙版

蒙版可用于实现透明渐隐的功能

像透明PNG图片，它文件很大，我们可以使用 JPEG + SVG 蒙版来实现

```css
{
  /* Image values */
  mask: url(mask.png);            /* 使用位图来做遮罩 */
  mask: url(masks.svg#star);         /* 使用 SVG 图形中的形状来做遮罩 */
}
```

除了图片，mask 还可以接受一个类似 background-image 的参数，也就是渐变。

```css
{
  mask: linear-gradient(#000, transparent)  /* 使用渐变来做遮罩 */
}
```

然后这个也是可以用来做动画的



**PNG=>JPEG+SVG**

使用一个 Web 服务：ZorroSVG



***



### 混合模式与合成

#### 混合模式

在CSS中，有两个属性负责混合。 

+ `mix-blend-mode`用于混合DOM元素
+ `background-blend-mode`用于组合多个CSS背景。

==注意：背景层不会和元素中的内容层混合，此外不同堆叠上下文的元素不会互相混合（设置 opacity 可以产生堆叠上下文）==

可用的混合模式：

+ `multiply`：**正片叠底模式**

  低灰阶的像素显现而高灰阶不显现（即深色出现，浅色不出现）

+ `screen`：**屏幕/滤色模式**

  两张图片投影到一张上，浅色出现，深色不出现，整体会偏亮（白色完全不透明，黑色完全透明，可用于实现文字、图标镂空）

+ `overlay`：**叠加模式**

  这个融合会取中间颜色

+  `darken`：**变暗**

  比基色图层暗的像素保留，亮的像素用基色图层中暗的像素替换

+ `lighten`：**变亮**

  对混合的两个图层相对应区域RGB通道中的颜色亮度值进行比较，取较高的的像素点为混合之后的颜色

+ `color-dodge`

+  `color-burn`

+ `hard-light`：强光

+ `soft-light`：**柔光**

  而获得色彩较为柔和的合成效果（比叠加模式更加柔和）

+  `difference`：差值/差异模式

  C=/A-B/：与白色混合变混色，与黑色混合不变

+  `exclusion`

+  `hue`

+  `saturation`

+  `color`

+ `luminosity`：**明度**

  用当前图层的亮度值去替换下层图像的亮度值，而色相值与饱和度不变

  只能影响图片的明暗度，不能对基色的颜色产生影响，黑、白、灰除外。

+  `normal`



***



### 图像处理：滤镜

可以给元素添加图形滤镜，这个滤镜也会应用到元素的子元素                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       

**使用 filter 属性添加滤镜**

+ `url()`：引入 SVG
+ `blur()`：高斯模糊，较大的值将产生更多的模糊（不接收百分比）
+ `brightness()`：如果值大于 100% 变亮，低于 100% 变暗
+ `contrast()`：调整输入图像的对比度，同样超过 100% 对比度变高
+ `drop-shadow()`：对输入图像应用阴影效果。（函数接受 `<shadow>`（在 [CSS3 背景](https://www.w3.org/TR/css-backgrounds-3/#typedef-shadow)中定义）类型的值，除了 `inset` 和 `spread` 关键字。）与 box-shadow 比较像
+ `grayscale()`：改变输入图像灰度。`amount` 的值定义了转换的比例。值为 `100%` 则完全转为灰度图像，值为 `0%` 图像无变化。
+ `hue-rotate()`：函数在输入图像上应用色相旋转。`angle` 一值设定图像会被调整的色环角度值。值为 `0deg`，则图像无变化。若值未设置值，默认为 `0deg`。该值虽然没有最大值，超过 `360deg` 的值相当于又绕一圈。
+ `invert()`：反色。`amount` 的值定义转换的比例。值为 `100%` 则图像完全反转。值为 `0%` 则图像无变化。
+ `opacity()`：转化图像的透明程度。`amount` 的值定义转换的比例。值为 `0%` 则是完全透明，值为 `100%` 则图像无变化。
+ `saturate()`：饱和度，超过 100% 表示提高饱和度
+ `sepia()`：将图像转换为深褐色。`amount` 的值定义转换的比例。值为 `100%` 则完全是深褐色的，值为 `0%` 图像无变化。

==注意：filter 属性中函数是可以复合使用的（空格隔开）==



***



## CSS 变量

### 变量的声明与基本使用

通常我们在根的伪元素上声明（实际上是上给了 \<html> 上），这样全局都可以调用到了

```css
:root {
    --color: red;
}
.textBox{
    background-color: var(--color);
}
```

使用 CSS 变量的时候需要用到一个var的方法，这个方法提供两个参数（ CSS 变量名，默认值）

*当无法读取对应的 CSS 变量时就会取后面这个默认值。*

### 修改变量值

当我们创建一个 CSS 变量的时候，==这个 CSS 变量会被创建到目标元素的下面的.style 里面==，我们需要用 DOM 操作去获取这个元素。

对 style 使用 getPropertyValue 和 setProperty方法去访问和修改 CSS 变量。

:root 伪类对应`document.documentElement`（document.documentElement 始终指向 HTML 界面中的 \<html> 元素）

```js
document.documentElement.style.setProperty('--color', 'gray');
```



***



## less

> Less （Leaner Style Sheets 的缩写） 是一门向后兼容的 CSS 扩展语言。这里呈现的是 Less 的官方文档（中文版），包含了 Less 语言以及利用 JavaScript 开发的用于将 Less 样式转换成 CSS 样式的 Less.js 工具。

因为 Less 和 CSS 非常像，因此很容易学习。而且 Less 仅对 CSS 语言增加了少许方便的扩展，这就是 Less 如此易学的原因之一。



我们需要在项目中安装less以及less-loader这两个npm包，如下：

```
npm install less --save-dev
npm install less-loader --save-dev
```



### 变量（Variables）

无需多说，看代码一目了然：

```less
@width: 10px;
@height: @width + 10px;

#header {
  width: @width;
  height: @height;
}
```

编译为：

```css
#header {
  width: 10px;
  height: 20px;
}
```

**[了解关于变量的更多信息](https://less.bootcss.com/features/#variables-feature)**



### 混合（Mixins）

混合（Mixin）是一种将一组属性从一个规则集包含（或混入）到另一个规则集的方法。假设我们定义了一个类（class）如下：

```css
.bordered {
  border-top: dotted 1px black;
  border-bottom: solid 2px black;
}
```

如果我们希望在其它规则集中使用这些属性呢？没问题，我们只需像下面这样输入所需属性的类（class）名称即可，如下所示：

```less
#menu a {
  color: #111;
  .bordered();
}

.post a {
  color: red;
  .bordered();
}
```

`.bordered` 类所包含的属性就将同时出现在 `#menu a` 和 `.post a` 中了。（注意，你也可以使用 `#ids` 作为 mixin 使用。）

**[了解关于混合（Mixin）的更多信息](https://less.bootcss.com/features/#mixins-feature)**



### 嵌套（Nesting）

Less 提供了使用嵌套（nesting）代替层叠或与层叠结合使用的能力。假设我们有以下 CSS 代码：

```css
#header {
  color: black;
}
#header .navigation {
  font-size: 12px;
}
#header .logo {
  width: 300px;
}
```

用 Less 语言我们可以这样书写代码：

```less
#header {
  color: black;
  .navigation {
    font-size: 12px;
  }
  .logo {
    width: 300px;
  }
}
```

用 Less 书写的代码更加简洁，并且模仿了 HTML 的组织结构。

你还可以使用此方法将伪选择器（pseudo-selectors）与混合（mixins）一同使用。下面是一个经典的 clearfix 技巧，重写为一个混合（mixin） (`&` 表示当前选择器的父级）：

```less
.clearfix {
  display: block;
  zoom: 1;

  &:after {
    content: " ";
    display: block;
    font-size: 0;
    height: 0;
    clear: both;
    visibility: hidden;
  }
}
```

**[了解有关夫选择器的详细信息](https://less.bootcss.com/features/#parent-selectors-feature)**

#### @规则嵌套和冒泡

@ 规则（例如 `@media` 或 `@supports`）可以与选择器以相同的方式进行嵌套。@ 规则会被放在前面，同一规则集中的其它元素的相对顺序保持不变。这叫做冒泡（bubbling）。

```less
.component {
  width: 300px;
  @media (min-width: 768px) {
    width: 600px;
    @media  (min-resolution: 192dpi) {
      background-image: url(/img/retina2x.png);
    }
  }
  @media (min-width: 1280px) {
    width: 800px;
  }
}
```

编译为：

```css
.component {
  width: 300px;
}
@media (min-width: 768px) {
  .component {
    width: 600px;
  }
}
@media (min-width: 768px) and (min-resolution: 192dpi) {
  .component {
    background-image: url(/img/retina2x.png);
  }
}
@media (min-width: 1280px) {
  .component {
    width: 800px;
  }
}
```



### 运算（Operations）

算术运算符 `+`、`-`、`*`、`/` 可以对任何数字、颜色或变量进行运算。如果可能的话，算术运算符在加、减或比较之前会进行单位换算。计算的结果以最左侧操作数的单位类型为准。如果单位换算无效或失去意义，则忽略单位。无效的单位换算例如：px 到 cm 或 rad 到 % 的转换。

```less
// 所有操作数被转换成相同的单位
@conversion-1: 5cm + 10mm; // 结果是 6cm
@conversion-2: 2 - 3cm - 5mm; // 结果是 -1.5cm

// conversion is impossible
@incompatible-units: 2 + 5px - 3cm; // 结果是 4px

// example with variables
@base: 5%;
@filler: @base * 2; // 结果是 10%
@other: @base + @filler; // 结果是 15%
```

乘法和除法不作转换。因为这两种运算在大多数情况下都没有意义，一个长度乘以一个长度就得到一个区域，而 CSS 是不支持指定区域的。Less 将按数字的原样进行操作，并将为计算结果指定明确的单位类型。

```less
@base: 2cm * 3mm; // 结果是 6cm
```

你还可以对颜色进行算术运算：

```less
@color: (#224488 / 2); // 结果是 #112244
background-color: #112244 + #111; // 结果是 #223355
```

不过，你会发现 Less 提供的 [色彩函数](https://less.bootcss.com/functions/#color-operations) 更有用。

From 4.0, No division is performed outside of parens using `/` operator.

```less
@color: #222 / 2; // results in `#222 / 2`, not #111
background-color: (#FFFFFF / 16); //results is #101010
```

You can change [Math](https://less.bootcss.com/usage/#less-options-math) setting, if you want to make it always work, but not recommended.

#### calc() 特例

*Released [v3.0.0](https://github.com/less/less.js/blob/master/CHANGELOG.md)*

为了与 CSS 保持兼容，`calc()` 并不对数学表达式进行计算，但是在嵌套函数中会计算变量和数学公式的值。

```less
@var: 50vh/2;
width: calc(50% + (@var - 20px));  // 结果是 calc(50% + (25vh - 20px))
```



### 转义（Escaping）

转义（Escaping）允许你使用任意字符串作为属性或变量值。任何 `~"anything"` 或 `~'anything'` 形式的内容都将按原样输出，除非 [interpolation](https://less.bootcss.com/features/#variables-feature-variable-interpolation)。

```less
@min768: ~"(min-width: 768px)";
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}
```

编译为：

```less
@media (min-width: 768px) {
  .element {
    font-size: 1.2rem;
  }
}
```

注意，从 Less 3.5 开始，可以==简写==为：

```less
@min768: (min-width: 768px);
.element {
  @media @min768 {
    font-size: 1.2rem;
  }
}
```

==在 Less 3.5+ 版本中，许多以前需要“引号转义”的情况就不再需要了==。



### 函数（Functions）

Less 内置了多种函数用于转换颜色、处理字符串、算术运算等。这些函数在[Less 函数手册](https://less.bootcss.com/functions/)中有详细介绍。

函数的用法非常简单。下面这个例子将介绍如何利用 percentage 函数将 0.5 转换为 50%，将颜色饱和度增加 5%，以及颜色亮度降低 25% 并且色相值增加 8 等用法：

```less
@base: #f04615;
@width: 0.5;

.class {
  width: percentage(@width); // returns `50%`
  color: saturate(@base, 5%);
  background-color: spin(lighten(@base, 25%), 8);
}
```

**[参见：函数手册](https://less.bootcss.com/functions/)**



### 命名空间和访问符

(不要和 [CSS `@namespace`](http://www.w3.org/TR/css3-namespace/) 或 [namespace selectors](http://www.w3.org/TR/css3-selectors/#typenmsp) 混淆了)。

有时，出于组织结构或仅仅是为了提供一些封装的目的，你希望对混合（mixins）进行分组。你可以用 Less 更直观地实现这一需求。假设你希望将一些混合（mixins）和变量置于 `#bundle` 之下，为了以后方便重用或分发：

```less
#bundle() {
  .button {
    display: block;
    border: 1px solid black;
    background-color: grey;
    &:hover {
      background-color: white;
    }
  }
  .tab { ... }
  .citation { ... }
}
```

现在，如果我们希望把 `.button` 类混合到 `#header a` 中，我们可以这样做：

```less
#header a {
  color: orange;
  #bundle.button();  // 还可以书写为 #bundle > .button 形式
}
```

注意：如果不希望它们出现在输出的 CSS 中，例如 `#bundle .tab`，请将 `()` 附加到命名空间（例如 `#bundle()`）后面。



### 映射（Maps）

从 Less 3.5 版本开始，你还可以将混合（mixins）和规则集（rulesets）作为一组值的映射（map）使用。

```less
#colors() {
  primary: blue;
  secondary: green;
}

.button {
  color: #colors[primary];
  border: 1px solid #colors[secondary];
}
```

输出符合预期：

```css
.button {
  color: blue;
  border: 1px solid green;
}
```

**[参见： 映射（Maps）](https://less.bootcss.com/features/#maps-feature)**



### 作用域（Scope）

Less 中的作用域与 CSS 中的作用域非常类似。首先在本地查找变量和混合（mixins），如果找不到，则从“父”级作用域继承。

```less
@var: red;

#page {
  @var: white;
  #header {
    color: @var; // white
  }
}
```

与 CSS 自定义属性一样，混合（mixin）和变量的定义不必在引用之前事先定义。因此，下面的 Less 代码示例和上面的代码示例是相同的：

```less
@var: red;

#page {
  #header {
    color: @var; // white
  }
  @var: white;
}
```

**[参见：懒加载](https://less.bootcss.com/features/#variables-feature-lazy-loading)**



### 注释（Comments）

块注释和行注释都可以使用：

```less
/* 一个块注释
 * style comment! */
@var: red;

// 这一行被注释掉了！
@var: white;
```



### 导入（Importing）

“导入”的工作方式和你预期的一样。你可以导入一个 `.less` 文件，此文件中的所有变量就可以全部使用了。如果导入的文件是 `.less` 扩展名，则可以将扩展名省略掉：

```css
@import "library"; // library.less
@import "typo.css";
```

**[了解更多关于导入(Importing)的知识](https://less.bootcss.com/features/#imports-feature)**



***



## 移动端开发

### 初始化配置

rem适配

```cmd
yarn add postcss-pxtorem@5.1.1 amfe-flexible -S
```

1. amfe-flexible

   配置可伸缩布局方案，将 1rem 设为 viewWidth/10

   在 main.js 引用就可直接使用 

2. postcss-pxtorem

   postcss 的插件，用于将像素单位生成 rem 单位

![image-20230114142700823](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202301141427895.png) 安装完成后 package.json 中会生成对应依赖

引入后要进行相应配置

不同 vue-cli 版本不同，配置方法不同

1. 创建rem.js文件（==通过运算将 rem 的大小与设备宽度相适应，实现对不同设备的适配==）

   ==注意：amfe-flexible 与该 js 代码的功能相同，所以只需要使用一个==

   在src目录新建rem文件夹（一般情况下可以创建util文件夹），新建rem.js，添加如下代码

   ```js
   //兼容处理
   function setHtml() {
       //获取设备宽度
       var deviceWidth = document.documentElement.offsetWidth;
       //给html标签设置fontSize，就是给rem赋值
       document.documentElement.style.fontSize = deviceWidth / 375 * 10 + 'px';
   }
   
   //窗口大小变化的时候执行
   window.onresize = setHtml;
   //页面初始加载时也要触发
   setHtml();
   ```

2. 新建 .postcssrc.js

   在项目根目录新建 .postcssrc.js（注意 . 不要忘记加）,添加代码如下:

   ```js
   module.exports = {
       "plugins": {
           "postcss-pxtorem": {
               "rootValue": 37.5,
               "propList": ["*"]
           }
       }
   }
   ```

2. 在main.js中引入
    注意：路径根据自己新建的文件夹为准

   ```js
   import '@/rem/rem.js'
   ```

成功标志：

![image-20230114144103107](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202301141441168.png) 

会自动把我们设的 px 单位转换为对应 rem 单位值





## 暗黑模式

### 使用 css 媒体查询

```css
@media (prefers-color-scheme: dark){
}
```

属性值：

- no-preference: 表示系统未得知用户在这方面的选项
- light: 表示用户已告知系统他们选择使用浅色主题的界面
- dark: 表示用户已告知系统他们选择使用暗色主题的界面

使用这种方式实现能自动识别用户使用的主题

+ 好处：可以对每个元素的样式做精细化处理，分别做两套样式
+ 坏处：
  1. 浏览器的主题通常是在设置中进行设置的，往往用户会固定使用一套，不方便切换
  2. css 中所有关于颜色的往往都要设计两套，代码量增加且设计量增加



### js切换

这里我们实现一套我们自己的色彩管理系统，不再依赖于浏览器的主题

这样就更方便地写类似切换按钮这样的东西，方便用户使用

**核心**：css 变量

**实现**：

+ 写几套不同主题的样式变量
+ 通过修改 current 变量（正式使用的颜色样式）实现色彩主题的切换

```css
:root {
  /* 模式切换变量，默认light模式 */
  --current-background-color: var(--light-background-color);
  --current-primary-color: var(--light-primary-color);

  /* 浅色主题 */
  --light-primary-color: #666;
  --light-background-color: #fff;

  /* 深色主题 */
  --dark-primary-color: #fff;
  --dark-background-color: #282c34;
}
```

js 切换 css 变量：

当我们创建一个 CSS 变量的时候，==这个 CSS 变量会被创建到目标元素的下面的.style 里面==，我们需要用 DOM 操作去获取这个元素。

对 style 使用 getPropertyValue 和 setProperty方法去访问和修改 CSS 变量。

:root 伪类对应`document.documentElement`（document.documentElement 始终指向 HTML 界面中的 \<html> 元素）

```js
const changeTheme = (() => {
    let currentTheme = 'light';
    return function () {
        if (currentTheme == 'light') currentTheme = 'dark';
        else currentTheme = 'light';
        document.documentElement.style
            .setProperty('--current-background-color', `var(--${currentTheme}-background-color)`);
        document.documentElement.style
            .setProperty('--current-primary-color', `var(--${currentTheme}-primary-color)`);
    }
})();
```

这里使用闭包仅仅是为了将切换的变量封装起来，实际使用时往往该变量要和其他组件相作用，不需要封装（可以用 vuex 进行集中管理）



### 色彩翻转

对页面的色彩进行翻转，将图像元素进行豁免

这个方法的实现成本最低，但是往往效果不好

使用 filter（滤镜）中的 invert（反色）、hue-rotate（色相翻转）

`invert()`简单理解就是`黑变白，白变黑，黑白颠倒`。`hue-rotate()`简单理解就是`冲淡颜色`。为了确保主题色调不会改变，将色相旋转声明为`180deg`比较合理。

```css
html {
    filter: invert(1) hue-rotate(180deg);
}
```

图片豁免：再执行一次就转回来了

```css
.exclude {
    filter: invert(1) hue-rotate(180deg);
}
```

最好的应用方法是通过 css 的属性选择符 [] 来判断我们使用的主题

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title></title>
</head>
<body>

<div class="textBox">哈哈哈</div>
<img src="./img.png" class="img exclude">
<input class="checkBox exclude" type="checkbox" id="btn">

</body>
<script>
    const btn = document.getElementById('btn');
    btn.addEventListener('click', () => {
        if (btn.checked) {
            document.documentElement.setAttribute('theme', 'dark');
        } else {
            document.documentElement.setAttribute('theme', 'light');
        }
    })

</script>

<style>
    /*反色*/
    :root[theme = 'dark'] {
        filter: invert(1) hue-rotate(180deg);
    }
    /*豁免*/
    :root[theme = 'dark'] .exclude {
        filter: invert(1) hue-rotate(180deg);
    }
    /*这个是为了反映背景变化，因为这里默认背景透明看不出效果*/
    :root{
        background-color: white;
    }

    .img {
        width: 200px;
        height: 200px;
        object-fit: cover;
    }

    /*夹点私货，选择框的样式实现*/
    .checkBox {
        box-sizing: border-box;
        -webkit-appearance: none; /*去除默认样式*/
        -webkit-appearance: none;
        -moz-appearance: none;
        -o-appearance: none;
        -ms-appearance: none;

        height: 20px;
        width: 40px;
        background-color: #f5f5f5;
        border-radius: 24px;
        position: relative;
        z-index: 1;
        border: 1px solid rgba(0, 0, 0, 0.3);
        transition: all ease-in-out 0.3s;
    }

    .checkBox:after {
        box-sizing: border-box;
        content: '';
        position: absolute;
        height: 18px;
        width: 18px;
        border-radius: 24px;
        background-color: #fff;
        z-index: 5;
        box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.3);
        transition: all ease-in-out 0.3s;

    }

    .checkBox:checked {
        background-color: green;
    }

    .checkBox:checked:after {
        transform: translate3d(20px, 0, 0);
        box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
    }

</style>
</html>
```

效果：

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202302052023304.png" alt="image-20230205202305173" style="zoom: 50%;" /> 

<img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202302052025688.png" alt="image-20230205202516558" style="zoom:50%;" />  



```js
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [vue(), legacy({
    targets: ['default','IE 11']
  })],

  build: {
    outDir: "product"
  }
})
```

