import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';

export interface BlogProps { postsUrl: string, clickHandler: any }
export interface BlogState { posts: any[] }

export default class Blog extends React.Component<BlogProps, BlogState> {

    componentWillMount() {
        this.setState({posts: []});
    }

    componentDidMount() {
        if (this.props.postsUrl) {
            this.loadPosts(this.props.postsUrl)
                .then(posts => {
                    this.setState({posts: posts});
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            console.log(`Blog: postsUrl is invalid:`);
        }

    }

    async loadPosts(url: string): Promise<any> {
        const { data: posts } = await axios.get(url);
        return posts;
    }

    render() {
        let posts: any[] = [];
        if (this.state.posts) {
            this.state.posts.forEach(category => {
                let categoryName: string = category.category;
                let heading: string = categoryName ? `${categoryName} posts` : `posts`;
                posts.push(<h4>{heading}</h4>);
                let urlPrefix: string = categoryName ? `/#/posts/${categoryName}/` : `/#/posts/`;
                if (process.env.PUBLIC_URL) {
                    urlPrefix = `${process.env.PUBLIC_URL}${urlPrefix}`
                }
                category.posts.forEach(post => {
                    posts.push(<p className='postLink'><a href={`${urlPrefix}${post.url}.md`}>{post.title}</a></p>);
                });
            })
        }
        return (
            <div className="blog">
                {posts}
            </div>
        );
    }
}
