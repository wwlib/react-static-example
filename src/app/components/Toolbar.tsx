import * as React from "react";
import * as ReactBootstrap from "react-bootstrap";
import { Mode } from '../model/Model';


export interface ToolbarProps { toolbarHandler: any, mode: Mode }
export interface ToolbarState { }

export default class Toolbar extends React.Component<ToolbarProps, ToolbarState> {

    componentWillMount() {
        this.setState({});
    }

    componentDidMount() {
    }

    toolClick(value, event) {
        event.stopPropagation();
        event.preventDefault();
        this.props.toolbarHandler('tool', value);
    }

    dropdownClick(value) {
        this.props.toolbarHandler('dropdown', value);
    }

    toggleClick(value, event) {
        event.stopPropagation();
        let nativeEvent: any = event.nativeEvent;
        let firstChild = nativeEvent.target.firstChild;
        if (firstChild) {
            let checked = !firstChild.checked; //checking state before being toggled
            this.props.toolbarHandler('toggle', {value: value, checked: checked});
        }
    }

    buttonClick(value) {
        this.props.toolbarHandler('button', value);
    }

    render() {
        let mode: string = Mode[this.props.mode];
        // console.log(`Toolbar: render: `, this.props.mode, mode);
        let toggles = [2,3];
        let dropdownTitle: string = `Dropdown`;
        return (
            <ReactBootstrap.ButtonToolbar>
                <ReactBootstrap.ToggleButtonGroup type="radio" name="tools" value={mode}>
                    <ReactBootstrap.ToggleButton value={"Panning"} onClick={event=>this.toolClick('Panning', event)}><ReactBootstrap.Image src="assets/icons/pan.png"></ReactBootstrap.Image></ReactBootstrap.ToggleButton>
                    <ReactBootstrap.ToggleButton value={"Selecting"}  onClick={event=>this.toolClick('Selecting', event)}><ReactBootstrap.Image src="assets/icons/select.png"></ReactBootstrap.Image></ReactBootstrap.ToggleButton>
                </ReactBootstrap.ToggleButtonGroup>
                <ReactBootstrap.ButtonGroup>
                    <ReactBootstrap.DropdownButton title={dropdownTitle} id="bg-nested-dropdown">
                        <ReactBootstrap.MenuItem eventKey="0" onClick={()=>this.dropdownClick('1')}>Option 0</ReactBootstrap.MenuItem>
                        <ReactBootstrap.MenuItem eventKey="1" onClick={()=>this.dropdownClick('2')}>Option 1</ReactBootstrap.MenuItem>
                        <ReactBootstrap.MenuItem eventKey="2" onClick={()=>this.dropdownClick('3')}>Option 2</ReactBootstrap.MenuItem>
                        <ReactBootstrap.MenuItem eventKey="3" onClick={()=>this.dropdownClick('4')}>Option 3</ReactBootstrap.MenuItem>
                    </ReactBootstrap.DropdownButton>
                </ReactBootstrap.ButtonGroup>
                <ReactBootstrap.ToggleButtonGroup type="checkbox" defaultValue={toggles}>
                    <ReactBootstrap.ToggleButton value={1} onClick={event=>this.toggleClick(1, event)}>Check 1</ReactBootstrap.ToggleButton>
                    <ReactBootstrap.ToggleButton value={2} onClick={event=>this.toggleClick(2, event)}>Check 2</ReactBootstrap.ToggleButton>
                    <ReactBootstrap.ToggleButton value={3} onClick={event=>this.toggleClick(3, event)}>Check 3</ReactBootstrap.ToggleButton>
                </ReactBootstrap.ToggleButtonGroup>
                <ReactBootstrap.Button name="button" onClick={()=>this.buttonClick('clear')}>Button</ReactBootstrap.Button>
            </ReactBootstrap.ButtonToolbar>
        );
    }
}
