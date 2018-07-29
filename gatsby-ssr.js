/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
// import React from "react";
// import Helmet from "react-helmet";
// import { renderToString } from "react-dom/server";
// import { ServerStyleSheet, StyleSheetManager } from "styled-components";

// exports.replaceRenderer = ({
//   bodyComponent,
//   replaceBodyHTMLString,
//   setHeadComponents
// }) => {
//   const sheet = new ServerStyleSheet();
//   const App = () => (
//     <StyleSheetManager sheet={sheet.instance}>
//       {bodyComponent}
//     </StyleSheetManager>
//   );

//   replaceBodyHTMLString(renderToString(<App />));
//   setHeadComponents([sheet.getStyleElement()]);
// };

// exports.onRenderBody = (
//   { setHeadComponents, setHtmlAttributes, setBodyAttributes },
//   pluginOptions
// ) => {
//   const helmet = Helmet.renderStatic();
//   setHtmlAttributes(helmet.htmlAttributes.toComponent());
//   setBodyAttributes(helmet.bodyAttributes.toComponent());
//   setHeadComponents([
//     helmet.title.toComponent(),
//     helmet.link.toComponent(),
//     helmet.meta.toComponent(),
//     helmet.noscript.toComponent(),
//     helmet.script.toComponent(),
//     helmet.style.toComponent()
//   ]);
// };
