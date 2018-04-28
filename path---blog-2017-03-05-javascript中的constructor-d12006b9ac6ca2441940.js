webpackJsonp([0xc7ad0e387f34],{363:function(n,s){n.exports={data:{markdownRemark:{id:"C:\\Users\\IronMan\\Desktop\\projects\\blog\\src\\pages\\blog\\2017-03-05-javascript中的constructor.MD absPath of file >>> MarkdownRemark",html:'<p><strong>javascript 中的 constructor</strong></p>\n<p>javascript的函数拥有 .constructor 和 .prototype.constructor 两个属性。 .constructor默认指向Function对象; .prototype.constructor 默认指向函数本身。</p>\n<p>javascript的对象只拥有一个 .constructor 属性。 .constructor 指向该对象的构造函数；如果是直接创建的对象，则 .constructor 指向 Object 对象。</p>\n<p>测试代码如下：</p>\n<div class="gatsby-highlight">\n      <pre class="language-js"><code class="language-js"><span class="token keyword">var</span> test <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> test<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// function</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>test<span class="token punctuation">.</span>constructor <span class="token operator">===</span> Function<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>test<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">===</span> test<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//true</span>\n\n\n<span class="token keyword">var</span> <span class="token function-variable function">Human</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span>name<span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name <span class="token operator">||</span> <span class="token string">\'unnamed\'</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\nHuman<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span><span class="token function-variable function">getName</span> <span class="token operator">=</span> <span class="token keyword">function</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">\'Human name is : \'</span> <span class="token operator">+</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>\n<span class="token punctuation">}</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> Human<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// function</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Human<span class="token punctuation">.</span>constructor <span class="token operator">===</span> Function<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// true</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Human<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">===</span> Human<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//true</span>\n\n\n<span class="token keyword">var</span> xiaoming <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Human</span><span class="token punctuation">(</span><span class="token string">\'xiaoming\'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> xiaoming<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Object</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>xiaoming<span class="token punctuation">.</span>constructor <span class="token operator">===</span> Human<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//true</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>xiaoming<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">===</span> xiaoming<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// TypeError: Cannot read property \'constructor\' of undefined</span>\n\n\n<span class="token keyword">var</span> obj <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Object</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token keyword">typeof</span> obj<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// Object</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>constructor <span class="token operator">===</span> Object<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">//true</span>\nconsole<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>obj<span class="token punctuation">.</span>prototype<span class="token punctuation">.</span>constructor <span class="token operator">===</span> obj<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// TypeError: Cannot read property \'constructor\' of undefined</span></code></pre>\n      </div>',frontmatter:{title:"javascript 中的 constructor",date:"03月 05日, 2017年"}}},pathContext:{slug:"/blog/2017-03-05-javascript中的constructor/",previous:{id:"C:\\Users\\IronMan\\Desktop\\projects\\blog\\src\\pages\\blog\\2017-02-21-网站性能优化.MD absPath of file >>> MarkdownRemark",fields:{slug:"/blog/2017-02-21-网站性能优化/"},frontmatter:{title:"网站性能优化",tags:["web","学习","前端"],date:"2017-02-21T00:00:00.000Z",cover:null}},next:{id:"C:/Users/IronMan/Desktop/projects/blog/src/pages/blog/2017-06-10-brain-and-knowledge.MD absPath of file >>> MarkdownRemark",fields:{slug:"/blog/2017-06-10-brain-and-knowledge/"},frontmatter:{title:"猜想，大脑和知识的关系",tags:["学习","头脑风暴","猜想"],date:"2017-06-10T00:00:00.000Z",cover:null}}}}}});
//# sourceMappingURL=path---blog-2017-03-05-javascript中的constructor-d12006b9ac6ca2441940.js.map