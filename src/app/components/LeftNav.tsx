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
              <Link to={`${process.env.PUBLIC_URL}/`}>Home</Link><br/>
              <Link to={`${process.env.PUBLIC_URL}/page`}>Page</Link><br/>
              <Link to={`${process.env.PUBLIC_URL}/canvas`}>Canvas</Link><br/>
          </div>
        );
    }
}
