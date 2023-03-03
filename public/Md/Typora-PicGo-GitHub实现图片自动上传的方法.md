Typora-PicGo-GitHub实现图片自动上传的方法

先说明之前遇上的一些奇怪问题

GitHub似乎对我有限制无论是下载还是上传速度都极其慢，具体表现是下载PicGo的时候下载速度只有k级，图片上传显示成功但无法看，不能拿下来

## GitHub

![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/20210311084551.jpg)

![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/20210311084604.jpg)

接下来要在GitHub里面创建令牌（Token）**需要注意，本步骤后面给出的令牌只会显示一次要自己保存**

+ 点击头像，选中Settings

![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/20210311085048.jpg)

![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/20210311085123.jpg)

![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/20210311085202.jpg)

![v2-3104a1ab3de2c6e8a4e0d76837c4e18a](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/20210311085240.jpg)

**下面的令牌一定要保存！！！**

![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/20210311085439.jpg)

接下来是GitHub的下载解锁，需要更改hosts文件

+ 方法：一般权限会不够，不能直接在里面修改，解决办法是把它复制下来粘贴到桌面，更改完后保存并复制到它原来的文件夹里面，覆盖掉之前的hosts。

+ hosts文件的路径：c盘/Windows/System32/drivers/etc

  当然可以用cmd直接调出来

复制下来后用记事本打开，在最后面加上（前面的千万别改啊）

```
# GitHub Start 
140.82.113.3      github.com
140.82.114.20     gist.github.com
151.101.184.133    assets-cdn.github.com
151.101.184.133    raw.githubusercontent.com
151.101.184.133    gist.githubusercontent.com
151.101.184.133    cloud.githubusercontent.com
151.101.184.133    camo.githubusercontent.com
151.101.184.133    avatars0.githubusercontent.com
199.232.68.133     avatars0.githubusercontent.com
199.232.28.133     avatars1.githubusercontent.com
151.101.184.133    avatars1.githubusercontent.com
151.101.184.133    avatars2.githubusercontent.com
199.232.28.133     avatars2.githubusercontent.com
151.101.184.133    avatars3.githubusercontent.com
199.232.68.133     avatars3.githubusercontent.com
151.101.184.133    avatars4.githubusercontent.com
199.232.68.133     avatars4.githubusercontent.com
151.101.184.133    avatars5.githubusercontent.com
199.232.68.133     avatars5.githubusercontent.com
151.101.184.133    avatars6.githubusercontent.com
199.232.68.133     avatars6.githubusercontent.com
151.101.184.133    avatars7.githubusercontent.com
199.232.68.133     avatars7.githubusercontent.com
151.101.184.133    avatars8.githubusercontent.com
199.232.68.133     avatars8.githubusercontent.com
# GitHub End
```

保存并覆盖掉原来的hosts

完成后就会发现GitHub的下载已经是正常速度了，这时候去下载PicGo就会很快

## PicGo

PicGo是在GitHub中下载的，这个就自己去找吧，那个里面教程什么的都很完善直接开就行

下载完后打开软件，点击左边图床设计，选择GitHub图床

![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/20210311093204.jpg)

分支名更改为main

然后在最后面自定义域名那里打上https://testingcf.jsdelivr.net/gh/用户名/仓库名，找个代理上传

![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/20210311093417.jpg)

## Typora

![](https://testingcf.jsdelivr.net/gh/XiaMingYu77/My-Markdown-Picture/20210311093703.jpg)

插入图片时...  那个地方设置一下插入就上传就完成了，后面验证路径通过完事

这是我自己的令牌

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