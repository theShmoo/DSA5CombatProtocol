import React from "react";
import { Tooltip, OverlayTrigger, Glyphicon, Col  } from "react-bootstrap";

export default class GlyphButton extends React.Component {

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

    const {tooltip, glyph, ignore, onClick, children} = this.props;
    const tt = (
      <Tooltip id="glyph">{tooltip}</Tooltip>
    );

    if(ignore) {
      return (
        <span>
          {children}
        </span>);
    }

    return(
      <Col sm={12}
        onMouseOver={this.mouseOver}
        onMouseOut={this.mouseOut}>
        {children}
        <OverlayTrigger
          overlay={tt}
          placement="top"
          delayShow={0}
          delayHide={100}>
            <Glyphicon glyph={glyph} className="glyph-button" style={{display: this.state.hover ? "inline" : "none"}} onClick={onClick}/>
        </OverlayTrigger>

        </Col>
    );
  }
}

GlyphButton.defaultProps = {
  glyph: "plus",
  ignore: false
};
