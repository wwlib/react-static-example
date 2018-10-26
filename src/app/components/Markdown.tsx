import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';

const hljs = require('highlightjs');
console.log(hljs);
const showdown = require('showdown');
const path = require('path');

export interface MarkDownProps { history: any, location: any, markdown: string, markdownUrl: string, clickHandler: any }
export interface MarkDownState { html: string }

export default class MarkDown extends React.Component<MarkDownProps, MarkDownState> {

    private _windowOnHashChangeHandlerRestore: any;

    componentWillMount() {
        this.setState({html: ''});
    }

    componentDidMount() {
        this._windowOnHashChangeHandlerRestore = window.onhashchange;
        window.onhashchange = () => {
            console.log(`Markdown: has changed`);
            location.reload();
            // console.log(this.props);
            // console.log(window.location, window.location.hash);
            // let newLocationHash: string = window.location.hash;
            // console.log(newLocationHash);
            // if (newLocationHash) {
            //     let pathStart: number = newLocationHash.indexOf('/');
            //     let newPath: string = newLocationHash.substring(pathStart);
            //     console.log(`newPath: `, newPath);
            //     this.props.history.go(newPath);
            //
            // }
        }

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

    componentWillUnmount() {
        window.onhashchange = this._windowOnHashChangeHandlerRestore;
    }

    async loadMarkdown(url: string): Promise<any> {
        const { data: markdown } = await axios.get(url);
        return markdown;
    }

    render() {
        let markdownDiv: any = <div className="post" dangerouslySetInnerHTML={{__html: this.state.html}} />
        return (
            <div>
                <Link to={`/blog`}>Blog</Link><br/>
                {markdownDiv}
            </div>
        );
    }
}
