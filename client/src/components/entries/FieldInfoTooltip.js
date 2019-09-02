import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import { MODEL_NAMES, TOOLTIP_BY_MODEL_AND_FIELD } from '../../constants';

const FieldInfoTooltip = ({ field, model }) => {
  const [show, setShow] = useState(false);

  const showDisplay = () => {
    setShow(true);
  };

  const hideDisplay = () => {
    setShow(false);
  };

  const handleTouch = () => {
    if (show) {
      hideDisplay();
    } else {
      showDisplay();
    }
  };

  const tooltip = TOOLTIP_BY_MODEL_AND_FIELD(model, field);

  const rules = tooltip && tooltip.rules && tooltip.rules.length > 0
    ? tooltip.rules.map((r, i) => <li key={i}>{r}</li>)
    : undefined;

  const semantics = tooltip && tooltip.semantics
    ? tooltip.semantics
    : 'No description available for this field.';

  const display = (
    <div className="tooltip-content">
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

  return (
    <span
      className="field-info-tooltip"
      onBlur={hideDisplay}
      onFocus={showDisplay}
      onMouseLeave={hideDisplay}
      onMouseOver={showDisplay}
      onTouchStart={handleTouch}
    >
      <div className="tooltip-anchor">&#8505;</div>
      {show ? display : ''}
    </span>
  );
};

FieldInfoTooltip.propTypes = {
  field: PropTypes.string.isRequired,
  model: PropTypes.oneOf(MODEL_NAMES).isRequired,
};

export default FieldInfoTooltip;
