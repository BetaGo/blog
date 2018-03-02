import React from 'react';
import PostLink from '../components/PostLink';

const IndexPage = ({data: { allMarkdownRemark: { edges }}}) => {
  const Posts = edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostLink key={edge.node.id} post={edge.node} />)

  console.log(Posts)
  return (
    <div>
      <h1>Hi people</h1>
      <p>Hero Never Die. ?</p>
      <div>{Posts}</div>
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
            path
            title
          }
        }
      }
    }
  }
`
