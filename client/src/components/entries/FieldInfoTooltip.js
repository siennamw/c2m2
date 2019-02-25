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
    const display = (
      <div className="content">
        {TOOLTIP_BY_FIELD(field) || 'No help text available for this field.'}
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
        <div className="anchor">&#8505;</div>
        {show ? display : ''}
      </span>
    );
  }
}

FieldInfoTooltip.propTypes = {
  field: propTypes.string.isRequired,
};
