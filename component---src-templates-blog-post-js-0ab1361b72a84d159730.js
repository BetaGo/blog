webpackJsonp([0x620f737b6699],{204:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}t.__esModule=!0,t.pageQuery=void 0;var u=n(4),f=r(u),i=n(154),c=r(i),p=function(e){function t(){return l(this,t),a(this,e.apply(this,arguments))}return o(t,e),t.prototype.render=function(){var e=this.props.data.markdownRemark,t=this.props.pathContext,n=t.previous,r=t.next;return f.default.createElement("div",null,f.default.createElement("h1",null,e.frontmatter.title),f.default.createElement("h2",null,e.frontmatter.date),f.default.createElement("div",{dangerouslySetInnerHTML:{__html:e.html}}),f.default.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},n&&f.default.createElement("li",null,f.default.createElement(c.default,{to:n.fields.slug,rel:"prev"},"← ",n.frontmatter.title)),r&&f.default.createElement("li",null,f.default.createElement(c.default,{to:r.fields.slug,rel:"next"},r.frontmatter.title," →"))))},t}(u.Component);t.default=p;t.pageQuery="** extracted graphql fragment **"}});
//# sourceMappingURL=component---src-templates-blog-post-js-0ab1361b72a84d159730.js.map