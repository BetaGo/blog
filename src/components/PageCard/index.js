import React, { Component } from 'react';
import styled from 'styled-components';
import PostCard from '../PostCard';

const Prev = styled.div`
    position: absolute;
    width: 40px;
    height: 40px;
    top: 50%;
    line-height: 40px;
    font-weight: bold;
    font-size: 40px;
    text-align: center;
    transform: translate(-150%, -50%);
    cursor: pointer;
    color: #eee;
    background: rgba(0,0,0,0.0);
    transition: all ease 0.6s;

    &:hover {
        background: rgba(0,0,0,0.6)
    }
`

const Next = Prev.extend`
        right: 0;
        transform: translate(150%, -50%);
`

const Container = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
`

class PageCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            page: 0,
        }
    }

    handlePrevPage = () => {
        const { page } = this.state;
        if (page > 0) {
            this.setState({
                page: page - 1,
            })
        }
    }

    handleNextPage = () => {
        const { pageSize, posts } = this.props;
        const { page } = this.state;
        if (page < Math.floor(posts.length / pageSize)) {
            this.setState({
                page: page + 1,
            })
        }    
    }

    renderCards = () => {
        const { posts, pageSize } = this.props;
        const { page } = this.state;
        let postCardMap = posts.slice(page * pageSize, (page+1) * pageSize);

        return postCardMap.map(edge => <PostCard key={edge.node.id} post={edge.node} />)
    }

    render() {
        return (
            <Container>
                <Prev onClick={this.handlePrevPage}>
                    <i className="fas fa-angle-left" />
                </Prev>
                {this.renderCards()}
                <Next onClick={this.handleNextPage}>
                    <i className="fas fa-angle-right" />
                </Next>
            </Container>
        );
    }
}

PageCard.defaultProps = {
    pageSize: 9,
}

export default PageCard;