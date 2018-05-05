import React, { Component } from "react";
import { Tooltip, OverlayTrigger, Glyphicon  } from "react-bootstrap";

function OverlayTriggeredGlyph(props) {

  const {tooltip, glyph, hovered, onClick} = props;

  return(
    <OverlayTrigger
      overlay={tooltip}
      placement="top"
      delayShow={0}
      delayHide={100}>
        <Glyphicon glyph={glyph} className="glyph-button" style={{display: hovered ? "inline" : "none"}} onClick={onClick}/>
    </OverlayTrigger>
  );
}

export default class EditButtons extends Component {

  constructor(props) {
    super(props);
    this.state = {hover: false};
    this.mouseOver = this.mouseOver.bind(this);
    this.mouseOut = this.mouseOut.bind(this);
  }

  mouseOver () {
    this.setState({hover: true});
  }

  mouseOut () {
    this.setState({hover: false});
  }

  render() {

    const {title, onEdit, onRemove, onDuplicate, children} = this.props;

    const tt_remove = (
      <Tooltip id="remove">Entferne {title}</Tooltip>
    );

    const tt_edit = (
      <Tooltip id="edit">Bearbeite {title}</Tooltip>
    );

    const tt_duplicate = (
      <Tooltip id="duplicate">Dupliziere {title}</Tooltip>
    );

    return(
      <div
        onMouseOver={this.mouseOver}
        onMouseOut={this.mouseOut}>
        {children}
        <OverlayTriggeredGlyph
          tooltip={tt_remove} onClick={onRemove} hovered={this.state.hover} glyph="minus" />
        <OverlayTriggeredGlyph
          tooltip={tt_edit} onClick={onEdit} hovered={this.state.hover} glyph="edit" />
        <OverlayTriggeredGlyph
          tooltip={tt_duplicate} onClick={onDuplicate} hovered={this.state.hover} glyph="duplicate" />
      </div>
    );
  }
}
