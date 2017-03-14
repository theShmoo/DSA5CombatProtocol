import React from "react";
import { Tooltip, OverlayTrigger, Button, Glyphicon  } from "react-bootstrap";

export default class AddButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const glyph = "plus";

    const tooltip = (
      <Tooltip id="add">{this.props.tooltip}</Tooltip>
    );

    return(
      <div className="add-button">
        <OverlayTrigger
          overlay={tooltip}
          placement="top"
          delayShow={0}
          delayHide={100}>
            <Button bsSize="xsmall" onClick={this.props.onClick}>
              <Glyphicon glyph={glyph}/>
            </Button>
        </OverlayTrigger>
      </div>
    );
  }
}
