import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';
import { Converter } from 'showdown';

const path = require('path');

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


                    let reg = /\[.*\]\((.*)\)/g;
                    let mdPath;
                    while((mdPath = reg.exec(markdown)) !== null) {
                        let pathToReplace = mdPath[1];
                        if (pathToReplace.indexOf('http') != 0) { // not http://...
                            let hash = '/#/';
                            if (pathToReplace.indexOf('/assets') >= 0) { //asset path
                                hash = '';
                            }
                            let pathPrefix: string = hash + urlParts.join('/') + '/';
                            if (process.env.PUBLIC_URL) {
                                pathPrefix = `${process.env.PUBLIC_URL}/${pathPrefix}`;
                            }
                            let fixedPath = path.resolve(pathPrefix, mdPath[1]);
                            markdown = markdown.replace(pathToReplace, fixedPath);
                        }
                    }

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

    onClick() {
        location.reload();
    }

    back(event) {
        event.preventDefault();
        window.history.back();
    }

    render() {
        let markdownDiv: any = <div className="post" dangerouslySetInnerHTML={{__html: this.state.html}} />
        return (
            <div onClick={this.onClick}>
                <Link to={`/blog`}>Blog</Link><br/>
                {markdownDiv}
            </div>
        );
    }
}
