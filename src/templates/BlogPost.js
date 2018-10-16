import React, { Component } from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import styled from 'styled-components'

import BlogLayout from '../layouts/BlogPost'

const Marked = styled.div`
  font-size: 16;
  color: #eee;
  margin-top: 16px;
  margin-bottom: 16px;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.3);

  & img {
    max-width: 100%;
  }

  & pre {
    background: rgba(27, 28, 22, 0.3);
  }

  & h1 {
    color: #ec625f;
    margin: 0.7em 0;
  }
  & h2 {
    color: #ec625f;
    margin: 1em 0 0.7em;
  }
  & h3 {
    color: #ec625f;
    margin: 1em 0 0.7em;
  }
  & h4 {
    color: #ec625f;
    margin: 1em 0 0.7em;
  }
  & p,
  & ul,
  & ol {
    line-height: 1.6;
  }
  & h1,
  & h2,
  & h3,
  & h4 {
    & .anchor {
      opacity: 0;
    }
    &:hover .anchor {
      display: inline-block;
      opacity: 1;
      padding: 0 8px;
      color: rgba(255, 255, 255, 0.5);
      &:hover {
        color: #ec625f;
      }
      & svg {
        width: 0.55em;
        height: 0.55em;
        fill: currentColor;
      }
    }
  }
  & a,
  & a code {
    color: #f07b3f;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`

const Title = styled.h1`
  text-align: center;
`

const PublishDate = styled.div`
  text-align: right;
`

const Cursor = styled.div`
  font-size: 14px;
  width: 50%;

  & a {
    display: flex;
    align-items: center;
    color: #fff;
    text-decoration: none;
  }
`

const CursorContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const CursorText = styled.span`
  display: inline-block;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0.6em;
`

export default class BlogPostTemplate extends Component {
  render() {
    const post = this.props.data.markdownRemark
    const { previous, next } = this.props.pageContext
    return (
      <BlogLayout>
        <Title>{post.frontmatter.title}</Title>
        <PublishDate>{post.frontmatter.date}</PublishDate>
        <Marked dangerouslySetInnerHTML={{ __html: post.html }} />
        <CursorContainer>
          <Cursor>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                <i className="fas fa-arrow-left" />
                <CursorText>{previous.frontmatter.title}</CursorText>
              </Link>
            )}
          </Cursor>
          <Cursor>
            {next && (
              <Link
                to={next.fields.slug}
                rel="next"
                style={{
                  textAlign: 'right',
                }}
              >
                <CursorText>{next.frontmatter.title}</CursorText>
                <i className="fas fa-arrow-right" />
              </Link>
            )}
          </Cursor>
        </CursorContainer>
        {/* <ul
          style={{
            listStyle: 'none',
            padding: 0,
          }}
        >
          {previous && (
            <li style={{ float: 'left' }}>
              <Link
                to={previous.fields.slug}
                rel="prev"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                <i className="fas fa-arrow-left" /> {previous.frontmatter.title}
              </Link>
            </li>
          )}

          {next && (
            <li style={{ float: 'right' }}>
              <Link
                to={next.fields.slug}
                rel="next"
                style={{
                  color: 'white',
                  textDecoration: 'none',
                }}
              >
                {next.frontmatter.title} <i className="fas fa-arrow-right" />
              </Link>
            </li>
          )}
        </ul> */}
      </BlogLayout>
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
`
