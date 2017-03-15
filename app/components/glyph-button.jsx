import React from "react";
import { Tooltip, OverlayTrigger, Button, Glyphicon  } from "react-bootstrap";

export default class GlyphButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const tooltip = (
      <Tooltip id="glyph">{this.props.tooltip}</Tooltip>
    );

    return(
      <div className="glyph-button">
        <OverlayTrigger
          overlay={tooltip}
          placement="top"
          delayShow={0}
          delayHide={100}>
            <Button bsSize="xsmall" onClick={this.props.onClick}>
              <Glyphicon glyph={this.props.glyph}/>
            </Button>
        </OverlayTrigger>
      </div>
    );
  }
};
GlyphButton.defaultProps = {
  glyph: "plus"
};
