import React from 'react';
import styled from 'styled-components';

import PostCard from '../components/PostCard';


const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const IndexPage = ({data: { allMarkdownRemark: { edges }}}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostCard key={edge.node.id} post={edge.node} />)

  console.log(Posts)
  return (
    <div>
      <h1>Hi people</h1>
      <p>Hero Never Die. ?</p>
      <Root>{Posts}</Root>
    </div>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MM月DD日, YYYY年")
            title
          }
        }
      }
    }
  }
`
