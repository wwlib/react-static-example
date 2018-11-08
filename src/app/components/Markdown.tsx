import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from 'axios';

// const hljs = require('highlightjs');
// console.log(hljs);
const showdown = require('showdown');
const path = require('path');
const fm = require('front-matter');

export interface MarkDownProps { history: any, location: any, markdown: string, markdownUrl: string, clickHandler: any, match: any }
export interface MarkDownState { markdownUrl: string, html: string }

export default class MarkDown extends React.Component<MarkDownProps, MarkDownState> {

    private _windowOnHashChangeHandlerRestore: any;

    componentWillMount() {
        this.setState({html: this.props.markdown});
    }

    componentDidMount() {
        this.parseMarkdown();
        this._windowOnHashChangeHandlerRestore = window.onhashchange;
        window.onhashchange = () => {
            console.log(`Markdown: location has changed: `, window.location.href);
            this.parseMarkdown();
            // location.reload();
            // this.forceUpdate();
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
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     console.log(`Markdown: getDerivedStateFromProps`, nextProps, prevState);
    //     if (prevState) {
    //         if(nextProps.markdownUrl !== prevState.markdownUrl){
    //             return { markdownUrl: nextProps.markdownUrl};
    //         } else {
    //             return null;
    //         }
    //     } else {
    //         return { markdownUrl: '', html: ''}
    //     }
    // }

    // componentDidUpdate(prevProps, prevState) {
    //     console.log(`Markdown: componentDidUpdate`, prevProps, prevState);
    //     // if(prevProps.markdownUrl!==this.props.markdownUrl){
    //     //     //Perform some operation here
    //     //     // this.setState({markdownUrl: someValue});
    //     //     // this.classMethod();
    //     //     // this.parseMarkdown();
    //     // }
    //     // this.parseMarkdown();
    // }

    parseMarkdown() {
        // console.log(`parseMarkdown`, this.props.markdown, this.props.markdownUrl);
        // console.log(`Markdown: window.location: `, window.location);
        let locationHash: string = window.location.hash;
        let urlParts: string[] = locationHash.split('/');
        urlParts.shift(); // remove first # element
        urlParts.pop(); // remove last filename element
        let basePath: string = urlParts.join('/');

        if (!this.props.markdown) {
            console.log(`...loading: this.props.markdownUrl`);
            MarkDown.loadMarkdown(this.props.markdownUrl)
                .then(markdown => {


                    // let reg = /\[.*\]\((.*)\)/g;
                    // let mdPath;
                    // let content = fm(markdown);
                    // let markdownBody = content.body;
                    // while((mdPath = reg.exec(markdownBody)) !== null) {
                    //     let pathToReplace = mdPath[1];
                    //     if (pathToReplace.indexOf('http') != 0) { // not http://...
                    //         let hash = '/#/';
                    //         if (pathToReplace.indexOf('/assets') >= 0) { //asset path
                    //             hash = '';
                    //         }
                    //         let pathPrefix: string = hash + urlParts.join('/') + '/';
                    //         console.log(`pathPrefix: ${pathPrefix}`);
                    //         if (process.env.PUBLIC_URL) {
                    //             pathPrefix = `${process.env.PUBLIC_URL}/${pathPrefix}`;
                    //         }
                    //         let fixedPath = path.resolve(pathPrefix, mdPath[1]);
                    //         markdownBody = markdownBody.replace(pathToReplace, fixedPath);
                    //     }
                    // }
                    //
                    // reg = /src="(.*)"/g;
                    // while((mdPath = reg.exec(markdownBody)) !== null) {
                    //     let pathToReplace = mdPath[1];
                    //     if (pathToReplace.indexOf('http') != 0) { // not http://...
                    //         let hash = '/#/';
                    //         if (pathToReplace.indexOf('/assets') >= 0) { //asset path
                    //             hash = '';
                    //         }
                    //         let pathPrefix: string = hash + urlParts.join('/') + '/';
                    //         console.log(`pathPrefix: ${pathPrefix}`);
                    //         if (process.env.PUBLIC_URL) {
                    //             pathPrefix = `${process.env.PUBLIC_URL}/${pathPrefix}`;
                    //         }
                    //         let fixedPath = path.resolve(pathPrefix, mdPath[1]);
                    //         markdownBody = markdownBody.replace(pathToReplace, fixedPath);
                    //     }
                    // }
                    //
                    // let converter = new showdown.Converter({extensions: ['highlight']});
                    // let html = converter.makeHtml(markdownBody);

                    this.setState({html: this.markdownToHtml(markdown, basePath)});
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            console.log(`...using: this.props.markdown`);
            this.setState({html: this.markdownToHtml(this.props.markdown, basePath)});
        }
    }

    markdownToHtml(markdown: string, basePath: string): string {
        let reg = /\[.*\]\((.*)\)/g;
        let mdPath;
        let content = fm(markdown);
        let markdownBody = content.body;
        while((mdPath = reg.exec(markdownBody)) !== null) {
            let pathToReplace = mdPath[1];
            if (pathToReplace.indexOf('http') != 0) { // not http://...
                let hash = '/#/';
                if (pathToReplace.indexOf('/assets') >= 0) { //asset path
                    hash = '';
                }
                let pathPrefix: string = hash + basePath + '/';
                console.log(`pathPrefix: ${pathPrefix}`);
                if (process.env.PUBLIC_URL) {
                    pathPrefix = `${process.env.PUBLIC_URL}/${pathPrefix}`;
                }
                let fixedPath = path.resolve(pathPrefix, mdPath[1]);
                markdownBody = markdownBody.replace(pathToReplace, fixedPath);
            }
        }

        reg = /src="(.*)"/g;
        while((mdPath = reg.exec(markdownBody)) !== null) {
            let pathToReplace = mdPath[1];
            if (pathToReplace.indexOf('http') != 0) { // not http://...
                let hash = '/#/';
                if (pathToReplace.indexOf('/assets') >= 0) { //asset path
                    hash = '';
                }
                let pathPrefix: string = hash + basePath + '/';
                console.log(`pathPrefix: ${pathPrefix}`);
                if (process.env.PUBLIC_URL) {
                    pathPrefix = `${process.env.PUBLIC_URL}/${pathPrefix}`;
                }
                let fixedPath = path.resolve(pathPrefix, mdPath[1]);
                markdownBody = markdownBody.replace(pathToReplace, fixedPath);
            }
        }

        let converter = new showdown.Converter({extensions: ['highlight']});
        let html = converter.makeHtml(markdownBody);
        return html;
    }

    // static parseMarkdownUrl(markdownUrl: string): Promise<any> {
    //     return new Promise<string>((resolve: any, reject: any) => {
    //         MarkDown.loadMarkdown(markdownUrl)
    //             .then(markdown => {
    //                 // console.log(`Markdown: window.location: `, window.location);
    //                 let hash: string = window.location.hash;
    //                 let urlParts: string[] = hash.split('/');
    //                 urlParts.shift(); // remove first # element
    //                 urlParts.pop(); // remove last filename element
    //
    //
    //                 let reg = /\[.*\]\((.*)\)/g;
    //                 let mdPath;
    //                 while((mdPath = reg.exec(markdown)) !== null) {
    //                     let pathToReplace = mdPath[1];
    //                     if (pathToReplace.indexOf('http') != 0) { // not http://...
    //                         let hash = '/#/';
    //                         if (pathToReplace.indexOf('/assets') >= 0) { //asset path
    //                             hash = '';
    //                         }
    //                         let pathPrefix: string = hash + urlParts.join('/') + '/';
    //                         console.log(`pathPrefix: ${pathPrefix}`);
    //                         if (process.env.PUBLIC_URL) {
    //                             pathPrefix = `${process.env.PUBLIC_URL}/${pathPrefix}`;
    //                         }
    //                         let fixedPath = path.resolve(pathPrefix, mdPath[1]);
    //                         markdown = markdown.replace(pathToReplace, fixedPath);
    //                     }
    //                 }
    //
    //                 reg = /src="(.*)"/g;
    //                 while((mdPath = reg.exec(markdown)) !== null) {
    //                     let pathToReplace = mdPath[1];
    //                     if (pathToReplace.indexOf('http') != 0) { // not http://...
    //                         let hash = '/#/';
    //                         if (pathToReplace.indexOf('/assets') >= 0) { //asset path
    //                             hash = '';
    //                         }
    //                         let pathPrefix: string = hash + urlParts.join('/') + '/';
    //                         console.log(`pathPrefix: ${pathPrefix}`);
    //                         if (process.env.PUBLIC_URL) {
    //                             pathPrefix = `${process.env.PUBLIC_URL}/${pathPrefix}`;
    //                         }
    //                         let fixedPath = path.resolve(pathPrefix, mdPath[1]);
    //                         markdown = markdown.replace(pathToReplace, fixedPath);
    //                     }
    //                 }
    //
    //                 let converter = new showdown.Converter({extensions: ['highlight']});
    //                 let html = converter.makeHtml(markdown);
    //                 resolve(html);
    //             })
    //             .catch(err => {
    //                 reject(err);
    //             });
    //     });
    // }

    static async loadMarkdown(url: string): Promise<any> {
        const { data: markdown } = await axios.get(url);
        return markdown;
    }

    componentWillUnmount() {
        window.onhashchange = this._windowOnHashChangeHandlerRestore;
    }

    render() {
        let markdownDiv: any = <div className="post" dangerouslySetInnerHTML={{__html: this.state.html}} />
        return (
            <div>
                {markdownDiv}
            </div>
        );
    }
}
