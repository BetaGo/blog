import React from 'react'
import Helmet from 'react-helmet'
import styled, { injectGlobal } from 'styled-components'

import Header from '../components/Header'
// import './index.css'

 // require('prismjs/themes/prism-okaidia.css')

 injectGlobal`
 html, body {
     height:100%;
     width:100%;
 }
 body {
     -webkit-font-smoothing: antialiased;
     color:#fff;
     background: radial-gradient(ellipse at bottom, #1C2837 0%, #050608 100%);
     background-attachment:fixed;
     margin: 0;
 }
`
const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Beta Go"
      meta={[
        { name: 'description', content: 'blog' },
        { name: 'keywords', content: 'blog, front end, read' },
      ]}
    />
    <Header />
    <div
      style={{
        margin: '0 auto',
        maxWidth: 960,
        padding: '0px 1.0875rem 1.45rem',
        paddingTop: 0,
      }}
    >
      {children()}
    </div>
  </div>
)

export default TemplateWrapper
