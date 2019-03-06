import React from 'react';
import propTypes from 'prop-types';

import { TOOLTIP_BY_FIELD } from '../../constants';

export default class FieldInfoTooltip extends React.Component {
  state = {
    show: false,
  };

  showDisplay = () => {
    this.setState({ show: true });
  };

  hideDisplay = () => {
    this.setState({ show: false });
  };

  handleTouch = () => {
    const { show } = this.state;
    if (show) {
      this.hideDisplay();
    } else {
      this.showDisplay();
    }
  };

  render() {
    const { field } = this.props;
    const tooltip = TOOLTIP_BY_FIELD(field);

    const rules = tooltip && tooltip.rules && tooltip.rules.length > 0
      ? tooltip.rules.map((r, i) => <li key={i}>{r}</li>)
      : undefined;

    const description = tooltip && tooltip.description
      ? tooltip.description
      : 'No description available for this field.';

    const display = (
      <div className="tooltip-content">
        <div className="tooltip-description">
          { description }
        </div>
        <hr />
        {rules ? <p>Rules</p> : undefined}
        {rules || <div>No rules available for this field</div>}
      </div>
    );

    const { show } = this.state;

    return (
      <span
        className="field-info-tooltip"
        onMouseOver={this.showDisplay}
        onMouseLeave={this.hideDisplay}
        onFocus={this.showDisplay}
        onBlur={this.hideDisplay}
        onTouchStart={this.handleTouch}
      >
        <div className="tooltip-anchor">&#8505;</div>
        {show ? display : ''}
      </span>
    );
  }
}

FieldInfoTooltip.propTypes = {
  field: propTypes.string.isRequired,
};
