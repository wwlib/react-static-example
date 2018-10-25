import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';
import { Converter } from 'showdown';

export interface MarkDownProps { markdown: string, markdownUrl: string, clickHandler: any }
export interface MarkDownState { html: string }

export default class MarkDown extends React.Component<MarkDownProps, MarkDownState> {

    componentWillMount() {
        this.setState({html: ''});
    }

    componentDidMount() {
        if (!this.props.markdown) {
            this.loadMarkdown(this.props.markdownUrl)
                .then(markdown => {
                    console.log(`Markdown: window.location: `, window.location);
                    let hash: string = window.location.hash;
                    let urlParts: string[] = hash.split('/');
                    urlParts.shift(); // remove first # element
                    urlParts.pop(); // remove last filename element
                    let pathPrefix: string = urlParts.join('/') + '/';
                    if (process.env.PUBLIC_URL) {
                        let pathPrefix: string = `../${process.env.PUBLIC_URL}/`;
                    }
                    console.log(`pathPrefix: ${pathPrefix}`);
                    markdown = markdown.replace(/\.\//g, pathPrefix);

                        // http://localhost:3000/#/posts/post1.md
                        // http://localhost:3000/assets/react.png
                        // http://localhost:3000/posts/assets/react.png

                        // http://localhost:3000/#/posts/development/dev-post1.md
                        // http://localhost:3000/assets/showdown.png
                        // http://localhost:3000/posts/development/assets/showdown.png
                        
                    let converter = new Converter();
                    let html = converter.makeHtml(markdown);
                    this.setState({html: html});
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            //render this.state.markdown
        }

    }

    async loadMarkdown(url: string): Promise<any> {
        const { data: markdown } = await axios.get(url);
        return markdown;
    }

    render() {
        let markdownDiv: any = <div dangerouslySetInnerHTML={{__html: this.state.html}} />
        return (
            <div>
                <Link to={`/blog`}>Back</Link><br/>
                {markdownDiv}
            </div>
        );
    }
}
