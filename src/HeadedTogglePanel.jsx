import React, { Component } from "react";
import PropTypes from 'prop-types';
import { Panel } from "react-bootstrap";

export default class HeadedTogglePanel extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      open: this.props.expanded
    };
  }

  onClick(e) {

  }

  render() {
    return (
      <Panel expanded={this.state.open} onToggle={() => this.setState({ open: !this.state.open })}>
        <Panel.Heading>
          <Panel.Title toggle>
            {this.props.header}
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          {this.props.children}
        </Panel.Collapse>
      </Panel>
    );
  }
}

HeadedTogglePanel.propTypes = {
  expanded: PropTypes.bool.isRequired
};


