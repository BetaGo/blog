webpackJsonp([35783957827783],{217:function(e,t,l){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0;var a=l(2),r=n(a),u=l(71),d=n(u),o=function(e){var t=e.post;return r.default.createElement("div",null,r.default.createElement(d.default,{to:t.fields.slug},t.frontmatter.title," (",t.frontmatter.date,")"))};t.default=o,e.exports=t.default},223:function(e,t,l){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}t.__esModule=!0,t.pageQuery=void 0;var a=l(2),r=n(a),u=l(217),d=n(u),o=function(e){var t=e.data.allMarkdownRemark.edges,l=t.filter(function(e){return!!e.node.frontmatter.date}).map(function(e){return r.default.createElement(d.default,{key:e.node.id,post:e.node})});return console.log(l),r.default.createElement("div",null,r.default.createElement("h1",null,"Hi people"),r.default.createElement("p",null,"Hero Never Die. ?"),r.default.createElement("div",null,l))};t.default=o;t.pageQuery="** extracted graphql fragment **"}});
//# sourceMappingURL=component---src-pages-index-js-b0b7e409b9ec84b77167.js.map