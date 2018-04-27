---
layout: post
title: "用React构建一个小商城（四）"
date: 2017-08-15
excerpt: "用 redux 来管理应用状态"
tags: [web, 学习, 前端, React]
comments: true
---

关于 Redux *阮一峰* 的博客中讲解的很清晰[Redux 入门教程](http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html)

在这里只总结一下实际项目中遇到的一些问题。

***

### 关于如何组织`src/`目录下的代码

参考[《深入React技术栈》](http://www.ituring.com.cn/book/1898)中5.6.2节；主要有两种方式：
1. 根据类型划分的文件结构（file structure based type），其形式大致如下：
```
  src/
  ├── app.js
  ├── actions
  │　　├── XXAction.js
  │　　└── YYAction.js
  ├── components
  │　　├── XXComponent.js
  │　　└── YYComponent.js
  ├── constants
  │　　├── XXConstants.js
  │　　└── YYConstants.js
  └── reducers
  　　　├── XXReducer.js
  　　　└── YYReducer.js
```

2. 使用混合方式划分文件结构，既采用了类型划分的优势，又添加了功能划分（file structure based feature）的特点。
```
src/　　　　　　　　　　　　　　　所有源代码存放的路径
├── app.js　　　　　　　　　 　　 整个应用的入口
├── views　　　 　　　 　　　　　 应用中某个页面的入口文件，一般为路由组件
│　　├── Home.js　 　　　 　　　  例如，首页的入口就是 Home.js
│　　├── Home.css　　　　　　　   Home 页面对应的样式
│　　└── HomeRedux.js　　 　　    Home 页面中所有与 Redux 相关的 reducer、action creator 的汇总，即 components/
│　　　　　　　　　　　　　　　　 Home/下所有 *Redux.js 的汇总
├── components　　　　　　　 　   所有应用的组件
│　　├── Home 　　　　 　　　　   例如，views/ 中一个名为 Home 的 view，则在 components/ 中就有一个名为 Home
│　　│　　│　　　　　　　　 　　  的子文件夹
│　　│　　├── Table.js　 　　　　 Home 页面中的一个列表组件
│　　│　　├── Table.css　　 　　  列表组件对应的样式
│　　│　　└── TableRedux.js　　   列表组件的 reducer、action creator 及 action type，整合在同一个文件中
│　　└── shared　　 　　　 　　　 不归属于任何 view 的组件，如一些公共组件等
├── containers
│　　├── DevTools.js　　　　　　  配置 DevTools
│　　└── Root.js　　　 　　 　　　一般被 app.js 依赖，用于根据环境判断是否需要加载 DevTools
├── layouts　　　　　　　　　　　 布局相关的组件及样式，如菜单、侧边栏、header、footer 等
├── redux　　　　　　　　　　　　 Redux store 相关的配置
│　　└── reducers.js　　　　　　　整个应用中所有 reducer 的汇总
├── routes　　　　　　 　　　　 　路由相关的配置
├── utils　　 　 　　　　 　　　　工具函数、常量等
├── styles　　　　　　　　　　　　全局公共样式
└── app.css　　　　　　　　 　　　应用主样式表
```

在本次项目中，因为页面会比较多，并且感觉第二种组织方式在写代码时会比较方便，所以参考了第二种的组织方式。
***

当然，用这种方式也会有个问题：

当有多个组件会共用同一个 `action creator`的时候，这个`action creator`要放在哪里？
个人能想到的解决方法有如下几个：

  1. 单独再抽离出来一个`action creator`文件，用来写这些公用的`action creator`。  
    采用这种方式时，因为我们很难确定到底会有多少个共用的`action creator`。并且，在写、或是调用`action creator`时，我们还要先想想，这个`action creator`是不是别的组件也会用。组织起来比较费脑筋。
  2. 一个组件要用到哪些`action creator`就在该组件`*Redux.js`文件中写多少个`action creator`。  
    例如：`Table.js`需要的的所有`action creator`都放在`TableRedux`中。  
    采用这种方式的好处是，我们写`action creator`时，不用考虑共享的问题，只要组件需要，直接写就行，不费脑筋；缺点就是可能会有许多冗余的代码，并且，当某个`action`有变动时，可能需要修改多处代码。
  3. 根据组件类型，将会影响该组件状态的`action creator`都放在该组件`*Redux.js`文件中。  
    采用这种方式可以少写一点`action creator`，并且在调用时，找到`action creator`会影响的组件，就能找到该`action creator`的位置。但是，跨组件间交换`action creator`还是比较麻烦。

  在本次项目开始的时候，用的是第三种方法，但后来在用`mapDispatchToProps`中传递`action creator`实在是太麻烦；所以个人感觉还是第二种方法比较好。

***

### 关于`state`树的设计

在用`redux`的时候，我们需要先思考一下，到底哪些东西需要交给`redux`。
虽然，个人觉得，只把那些会有多个组件共用的数据，需要被缓存的数据，以及可以被别的组件操控的数据交给`redux`，组件自己玩的东西就交给自己处理好了。

虽然理论上来讲，我们可以将所有的状态都交给`redux`，每次`state`的改变都`dispatch`个`action`；但是这样会有大量无聊的代码，众多重复性的工作，同时还有一定的性能问题。（例如，最开始的时候，我给`input`的`onChange`事件也添加了个`action`，结果就是输入的时候卡到飞起。。。。）。

当然，`redux`的`state`还可以用于缓存，例如当我们首次向服务器请求*商品列表数据*后，将*商品列表数据*放在`state`树中，因为商品列表这种东西很少会有变动，所以在下一次进入该页面时，可以直接从`state`树中读取该部分数据就好，不用再向服务器发请求，当然，也可以再设置一个手动刷新来防止数据过期。

关于如何组织`state`树，这是个很纠结的问题。本次项目中，我是直接按页面来划分的`state`，感觉效果还算可以吧。。。

### 关于`redux`的异步

忍不住想吐槽，异步这一块儿刚开始写起来真的有种，生不如死的感觉。太烦了！  

异步获取数据： 搭配`redux-thunk`写，感觉还行。  

试试来点儿复杂的，例如修改一下购物车中商品的数量，我们的应用逻辑：

提交数据到服务器 ==> 组件状态变为`提交中` ==> 服务器响应提交请求 ==> 组件状态变为`提交成功` ==> 获取新的`state` ==> 更新订阅了该`state`的组件。 

看起来还可以，不算是很复杂。但在修改`state`这块儿，真的一定要组织好`state`树，保证能简单快速地修改`state`来拿到新的`state`。（说多都是累啊！）



