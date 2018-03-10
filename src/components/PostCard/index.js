import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components'

const Root = styled.div`
    position: relative;
    display: flex;
    color: #ddd;
    width: 320px;
    height: 160px;
    background: ${props =>  props.hasCover ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'};
    background-clip: padding-box;
    text-align: left;
    border: 2px solid rgba(0,0,0,0);
    box-sizing: border-box;
`

const Content = styled.div`
    position: relative;
    padding: 10px 0;
    width: 60%;

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
    padding: 1em;
    top: 0;
    right:0;
    bottom: 0;
    left: 0;
    background: rgba(0,0,0,0);
    transition: all ease 0.6s;
    &:hover {
        background: rgba(0,0,0,1);
    }

    &:hover div {
        transform: scale(1);
        background: radial-gradient(ellipse at center, #1C2837 0%, #050608 100%);
    }
    & div {
        width: 100%;
        height: 100%;
        transform: scale(0);
        margin: auto;
        transition: all ease-out .5s;
    }
`
const Cover = styled.div`
    width: 40%;
    background: no-repeat center/cover url(${props => props.src});
`

const PostLink = ({post}) => (
    <Link to={post.fields.slug} style={{textDecoration: 'none'}}>
        <Root hasCover={post.frontmatter.cover}>
            <Content>
                <h4>{post.frontmatter.date}</h4>
                <h3><div>{post.frontmatter.title}</div></h3>
            </Content>
            <Cover src={post.frontmatter.cover} />
            <Excerpt>
                <div>{post.excerpt}</div>
            </Excerpt>
        </Root>
    </Link>
)

export default PostLink