import React from "react";
import { Tooltip, OverlayTrigger, Glyphicon  } from "react-bootstrap";

export default class MiniStates extends React.Component {

  constructor(props) {
    super(props);
  }

  createMiniState(state, id) {

    const {name, glyph, stufe} = state;
    let disp_name = name;
    if(stufe != undefined)
      disp_name += " Stufe " + stufe;

    const tt = (
      <Tooltip id="state">Zustand {disp_name}</Tooltip>
    );
    return(
      <OverlayTrigger
        key={id}
        overlay={tt}
        placement="top"
        delayShow={0}
        delayHide={100}>
          <Glyphicon glyph={glyph} className="glyph-state" />
      </OverlayTrigger>
    );
  }

  render() {

    const {states} = this.props;

    if(!states || states.length == 0)
      return <span />;

    const createdStates = states.map((s, i) => {return this.createMiniState(s, i);});

    return(
      <span>
        {createdStates}
      </span>
    );
  }
}

MiniStates.defaultProps = {
};
