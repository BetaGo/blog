webpackJsonp([68849647803050],{372:function(n,s){n.exports={data:{markdownRemark:{id:"C:/Users/BetaGo/Desktop/projects/blog/src/pages/blog/2017-08-14-react-shop-summary-communicate.MD absPath of file >>> MarkdownRemark",html:'<p>用 React 组件，可以轻松地构建出我们想要的页面；但是由于各组件都是可以独立存在的，当不同的组件之间需要通信时，就会使我们面临诸多的问题。</p>\n<p><code class="language-text">props</code>和<code class="language-text">state</code>是我们最常用的两个可以操控组件状态的东西。<code class="language-text">state</code>是组件自身的状态，在组件内部定义；<code class="language-text">props</code>是组件的属性，可以由父组件传来；我们借助<code class="language-text">props</code>和<code class="language-text">state</code>这两样东西来实现组件间通讯（<code class="language-text">context</code>也可以，这个要另说）。</p>\n<p><strong>组件间通讯的几种形式：</strong></p>\n<ol>\n<li>父组件 ==> 子组件： 最简单的一种形式，直接通过<code class="language-text">props</code>传递就好。</li>\n<li>子组件 ==> 父组件： 一种简单的方式是可以通过<code class="language-text">props</code>传一个<code class="language-text">callback</code>给子组件，当子组件<code class="language-text">state</code>发生变化时，调用该<code class="language-text">callback</code>来传递信息到父组件。</li>\n<li>跨级组件通信： 我们可以通过在这些组件之上再添加一个共同的父组件，然后再利用上述的两种方法来一层层地传递。但是，这样的做法不仅写起来很麻烦，而且很难维护。这个时候我们可以利用<code class="language-text">context</code>来实现组件间的通讯。</li>\n</ol>\n<p><strong>关于<code class="language-text">context</code>:</strong></p>\n<p><code class="language-text">context</code>是一个很强大的API，利用<code class="language-text">context</code>我们可以很轻松地构建一个父子组件通讯的API。例如 <a href="https://reacttraining.com/react-router/">React Router V4</a>库。</p>\n<p>当我们的组件解构复杂，而我们又使用了大量的<code class="language-text">context</code>时，我们就很难弄清<code class="language-text">context</code>到底是从什么地方传过来的，使用应的数据流动变得很混乱。此时我们可以利用一些状态管理库来帮助我们。例如<a href="https://github.com/reactjs/redux">redux</a>。</p>\n<p>这里，我们从<a href="https://github.com/reactjs/react-redux">React Redux</a>库中的<code class="language-text">Provider</code>组件来看一下<code class="language-text">context</code>API的使用。</p>\n<p>以下是<code class="language-text">Provider</code>组件的源码：</p>\n<div class="gatsby-highlight" data-language="js">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">function</span> <span class="token function">createProvider</span><span class="token punctuation">(</span>storeKey <span class="token operator">=</span> <span class="token string">\'store\'</span><span class="token punctuation">,</span> subKey<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> subscriptionKey <span class="token operator">=</span> subKey <span class="token operator">||</span> <span class="token template-string"><span class="token string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>storeKey<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">Subscription`</span></span>\n\n    <span class="token keyword">class</span> <span class="token class-name">Provider</span> <span class="token keyword">extends</span> <span class="token class-name">Component</span> <span class="token punctuation">{</span>\n        <span class="token comment">/*\n        * 通过在Provider（context提供者）中添加 childContextTypes 和 getChildContext，\n        * React 会向下自动传递参数，任何组件只要在它的子组件中，就能通过定义 contextTypes 来获取参数。\n        * 这也就解释了为什么 `Provider` 组件要放在顶层，以及为什么我们可以在任一组件中获取 `store`。\n        */</span>\n        <span class="token function">getChildContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          <span class="token keyword">return</span> <span class="token punctuation">{</span> <span class="token punctuation">[</span>storeKey<span class="token punctuation">]</span><span class="token punctuation">:</span> <span class="token keyword">this</span><span class="token punctuation">[</span>storeKey<span class="token punctuation">]</span><span class="token punctuation">,</span> <span class="token punctuation">[</span>subscriptionKey<span class="token punctuation">]</span><span class="token punctuation">:</span> <span class="token keyword">null</span> <span class="token punctuation">}</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token function">constructor</span><span class="token punctuation">(</span>props<span class="token punctuation">,</span> context<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          <span class="token keyword">super</span><span class="token punctuation">(</span>props<span class="token punctuation">,</span> context<span class="token punctuation">)</span>\n          <span class="token keyword">this</span><span class="token punctuation">[</span>storeKey<span class="token punctuation">]</span> <span class="token operator">=</span> props<span class="token punctuation">.</span>store<span class="token punctuation">;</span>\n        <span class="token punctuation">}</span>\n\n        <span class="token function">render</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n          <span class="token keyword">return</span> Children<span class="token punctuation">.</span><span class="token function">only</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">.</span>props<span class="token punctuation">.</span>children<span class="token punctuation">)</span>\n        <span class="token punctuation">}</span>\n    <span class="token punctuation">}</span>\n\n    Provider<span class="token punctuation">.</span>propTypes <span class="token operator">=</span> <span class="token punctuation">{</span>\n        store<span class="token punctuation">:</span> storeShape<span class="token punctuation">.</span>isRequired<span class="token punctuation">,</span>\n        children<span class="token punctuation">:</span> PropTypes<span class="token punctuation">.</span>element<span class="token punctuation">.</span>isRequired<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n    Provider<span class="token punctuation">.</span>childContextTypes <span class="token operator">=</span> <span class="token punctuation">{</span>\n        <span class="token punctuation">[</span>storeKey<span class="token punctuation">]</span><span class="token punctuation">:</span> storeShape<span class="token punctuation">.</span>isRequired<span class="token punctuation">,</span>\n        <span class="token punctuation">[</span>subscriptionKey<span class="token punctuation">]</span><span class="token punctuation">:</span> subscriptionShape<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n\n    <span class="token keyword">return</span> Provider\n<span class="token punctuation">}</span>\n\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">createProvider</span><span class="token punctuation">(</span><span class="token punctuation">)</span></code></pre>\n      </div>\n<p>总而言之，我们可以通过 父组件传递 <code class="language-text">props</code>给子组件，子组件调用父组件传来的<code class="language-text">callback</code>来实现组件间通讯；也可以利用<code class="language-text">context</code>API来进行父子组件间的通讯。使用<code class="language-text">props</code>虽然繁琐，但是数据的流动方向很清晰，容易理解；<code class="language-text">context</code>功能强大，方便快捷，但是使用时需要合理规划，否则容易导致应用走向混乱。</p>',frontmatter:{title:"用React构建一个小商城（三）",date:"08月 14日, 2017年"}}},pathContext:{slug:"/blog/2017-08-14-react-shop-summary-communicate/",previous:{id:"C:/Users/BetaGo/Desktop/projects/blog/src/pages/blog/2017-08-10-react-shop-summary-start.MD absPath of file >>> MarkdownRemark",fields:{slug:"/blog/2017-08-10-react-shop-summary-start/"},frontmatter:{title:"用React构建一个小商城（一）",tags:["web","学习","前端","React"],date:"2017-08-10T00:00:00.000Z",cover:null}},next:{id:"C:/Users/BetaGo/Desktop/projects/blog/src/pages/blog/2017-08-15-react-shop-summary-redux.MD absPath of file >>> MarkdownRemark",fields:{slug:"/blog/2017-08-15-react-shop-summary-redux/"},frontmatter:{title:"用React构建一个小商城（四）",tags:["web","学习","前端","React"],date:"2017-08-15T00:00:00.000Z",cover:null}}}}}});
//# sourceMappingURL=path---blog-2017-08-14-react-shop-summary-communicate-bf420c36ee0fe350e60c.js.map