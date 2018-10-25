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
                    console.log(`Markdown: markdown: `, markdown);
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
        // let markdownDiv: any = <div className="markDown">Markdown</div>;
        let markdownDiv: any = <div dangerouslySetInnerHTML={{__html: this.state.html}} />
        console.log(this.state.html);
        console.log(markdownDiv);
        return (
            <div>
                <Link to={`/blog`}>Back</Link><br/>
                {markdownDiv}
            </div>
        );
    }
}
