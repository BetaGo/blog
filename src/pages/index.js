import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import IndexLayout from '../layouts/index'

import SolarSystem from '../components/SolarSystem'
import PageCard from '../components/PageCard'

const Quote = styled.div`
  max-width: 800px;
  margin: 30px auto;
  font-size: 22px;
  line-height: 1.8;
  text-align: center;
  color: #aaa;
  & div {
    font-weight: bold;
  }
  @media (max-width: 520px) {
    font-size: 16px;
    line-height: 1.5;
  }
`

const IndexPage = ({ data }) => {
  const allPosts = data.allMarkdownRemark.edges.filter(
    edge => !!edge.node.frontmatter.date
  )

  return (
    <IndexLayout>
      <Quote>
        “You smiled and talked to me of nothing and I felt that for this I had
        been waiting long.”
        <div>― Rabindranath Tagore</div>
      </Quote>
      <SolarSystem />
      <PageCard posts={allPosts} />
    </IndexLayout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 70)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MM月DD日, YYYY年")
            title
            cover
          }
        }
      }
    }
  }
`
