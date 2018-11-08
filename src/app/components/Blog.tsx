import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';

export interface BlogProps { postsUrl: string, clickHandler: any, posts: any[] }
export interface BlogState { posts: any[] }

export default class Blog extends React.Component<BlogProps, BlogState> {

    componentWillMount() {
        if (this.props.posts) {
            this.setState({posts: this.props.posts});
        } else {
            this.setState({posts: []});
        }
    }

    componentDidMount() {
        if (this.props.postsUrl && !this.props.posts) {
            this.loadPosts(this.props.postsUrl)
                .then(posts => {
                    this.setState({posts: posts});
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            console.log(`Blog: using this.props.posts:`);
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
                // let urlPrefix: string = categoryName ? `/#/posts/${categoryName}/` : `/#/posts/`;
                let urlPrefix: string = `/#/posts/`;
                if (process.env.PUBLIC_URL) {
                    urlPrefix = `${process.env.PUBLIC_URL}${urlPrefix}`
                }
                category.posts.forEach(post => {
                    posts.push(<p className='postLink'>
                        <a className='postTitle' href={`${urlPrefix}${post.url}`}>{post.title}</a>
                        <div className='postDate'> - <i>{post.date}</i></div><br/>
                        <div className='postDescription'>{post.description}</div>
                    </p>);
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
