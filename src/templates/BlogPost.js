import React, { Component } from 'react'
import Link from 'gatsby-link'
import styled from 'styled-components';

const Marked = styled.div`
  font-size: 16;
  color: #eee;
  margin-top: 16px;
  margin-bottom: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: rgba(0,0,0,0.3);
  
  & pre {
    background: rgba(27,28,22,0.3)
  }

  & h1 {
    color: #EC625F;
    margin: 0.7em 0;
  }
  & h2 {
    color: #EC625F;
    margin: 1em 0 0.7em;
  }
  & h3 {
    color: #EC625F;
    margin: 1em 0 0.7em;
  }
  & h4 {
    color: #EC625F;
    margin: 1em 0 0.7em;
  }
  & p, & ul, & ol {
    line-height: 1.6;
  }
  & h1, & h2, & h3, & h4 {
    & .anchor {
      opacity: 0;
    }
    &:hover .anchor {
      display: inline-block;
      opacity: 1;
      padding: 0 8px;
      color: rgba(255, 255, 255, 0.5);
      &:hover {
        color: #EC625F;
      }
      & svg {
        width: 0.55em;
        height: 0.55em;
        fill: currentColor;
      }
    }
  }
  & a, & a code {
    color: #F07B3F;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default class BlogPostTemplate extends Component {
  render() {
    console.log(this.props);
    const post = this.props.data.markdownRemark;
    const { previous, next } = this.props.pathContext;
    return (
      <div>
        <h1>{post.frontmatter.title}</h1>
        <h2>{post.frontmatter.date}</h2>
        <Marked dangerouslySetInnerHTML={{__html: post.html}} />
        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          {previous && (
            <li>
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            </li>
          )}

          {next && (
            <li>
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MM月 DD日, YYYY年")
      }
    }
  }
`;
