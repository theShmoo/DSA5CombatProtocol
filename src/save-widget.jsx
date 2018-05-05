import React from "react";
import { Col, ButtonToolbar, ButtonGroup, Button, Glyphicon } from "react-bootstrap";

export default class SaveWidget extends React.Component {

  constructor(props) {
    super(props);
    this.import = (evt) => {
      let files = evt.target.files;
      if (!files.length) {
        alert("No file select");
        return;
      }
      let file = files[0];
      let that = this;
      let reader = new FileReader();
      reader.onload = function(e) {
        that.props.onImport(e.target.result);
      };
      reader.readAsText(file);
    };
    this.onImportClick = () => {this.refs.fileUploader.click();};
    this.export = () => {this.props.onExport();};
  }

  render() {
    return (
    <Col sm={12} className="save-widget">
      <ButtonToolbar>
        <ButtonGroup>
          <Button onClick={this.onImportClick}><Glyphicon glyph="import" /> Import</Button>
          <Button onClick={this.export}><Glyphicon glyph="export" /> Export</Button>
          <input type="file" id="file" accept=".json" ref="fileUploader" onChange={this.import} style={{display: "none"}}/>
        </ButtonGroup>
      </ButtonToolbar>
    </Col>
    );
  }
}
