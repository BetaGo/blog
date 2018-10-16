import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const Root = styled.div`
  position: relative;
  display: flex;
  color: #ddd;
  width: 320px;
  height: 160px;
  background: ${props =>
    props.hasCover ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'};
  background-clip: padding-box;
  text-align: left;
  border: 2px solid rgba(0, 0, 0, 0);
  box-sizing: border-box;
`

const Content = styled.div`
  position: relative;
  padding: 10px 0;
  width: 60%;
  color: rgba(255, 255, 255, 0.6);

  & h4 {
    line-height: 60px;
    height: 60px;
    margin: 0;
  }

  & h3 {
    display: flex;
    height: 80px;
    margin: 0;
  }
`

const Excerpt = styled.div`
  position: absolute;
  display: flex;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0);
  transition: all ease-in-out 0.5s;
  &:hover {
    background: rgba(0, 0, 0, 1);
  }

  &:hover div {
    opacity: 1;
    transform: scale(1);
    background: radial-gradient(ellipse at center, #1c2837 0%, #050608 100%);
  }
  & div {
    box-sizing: border-box;
    opacity: 0;
    padding: 1em 2em;
    width: 100%;
    height: 100%;
    transform: scale(0);
    margin: auto;
    transition: all ease-in-out 0.5s;

    h3 {
      text-align: center;
      line-height: 1;
      font-size: 14px;
    }

    h4 {
      text-align: right;
      line-height: 1;
      margin: 0;
      font-size: 12px;
    }

    p {
      font-size: 13px;
    }
  }
`
const Cover = styled.div`
  width: 40%;
  background: no-repeat center/cover url(${props => props.src});
`

const PostLink = ({ post }) => (
  <Link to={post.fields.slug} style={{ textDecoration: 'none' }}>
    <Root hasCover={post.frontmatter.cover}>
      <Content>
        <h4>{post.frontmatter.date}</h4>
        <h3>
          <div>{post.frontmatter.title}</div>
        </h3>
      </Content>
      <Cover src={post.frontmatter.cover} />
      <Excerpt>
        <div>
          <h3>{post.frontmatter.title}</h3>
          <h4>{post.frontmatter.date}</h4>
          <p>{post.excerpt}</p>
        </div>
      </Excerpt>
    </Root>
  </Link>
)

export default PostLink
