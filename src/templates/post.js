import React, { Component } from 'react'

export default class BlogPostTemplate extends Component {
  render() {
      const post = this.props.data.markdownRemark;
    return (
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{__html: post.html}} />
      </div>
    )
  }
}

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        markdownRemark(fields: { slug: { eq: $slug } }) {
            html
            frontmatter {
                title
            }
        }
    }
`
