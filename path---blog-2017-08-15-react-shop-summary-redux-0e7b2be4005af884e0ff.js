webpackJsonp([0xd008e5c1c8d4],{368:function(e,a){e.exports={data:{markdownRemark:{id:"C:/Users/IronMan/Desktop/projects/blog/src/pages/blog/2017-08-15-react-shop-summary-redux.MD absPath of file >>> MarkdownRemark",html:'<p>关于 Redux <em>阮一峰</em> 的博客中讲解的很清晰<a href="http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html">Redux 入门教程</a></p>\n<p>在这里只总结一下实际项目中遇到的一些问题。</p>\n<hr>\n<h3 id="关于如何组织code-classlanguage-textsrccode目录下的代码"><a href="#%E5%85%B3%E4%BA%8E%E5%A6%82%E4%BD%95%E7%BB%84%E7%BB%87code-classlanguage-textsrccode%E7%9B%AE%E5%BD%95%E4%B8%8B%E7%9A%84%E4%BB%A3%E7%A0%81" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>关于如何组织<code class="language-text">src/</code>目录下的代码</h3>\n<p>参考<a href="http://www.ituring.com.cn/book/1898">《深入React技术栈》</a>中5.6.2节；主要有两种方式：</p>\n<ol>\n<li>\n<p>根据类型划分的文件结构（file structure based type），其形式大致如下：</p>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">src/\n├── app.js\n├── actions\n│　　├── XXAction.js\n│　　└── YYAction.js\n├── components\n│　　├── XXComponent.js\n│　　└── YYComponent.js\n├── constants\n│　　├── XXConstants.js\n│　　└── YYConstants.js\n└── reducers\n　　　├── XXReducer.js\n　　　└── YYReducer.js</code></pre>\n      </div>\n</li>\n<li>\n<p>使用混合方式划分文件结构，既采用了类型划分的优势，又添加了功能划分（file structure based feature）的特点。</p>\n<div class="gatsby-highlight">\n      <pre class="language-text"><code class="language-text">src/　　　　　　　　　　　　　　　所有源代码存放的路径\n├── app.js　　　　　　　　　 　　 整个应用的入口\n├── views　　　 　　　 　　　　　 应用中某个页面的入口文件，一般为路由组件\n│　　├── Home.js　 　　　 　　　  例如，首页的入口就是 Home.js\n│　　├── Home.css　　　　　　　   Home 页面对应的样式\n│　　└── HomeRedux.js　　 　　    Home 页面中所有与 Redux 相关的 reducer、action creator 的汇总，即 components/\n│　　　　　　　　　　　　　　　　 Home/下所有 *Redux.js 的汇总\n├── components　　　　　　　 　   所有应用的组件\n│　　├── Home 　　　　 　　　　   例如，views/ 中一个名为 Home 的 view，则在 components/ 中就有一个名为 Home\n│　　│　　│　　　　　　　　 　　  的子文件夹\n│　　│　　├── Table.js　 　　　　 Home 页面中的一个列表组件\n│　　│　　├── Table.css　　 　　  列表组件对应的样式\n│　　│　　└── TableRedux.js　　   列表组件的 reducer、action creator 及 action type，整合在同一个文件中\n│　　└── shared　　 　　　 　　　 不归属于任何 view 的组件，如一些公共组件等\n├── containers\n│　　├── DevTools.js　　　　　　  配置 DevTools\n│　　└── Root.js　　　 　　 　　　一般被 app.js 依赖，用于根据环境判断是否需要加载 DevTools\n├── layouts　　　　　　　　　　　 布局相关的组件及样式，如菜单、侧边栏、header、footer 等\n├── redux　　　　　　　　　　　　 Redux store 相关的配置\n│　　└── reducers.js　　　　　　　整个应用中所有 reducer 的汇总\n├── routes　　　　　　 　　　　 　路由相关的配置\n├── utils　　 　 　　　　 　　　　工具函数、常量等\n├── styles　　　　　　　　　　　　全局公共样式\n└── app.css　　　　　　　　 　　　应用主样式表</code></pre>\n      </div>\n</li>\n</ol>\n<p>在本次项目中，因为页面会比较多，并且感觉第二种组织方式在写代码时会比较方便，所以参考了第二种的组织方式。</p>\n<hr>\n<p>当然，用这种方式也会有个问题：</p>\n<p>当有多个组件会共用同一个 <code class="language-text">action creator</code>的时候，这个<code class="language-text">action creator</code>要放在哪里？\n个人能想到的解决方法有如下几个：</p>\n<ol>\n<li>单独再抽离出来一个<code class="language-text">action creator</code>文件，用来写这些公用的<code class="language-text">action creator</code>。<br>\n采用这种方式时，因为我们很难确定到底会有多少个共用的<code class="language-text">action creator</code>。并且，在写、或是调用<code class="language-text">action creator</code>时，我们还要先想想，这个<code class="language-text">action creator</code>是不是别的组件也会用。组织起来比较费脑筋。</li>\n<li>一个组件要用到哪些<code class="language-text">action creator</code>就在该组件<code class="language-text">*Redux.js</code>文件中写多少个<code class="language-text">action creator</code>。<br>\n例如：<code class="language-text">Table.js</code>需要的的所有<code class="language-text">action creator</code>都放在<code class="language-text">TableRedux</code>中。<br>\n采用这种方式的好处是，我们写<code class="language-text">action creator</code>时，不用考虑共享的问题，只要组件需要，直接写就行，不费脑筋；缺点就是可能会有许多冗余的代码，并且，当某个<code class="language-text">action</code>有变动时，可能需要修改多处代码。</li>\n<li>根据组件类型，将会影响该组件状态的<code class="language-text">action creator</code>都放在该组件<code class="language-text">*Redux.js</code>文件中。<br>\n采用这种方式可以少写一点<code class="language-text">action creator</code>，并且在调用时，找到<code class="language-text">action creator</code>会影响的组件，就能找到该<code class="language-text">action creator</code>的位置。但是，跨组件间交换<code class="language-text">action creator</code>还是比较麻烦。</li>\n</ol>\n<p>  在本次项目开始的时候，用的是第三种方法，但后来在用<code class="language-text">mapDispatchToProps</code>中传递<code class="language-text">action creator</code>实在是太麻烦；所以个人感觉还是第二种方法比较好。</p>\n<hr>\n<h3 id="关于code-classlanguage-textstatecode树的设计"><a href="#%E5%85%B3%E4%BA%8Ecode-classlanguage-textstatecode%E6%A0%91%E7%9A%84%E8%AE%BE%E8%AE%A1" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>关于<code class="language-text">state</code>树的设计</h3>\n<p>在用<code class="language-text">redux</code>的时候，我们需要先思考一下，到底哪些东西需要交给<code class="language-text">redux</code>。\n虽然，个人觉得，只把那些会有多个组件共用的数据，需要被缓存的数据，以及可以被别的组件操控的数据交给<code class="language-text">redux</code>，组件自己玩的东西就交给自己处理好了。</p>\n<p>虽然理论上来讲，我们可以将所有的状态都交给<code class="language-text">redux</code>，每次<code class="language-text">state</code>的改变都<code class="language-text">dispatch</code>个<code class="language-text">action</code>；但是这样会有大量无聊的代码，众多重复性的工作，同时还有一定的性能问题。（例如，最开始的时候，我给<code class="language-text">input</code>的<code class="language-text">onChange</code>事件也添加了个<code class="language-text">action</code>，结果就是输入的时候卡到飞起。。。。）。</p>\n<p>当然，<code class="language-text">redux</code>的<code class="language-text">state</code>还可以用于缓存，例如当我们首次向服务器请求<em>商品列表数据</em>后，将<em>商品列表数据</em>放在<code class="language-text">state</code>树中，因为商品列表这种东西很少会有变动，所以在下一次进入该页面时，可以直接从<code class="language-text">state</code>树中读取该部分数据就好，不用再向服务器发请求，当然，也可以再设置一个手动刷新来防止数据过期。</p>\n<p>关于如何组织<code class="language-text">state</code>树，这是个很纠结的问题。本次项目中，我是直接按页面来划分的<code class="language-text">state</code>，感觉效果还算可以吧。。。</p>\n<h3 id="关于code-classlanguage-textreduxcode的异步"><a href="#%E5%85%B3%E4%BA%8Ecode-classlanguage-textreduxcode%E7%9A%84%E5%BC%82%E6%AD%A5" aria-hidden="true" class="anchor"><svg aria-hidden="true" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>关于<code class="language-text">redux</code>的异步</h3>\n<p>忍不住想吐槽，异步这一块儿刚开始写起来真的有种，生不如死的感觉。太烦了！  </p>\n<p>异步获取数据： 搭配<code class="language-text">redux-thunk</code>写，感觉还行。  </p>\n<p>试试来点儿复杂的，例如修改一下购物车中商品的数量，我们的应用逻辑：</p>\n<p>提交数据到服务器 ==> 组件状态变为<code class="language-text">提交中</code> ==> 服务器响应提交请求 ==> 组件状态变为<code class="language-text">提交成功</code> ==> 获取新的<code class="language-text">state</code> ==> 更新订阅了该<code class="language-text">state</code>的组件。 </p>\n<p>看起来还可以，不算是很复杂。但在修改<code class="language-text">state</code>这块儿，真的一定要组织好<code class="language-text">state</code>树，保证能简单快速地修改<code class="language-text">state</code>来拿到新的<code class="language-text">state</code>。（说多都是累啊！）</p>',frontmatter:{title:"用React构建一个小商城（四）",date:"08月 15日, 2017年"}}},pathContext:{slug:"/blog/2017-08-15-react-shop-summary-redux/",previous:{id:"C:/Users/IronMan/Desktop/projects/blog/src/pages/blog/2017-08-14-react-shop-summary-communicate.MD absPath of file >>> MarkdownRemark",fields:{slug:"/blog/2017-08-14-react-shop-summary-communicate/"},frontmatter:{title:"用React构建一个小商城（三）",tags:["web","学习","前端","React"],date:"2017-08-14T00:00:00.000Z",cover:null}},next:!1}}}});
//# sourceMappingURL=path---blog-2017-08-15-react-shop-summary-redux-0e7b2be4005af884e0ff.js.map