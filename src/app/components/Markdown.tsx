import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';

const hljs = require('highlightjs');
console.log(hljs);
const showdown = require('showdown');
const path = require('path');

export interface MarkDownProps { markdown: string, markdownUrl: string, clickHandler: any }
export interface MarkDownState { html: string }

export default class MarkDown extends React.Component<MarkDownProps, MarkDownState> {

    componentWillMount() {
        this.setState({html: ''});
    }

    componentDidMount() {
        showdown.extension('highlight', function () {
        	return [{
          	type: "output",
          	filter: function (text, converter, options) {
              var left = "<pre><code\\b[^>]*>",
                  right = "</code></pre>",
                  flags = "g";
              var replacement = function (wholeMatch, match, left, right) {
              	var lang = (left.match(/class=\"([^ \"]+)/) || [])[1];
                left = left.slice(0, 18) + 'hljs ' + left.slice(18);
                if (lang && hljs.getLanguage(lang)) {
                	return left + hljs.highlight(lang, match).value + right;
        				} else {
        					return left + hljs.highlightAuto(match).value + right;
        				}
        			};
              return showdown.helper.replaceRecursiveRegExp(text, replacement, left, right, flags);
            }
          }];
        });

        if (!this.props.markdown) {
            this.loadMarkdown(this.props.markdownUrl)
                .then(markdown => {
                    // console.log(`Markdown: window.location: `, window.location);
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

                    let converter = new showdown.Converter({extensions: ['highlight']});
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
        event.stopPropagation();
        window.history.back();
    }

    render() {
        let markdownDiv: any = <div className="post" dangerouslySetInnerHTML={{__html: this.state.html}} />
        return (
            <div onClick={this.onClick}>
                <Link onClick={this.back} to={`/blog`}>Blog</Link><br/>
                {markdownDiv}
            </div>
        );
    }
}
