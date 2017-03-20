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
    if(current != null)
      v = {start: start, current: current + 1};
    else
      v = {start: start, current: + 1};
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
    if(current != null)
      v = {start: start, current: current - 1};
    else
      v = {start: start, current: - 1};
    if(this.props.id && this.props.name)
      this.props.onChange(id, name, v);
    else if(this.props.name)
      this.props.onChange(name, v);
    else
      this.props.onChange(v);
  }

  getStatesBonus() {
    const {states} = this.props;
    let bonus = 0;
    if(states != null) {
      states.forEach((s) => {
        bonus += s.bonus;
      });
    }
    return bonus;
  }

  getCurrentBonus() {
    const {current} = this.props.value;
    return current != null ? current : 0;
  }

  renderValue() {
    const {start} = this.props.value;
    const current = this.getCurrentBonus();
    const states = this.getStatesBonus();

    const value_tt = (
      <Tooltip id="current">
        {states != 0 && <p>Von Zuständen: {states}</p>}
        {current != 0 && <p>Von dir: {current}</p>}
        {states == 0 && current == 0 && <p>Unverändert: {start}</p>}
      </Tooltip>);

    let actualValue = start + current + states;

    return (
      <OverlayTrigger
        overlay={value_tt}
        placement="top"
        delayShow={0}
        delayHide={100}>
          <span>{actualValue}/{start}</span>
      </OverlayTrigger>);
  }

  renderGlyphs() {
    const {title} = this.props;
    const reduce_tt = (<Tooltip id="reduce"> Reduziere {title} um 1</Tooltip>);
    const add_tt = (<Tooltip id="add"> Erhöhe {title} um 1</Tooltip>);

    return (
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
      </span>);
  }

  render() {
    const {title} = this.props;
    return (
        <ListGroupItem
          header={title}
          onMouseOver={this.mouseOver}
          onMouseOut={this.mouseOut}
          className="numeric-control">
          {this.renderValue()}
          {this.renderGlyphs()}
        </ListGroupItem>
    );
  }
}
