import React from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components'

const Root = styled.div`
  background: rgba(0,0,0,0.5);
  margin-bottom: 30px;
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 30px 20px;
`

const Header = () => (
  <Root>
    <Content>
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'white',
            textDecoration: 'none',
          }}
        >
          Beta Go
        </Link>
      </h1>
    </Content>
  </Root>
)

export default Header
