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
        console.log(`Blog: this.props.postsUrl: `, this.props.postsUrl)
        if (this.props.postsUrl) {
            this.loadPosts(this.props.postsUrl)
                .then(posts => {
                    console.log(`Blog: posts: `, posts);
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
        console.log(posts)
        return posts;
    }

    render() {
        let posts: any[] = [];
        console.log(this.state.posts);
        if (this.state.posts) {
            this.state.posts.forEach(category => {
                let categoryName: string = category.category;
                let heading: string = categoryName ? `${categoryName} posts` : `posts`;
                posts.push(<h4>{heading}</h4>);
                let urlPrefix: string = categoryName ? `/#/post/${categoryName}/` : `/#/post/`;
                if (process.env.PUBLIC_URL) {
                    urlPrefix = `${process.env.PUBLIC_URL}${urlPrefix}`
                }
                category.posts.forEach(post => {
                    posts.push(<p className='post'><a href={`${urlPrefix}${post.url}.md`}>{post.title}</a></p>);
                });
            })
        }
        return (
            posts
        );
    }
}
