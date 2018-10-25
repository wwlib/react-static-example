import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import { Link } from "react-router-dom";

export interface LeftNavProps { clickHandler: any, activePage: number }
export interface LeftNavState { }

export default class LeftNav extends React.Component<LeftNavProps, LeftNavState> {

    componentWillMount() {
        this.setState({});
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
              <Link to={`/`}>Home</Link><br/>
              <Link to={`/page`}>Page</Link><br/>
              <Link to={`/blog`}>Blog</Link><br/>
              <Link to={`/canvas`}>Canvas</Link><br/>
          </div>
        );
    }
}
