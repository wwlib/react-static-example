import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";


export interface PageProps { content: any }
export interface PageState { title: string, body: string }

export default class Page extends React.Component<PageProps, PageState> {

    componentWillMount() {
        this.setState({
            title: this.props.content.title,
            body: this.props.content.body
        });
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="page">
                <h1 className="pageTitle">{this.state.title}</h1>
                <div className="pageBody">{this.state.body}</div>
            </div>
        );
    }
}
