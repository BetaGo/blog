import React from 'react'
import Helmet from 'react-helmet'
import styled, { injectGlobal } from 'styled-components'

import SolarSystem from '../components/SolarSystem';

require('prismjs/themes/prism-okaidia.css')

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

const Header = styled.div`
    margin: auto;
    font-size: 3em;
    line-height: 3em;
`

const Content = styled.div`
`

const Container = styled.div`
    max-width: 960px;
    margin: auto;
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
    <SolarSystem />
    <Header>星空</Header>
    <Content>
        <Container>
            {children()}
        </Container>
    </Content>
  </div>
)

export default TemplateWrapper