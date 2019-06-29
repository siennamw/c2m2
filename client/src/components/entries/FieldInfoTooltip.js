import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { MODEL_NAMES, TOOLTIP_BY_MODEL_AND_FIELD } from '../../constants';

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
    const {
      field,
      forMultiSelect,
      model,
    } = this.props;

    const tooltip = TOOLTIP_BY_MODEL_AND_FIELD(model, field);

    const rules = tooltip && tooltip.rules && tooltip.rules.length > 0
      ? tooltip.rules.map((r, i) => <li key={i}>{r}</li>)
      : undefined;

    const semantics = tooltip && tooltip.semantics
      ? tooltip.semantics
      : 'No description available for this field.';

    const display = (
      <div className="tooltip-content">
        {
          forMultiSelect
            ? <div className="multi-select-tooltip">Hold ctrl/cmd to select more than one.</div>
            : undefined
        }
        <div className="tooltip-description">{semantics}</div>
        {
          rules
            ? (
              <Fragment>
                <hr />
                <p>Rules</p>
                <ul className="tooltip-rules">{rules}</ul>
              </Fragment>
            )
            : undefined
        }
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

FieldInfoTooltip.defaultProps = {
  forMultiSelect: false,
};

FieldInfoTooltip.propTypes = {
  field: PropTypes.string.isRequired,
  forMultiSelect: PropTypes.bool,
  model: PropTypes.oneOf(MODEL_NAMES).isRequired,
};
