import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import { Link } from "react-router-dom";

export interface TopNavProps { clickHandler: any }
export interface TopNavState { }

export default class TopNav extends React.Component<TopNavProps, TopNavState> {

    componentWillMount() {
        this.setState({});
    }

    componentDidMount() {
    }

    onButtonClicked(event: any) {
        this.props.clickHandler(event);
    }

    render() {
        return (
            <div className="topNav" onClick={this.onButtonClicked.bind(this)} >
                <Link to={`/`}>Home</Link>
                <Link to={`/pages/page1.md`}>Page1</Link>
                <a href={`${process.env.PUBLIC_URL}/docusaurus`}>Docs</a>
                <a href={`${process.env.PUBLIC_URL}/blog`}>Blog1</a>
                <Link to={`/blog`}>Blog2</Link>
                <Link to={`/canvas`}>Canvas</Link>
                <Link to={`/chart`}>Chart</Link>
                <Link to={`/pixi`}>Pixi</Link>
            </div>
        );
    }
}
