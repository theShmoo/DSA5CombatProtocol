import React from "react";
import { Tooltip, OverlayTrigger, Glyphicon, ListGroupItem } from "react-bootstrap";

export default class NumericControl extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hover: false
    };
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);

    this.add = this.add.bind(this);
    this.reduce = this.reduce.bind(this);
  }


  mouseOver () {
    this.setState({hover: true});
  }

  mouseOut () {
    this.setState({hover: false});
  }

  add () {
    const {value, id, name} = this.props;
    const {start, current} = value;
    let v;
    if(current)
      v = {start: start, current: current + 1};
    else
      v = {start: start, current: start + 1};
    if(this.props.id && this.props.name)
      this.props.onChange(id, name, v);
    else if(this.props.name)
      this.props.onChange(name, v);
    else
      this.props.onChange(v);
  }

  reduce () {
    const {value, id, name} = this.props;
    const {start, current} = value;
    let v;
    if(current)
      v = {start: start, current: current - 1};
    else
      v = {start: start, current: start - 1};
    if(this.props.id && this.props.name)
      this.props.onChange(id, name, v);
    else if(this.props.name)
      this.props.onChange(name, v);
    else
      this.props.onChange(v);
  }

  renderValue() {
    const {start, current} = this.props.value;
    if(current) {
      return current + "/" + start;
    }
    else return start;
  }

  render() {
    const {title} = this.props;
    const reduce_tt = (<Tooltip id="reduce"> Reduziere {title} um 1</Tooltip>);
    const add_tt = (<Tooltip id="reduce"> Erhöhe {title} um 1</Tooltip>);

    return (
        <ListGroupItem
          header={title}
          onMouseOver={this.mouseOver}
          onMouseOut={this.mouseOut}
          className="numeric-control">
          {this.renderValue()}
          <span style={{visibility: this.state.hover ? "visible" : "hidden"}}>
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
