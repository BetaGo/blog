import React from 'react';
import styled from 'styled-components';
import Link from 'gatsby-link';

import PostCard from '../components/PostCard';
import SolarSystem from '../components/SolarSystem';

const Root = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const Quote = styled.div`
  width: 800px;
  margin: 30px auto;
  font-size: 22px;
  line-height: 40px;
  text-align: center;
  color: #aaa;
  & div {
    font-weight: bold;
  }
`

const NavLink = props => {
  if (!props.test) {
    return <Link to={props.url} >{props.text}</Link>
  } else {
    return <span>{props.text}</span>
  }
}

const IndexPage = ( props ) => {
  let { data, pathContext } = props;
  const Posts = data.allMarkdownRemark.edges
    .filter(edge => !!edge.node.frontmatter.date)
    .map(edge => <PostCard key={edge.node.id} post={edge.node} />)
  return (
    <div>
      <Quote>
        “You smiled and talked to me of nothing and I felt that for this I had been waiting long.”
        <div>― Rabindranath Tagore</div>
      </Quote>
      <SolarSystem />
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
          excerpt(pruneLength: 140)
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