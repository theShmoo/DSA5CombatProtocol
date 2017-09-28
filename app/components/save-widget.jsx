import React from "react";
import { Col, ButtonToolbar, ButtonGroup, Button, Glyphicon } from "react-bootstrap";

export default class SaveWidget extends React.Component {

  constructor(props) {
    super(props);
    this.import = () => {this.props.onImport;};
    this.export = () => {this.props.onExport;};
  }

  render() {
    return (
    <Col sm={12} className="save-widget">
      <ButtonToolbar>
        <ButtonGroup>
          <Button onClick={this.import}><Glyphicon glyph="import" /> Import</Button>
          <Button onClick={this.export}><Glyphicon glyph="export" /> Export</Button>
        </ButtonGroup>
      </ButtonToolbar>
    </Col>
    );
  }
}
