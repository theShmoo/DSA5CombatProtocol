import React from "react";
import { Tooltip, OverlayTrigger, Glyphicon, ListGroupItem } from "react-bootstrap";

export default class NumericControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      value: this.props.value
    };
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);

    this.add = this.add.bind(this);
    this.reduce = this.reduce.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.value
    });
  }


  mouseOver () {
    this.setState({hover: true});
  }

  mouseOut () {
    this.setState({hover: false});
  }

  add () {
    this.setState((prevState) => {return { value: prevState.value + 1};});
  }

  reduce () {
    this.setState((prevState) => {return { value: prevState.value - 1};});
  }

  renderValue() {
    if(this.state.value != this.props.value) {
      return this.state.value + "/" + this.props.value;
    }
    else return this.props.value;
  }

  render() {
    const {title} = this.props;
    const reduce_tt = (<Tooltip id="reduce"> Reduziere {title} um 1</Tooltip>);
    const add_tt = (<Tooltip id="reduce"> Erhöhe {title} um 1</Tooltip>);

    return (
        <ListGroupItem
          header={title}
          onMouseOver={this.mouseOver}
          onMouseOut={this.mouseOut} >
          {this.renderValue()}
          <span style={{display: this.state.hover ? "inline" : "none"}}>
            <OverlayTrigger
              overlay={add_tt}
              placement="top"
              delayShow={0}
              delayHide={100}>
              <Glyphicon
                glyph="plus"
                className="numeric-control-glyph-add"
                onClick={this.add}/>
            </OverlayTrigger>
            <OverlayTrigger
              overlay={reduce_tt}
              placement="top"
              delayShow={0}
              delayHide={100}>
              <Glyphicon
                glyph="minus"
                className="numeric-control-glyph-reduce"
                onClick={this.reduce}/>
            </OverlayTrigger>
          </span>
        </ListGroupItem>
    );
  }
}
