import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Tooltip = ({ align, anchor, children }) => {
  const [show, setShow] = useState(false);

  return (
    <span
      className="tooltip"
      onBlur={() => setShow(false)}
      onFocus={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      onMouseOver={() => setShow(true)}
      onTouchStart={() => setShow(!show)}
    >
      {anchor}
      {
        show
          ? <span className={`tooltip-content ${align}`}>{children}</span>
          : null
      }
    </span>
  );
};

Tooltip.defaultProps = {
  align: 'left',
  anchor: <span className="tooltip-anchor">&#8505;</span>,
};

Tooltip.propTypes = {
  align: PropTypes.oneOf(['left', 'right']),
  anchor: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default Tooltip;
