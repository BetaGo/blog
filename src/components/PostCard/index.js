import React from 'react';
import Link from 'gatsby-link';
import styled from 'styled-components'

const Root = styled.div`
    display: flex;
    color: #ddd;
    width: 320px;
    height: 160px;
    background: ${props =>  props.hasCover ? '#313131' : 'rgba(0,0,0,0.01)'};
    text-align: left;
    border: 0.5px solid rgba(0, 0,0, 0.2);
    box-sizing: border-box;
`

const Content = styled.div`
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

const Cover = styled.div`
    width: 40%;
    background-image: url(${props => props.src}) cover;
`

const PostLink = ({post}) => (
    <Link to={post.fields.slug} style={{textDecoration: 'none'}}>
        <Root>
            <Content>
                <h4>{post.frontmatter.date}</h4>
                <h3><div>{post.frontmatter.title}</div></h3>    
            </Content>
            <Cover />
        </Root>
    </Link>
)

export default PostLink