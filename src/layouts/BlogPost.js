import React from 'react'
import Helmet from 'react-helmet'
import styled, { injectGlobal } from 'styled-components'
import Link from 'gatsby-link';

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
    color: #ddd;
    background: rgba(0, 0, 0, 0.5);
    margin: auto;
    font-size: 3em;
    line-height: 3em;
    padding: 0 3em;
    & a {
        text-decoration: none;
        color: #ddd;
    }
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
    >
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.10/css/all.css" integrity="sha384-+d0P83n9kaQMCwj8F4RJB66tzIwOKmrdb46+porD/OvrJ+37WqIM7UoBtwHO6Nlg" crossorigin="anonymous" />
    </Helmet>
    <Header>
        <Link to="/" >Valar Morghulis</Link>
    </Header>
    <Content>
        <Container>
            {children()}
        </Container>
    </Content>
  </div>
)

export default TemplateWrapper