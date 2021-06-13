import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Tooltip from '../Tooltip';

import { MODEL_NAMES, TOOLTIP_BY_MODEL_AND_FIELD } from '../../constants';

const FieldInfoTooltip = ({ field, model }) => {
  const tooltip = TOOLTIP_BY_MODEL_AND_FIELD(model, field);

  const rules = tooltip && tooltip.rules && tooltip.rules.length > 0
    // key as index here is okay because content is static
    // eslint-disable-next-line react/no-array-index-key
    ? tooltip.rules.map((r, i) => <li key={i}>{r}</li>)
    : undefined;

  const semantics = tooltip && tooltip.semantics
    ? tooltip.semantics
    : 'No description available for this field.';

  return (
    <Tooltip>
      <>
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
      </>
    </Tooltip>
  );
};

FieldInfoTooltip.propTypes = {
  field: PropTypes.string.isRequired,
  model: PropTypes.oneOf(MODEL_NAMES).isRequired,
};

export default FieldInfoTooltip;
