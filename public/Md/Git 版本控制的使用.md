# Git 版本控制的使用

git 的安装自见教程，非常简单

它可以用来控制版本以及帮助托管代码到 GitHub 或者 gitee 上面（当然能帮我们拿下来）

## 设置用户

注意：这个不是登陆，是给这台电脑设置一个用户，告诉远程仓库是谁上传的

`git config --global user.name "Your Name"`

`git config --global user.email "Your email"`

## 本地文件夹操作

### 进入文件夹

有两种打开方式

1. 直接在电脑上找到那个文件夹，然后进去直接右键选择 Git Bash here

   ![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202202181830787.png) 

2. 在 Git Bash 中输入路径

   ==注意：==使用 cd 命令进入到目录时，在 Git Bash 中应该使用斜线 "/" 而不是反斜线 "\\"

   + 可以直接输入一个完整的文件夹路径

     <img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202202181834808.jpg" style="zoom:150%;" /> 

   + 也可以逐层 cd 进去

     <img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202202181834577.jpg" style="zoom:150%;" /> 

### 查看

+ 当前目录

  输入命令之前上面一行字后面黄色部分就是现在所在的位置

  也可以输入`pwd`进行查看

+ 查看当前文件夹都有什么文件

  `ls`

  <img src="https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202202181838316.jpg" style="zoom:150%;" /> 

### 退出

`cd ..`退回到上一个文件夹

### 新建 / 删除

1. 新建文件夹

   `mkdir 文件名`

2. 新建文件

   `touch 文件名`（文件名要 .文件类型）

3. 删除文件

   `rm 文件名`（文件名要 .文件类型）

## 仓库设置

我们想让 Git 完成代码托管和版本控制的任务，就需要准备好**本地仓库**和**远程仓库**

我们在本地仓库里写好代码，然后通过 Git 到远程仓库进行托管

### 初始化本地仓库

打开你想建立本地仓库的文件夹（可以写了东西也可以是空的）

使用命令`git init`

初始化成功后，文件夹里会多出一个隐藏文件 .git（千万别删！！！）

### 建立远程仓库

![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202202182003296.jpg)

根据项目需求不同对其进行设置

之前私有仓库好像是要钱的，现在好像不要了

## 建立连接

我们需要建立远程仓库和本地仓库的连接，这样才能实现上传与下载操作

==需要注意的是：==只有项目仓库的主人才能使用 SSH 连接，如果是成员则使用 HTTPS 连接

不管是哪种连接方式都是一样的操作（HTTPS 每次 fetch 和 push 代码都需要输入账号密码）

### 配置 SSH

小长，贴个链接

https://blog.csdn.net/qq_36667170/article/details/79094257?utm_source=app&app_version=5.0.1&code=app_1562916241&uLinkId=usr1mkqgl919blen

### 连接

使用 HTTPS 时每次 fetch 和 push 代码都需要输入账号密码

使用 SSH 只需要最开始时配置一遍

复制红框中的代码

![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202202182051118.png)

在你想连接的本地仓库打开 Git bash（注意：之前必须把这个项目文件初始化成了本地仓库）

`git remote add 名字 连接地址`

![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202202182055057.png)

这样就绑定好了，可以使用`git remote -v`测试是否连接成功

![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202202182057913.png)

注意到 fetch 和 push 都是成对出现的

**解绑：**

`git remote remove 名字`

## 文件上传

当我们对项目文件进行更新后，需要将更新进行上传（新的不稳定代码先弄到分支中，之后主程序更新时合并，不过现在不讨论那么多）

使用`git status`查看所有更新了但没有放入缓存区的文件

![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202202182104088.png)

### git add 将修改的文件添加到缓存区

将要提交的文件加到索引库中

它是可以使用通配符 "*" 的

1. `git add 文件名.文件类型`：直接将单个文件加进来
2. `git add 文件名.文件类型 文件名.文件类型...`：加入多个文件
3. `git add -u`：加入被修改（modified）和被删除（deleted）的文件，不包括新文件（new）
4. `git add .`：不包括被删除的文件（deleted）
5. `git add -A`提交==所有变化==，这个最重要

### git commit

将当前缓存区的文件实际保存到仓库的历史记录中，顺便加一个注释，这样项目成员都可以看到本次更新了什么东西

`git commit -m "注释"`

![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202202182125334.png)

一定要加`-m`，否则会进入vim编辑器，对新手很不友好

#### 查看 / 修改提交记录

+ `git log`

  用这个可以检查自己的 commit 注释是不是写错了

+ `git commit --amend -m "修改后的内容"`

+ 抢救文件名：直接修改文件名字之后重新上传就好了

不过修改后 push 可能会报错，因为 github 觉得我的本地库和远程仓库冲突了：（两者上次的 commit 不一样，远程仓库认为它们不一样）

![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202202191910547.png)

因为刚才在本地修改了上一次的 commit 信息，这时候需要强制推送，顶掉以前的 commit

`git push 仓库名 分支 -f`

"-f" —— force 强制

### git push 提交代码

第一次推的时候需要`-u`以后就不需要了

`git push -u 仓库名 分支`

`git push 仓库名 分支 -f` 强制推送

需要注意的是这个分支，一般一个项目会有多个分支，日常工作时将代码提交到我们自己的分支上面，最后版本更新时再整合到主分支上面去

此外，每天开始工作时需要把之前的代码 pull 下来，改完后再 push 上去，不然会报错（版本信息对不上冲突）

#### 改分支名

`git branch -m 旧名字 新名字`

## 文件下拉

上面 push 报错，我们知道数据是差在 commit 上面，所以可以使用强制推送，但是在团队中，==如果出现 push 报错，那么肯定是队友修改了远程仓库==，你这时候强制推送那你就是在犯罪！！！

解决办法：将新代码拉下来，保证在修改前自己的文件跟远程仓库一致

**方法1：git pull**

`git pull 文件名 分支名`

**方法2：git fetch + git merge**

git fetch 只是拉取了远程数据，并没有更改本地代码

git merge 才执行合并数据

可以近似理解为 git pull = git fetch + git merge

### 文件克隆

文件克隆是把远程仓库的内容直接全部抓下来（不会合并代码）

想把文件丢在哪就在哪打开 git bash

`git clone 加上HTTPS或者SSH链接`

文件夹名字会自动变成远程仓库的名字

==然后克隆下来的文件夹会自动连接到远程仓库==，所以不再需要进行绑定了

```git
//指定分支
git clone -b 分支名 仓库地址
```



## 分支操作

### 创建分支

```git
git branch <b_name> //创建分支
git checkout <b_name> //切换分支
git branch -d <b_name> //删除分支
```

分支中的操作看前面

### 合并分支

1. 切换到目标分支

   ```js
   git checkout 分支名
   ```

2. 查看分支状态

   ```git
   git branch
   ```

3. 合并分支上的代码

   ```git
   git merge 来源分支名
   ```

#### 合并分支的不同情况

对应三种场景：

1. “快进”(无冲突)：

   此时分支仅是主分支的直接后续版本

   <img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly93czEuc2luYWltZy5jbi9sYXJnZS8wMDZWckpBSmd5MWc1ajRqMXFodjNqMzBrdzBiYmRmdy5qcGc" alt="img" style="zoom: 50%;" /> 

2. 非“快进”，修改不同文件。(无冲突)：

   此时主分支对某文件进行了修改，同时子分支对其他文件进行了修改

   <img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly93czEuc2luYWltZy5jbi9sYXJnZS8wMDZWckpBSmd5MWc1ajVsbXViOXhqMzBndjBhb2FhNS5qcGc" alt="img" style="zoom:50%;" /> git merge 会找到B4、B3的共同祖先B2，然后进行合并

   <img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly93czEuc2luYWltZy5jbi9sYXJnZS8wMDZWckpBSmd5MWc1ajV1MHhsY2tqMzBrazBhaG14Yi5qcGc" alt="img" style="zoom:50%;" /> 

3. 非“快进”，修改相同文件。(有冲突)

   由于修改了相同文件产生冲突 Git 没法干净的合并它们，此时 Git 会暂停合并，等待你去解决冲突，可以通过 git status 来查看哪些文件产生了冲突

   解决冲突：==手动解决==

   打开文件，会发现 git 帮我们标注出来了当前分支的代码区别，我们需要人工识别使用哪段代码然后再提交

   ```git
   This is test-1.
   update test-1.
   add test-1.
   <<<<<<< HEAD
   这是在master中修改后的内容
   =======
   这是在son中修改后的内容
   >>>>>>> dev
   ```

   修改后再 git add 提交就好了



## Git 撤销/回滚

<img src="https://ask.qcloudimg.com/http-save/yehe-5799784/t0jam7sqb0.jpeg?imageView2/2/w/1620" alt="img" style="zoom: 67%;" /> 

分为以下几种情况：==注意：此处HEAD指代当前版本==

1. 工作区代码回滚：

   ```git
   git checkout -- a.txt   # 丢弃某个文件，或者
   git checkout -- .       # 丢弃全部
   ```

   运行后文件会恢复缓存区中的状态

2. 代码git add到缓存区，并未commit提交

   ```git
   git reset HEAD .  或者
   git reset HEAD a.txt
   ```

   这个命令仅改变暂存区，并不改变工作区，这意味着在无任何其他操作的情况下，工作区中的实际文件同该命令运行之前无任何变化

3. git commit到本地分支、但没有git push到远程

   ```
   git log # 得到你需要回退一次提交的commit id
   git reset --hard <commit_id>  # 回到其中你想要的某个版
   或者
   git reset --hard HEAD^  # 回到最新的一次提交
   或者
   git reset HEAD^  # HEAD^ 表示上一个版本，即上一次的commit
   ```

   --soft 不删除工作空间的改动代码 ，撤销commit，不撤销git add file

   --hard 删除工作空间的改动代码，撤销commit且撤销add

   另外一点，如果commit注释写错了，先要改一下注释，有其他方法也能实现，如：

   ==git commit --amend 这时候会进入vim编辑器，修改完成你要的注释后保存即可。==

4. 回滚远程仓库==有风险==

   1）通过git reset是直接删除指定的commit

   ```git
   git log # 得到你需要回退一次提交的commit id
   git reset --hard <commit_id>
   git push 仓库名 HEAD --force # 强制提交一次，之前错误的提交就从远程仓库删除
   ```

   2）通过git revert 用一次新的commit来回滚之前的commit

   ```git
   git log # 得到你需要回退一次提交的commit id
   git revert <commit_id>  # 撤销指定的版本，撤销也会作为一次提交进行保存
   ```

   3） git revert 和 git reset的区别

   - git revert 用一次新的commit来回滚之前的commit，此次提交之前的commit都会被保留；
   - git reset 回到某次提交，提交及之前的commit都会被保留，但是此commit id之后的修改都会被删除



## commit合并

git rebase 变基操作的实质是==丢弃一些现有的提交，然后相应地新建一些内容一样但实际上不同的提交==。 

注意：千万不能在已经推送到远程仓库的提交上进行变基！这会导致其他同事开发代码基于的版本变动，产生冲突

正确使用是将多次提交保存在本地（commit 但不 push），然后代码完成后合并为一个 commit 提交到远程仓库

1. `git log`显示最近的提交，找到要合并的版本

   ![image-20230223214504840](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202302232145884.png) 

   这里要将这三次合并，就要找到这三的前一个版本（版本号 a9a44bad657700b3bb229920f1f13ec93dfeb466）

2. `git rebase -i 版本号`

   使用**git rebase -i**命令后，会进入Git内置的vim界面

   ![image-20230223214837087](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/img/202302232148120.png) 

   将要保留的那一条说明设为pick，其他的设置为 f（设置成 s 需要再删除多余的描述）:wq 退出编辑就成功合并了
