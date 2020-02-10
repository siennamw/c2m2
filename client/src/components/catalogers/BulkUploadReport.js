import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const BulkUploadReport = ({ report }) => {
  if (!report) {
    return null;
  }

  return (
    <Fragment>
      <h4>Upload Report</h4>
      <table className="u-full-width">
        <thead>
          <tr>
            <th>Row in CSV</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>(heading row)</td>
          </tr>
          {
            report.map((result, index) => (
              // index as key okay here because report is static
              // eslint-disable-next-line react/no-array-index-key
              <tr key={index}>
                <td>
                  {/* heading row in CSV was row 1, now offset by 2 for parity */}
                  {index + 2}
                </td>
                <td>{result}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </Fragment>
  );
};

BulkUploadReport.propTypes = {
  report: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ),
};

BulkUploadReport.defaultProps = {
  report: null,
};

export default BulkUploadReport;
