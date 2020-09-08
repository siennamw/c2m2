import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import QueryWrap from './QueryWrap';

import { AuthContext } from '../AuthContext';
import * as queries from '../../queries';

const DetailedEntry = ({
  DisplayComponent,
  entryTypeForDisplay,
  gqlQuery,
  id,
  queryName,
}) => {
  const { authenticated } = useContext(AuthContext);

  return (
    <QueryWrap
      id={id}
      query={gqlQuery}
      queryName={queryName}
    >
      {
        (values) => {
          const heading = () => {
            if (values.title) {
              return (
                <h3>
                  {values.title}
                  {values.secondary_title ? `: ${values.secondary_title}` : ''}
                </h3>
              );
            }

            if (values.name) {
              return <h3>{values.name}</h3>;
            }

            return null;
          };

          const pubStatus = (status) => {
            if (!['draft', 'provisional', 'approved'].includes(status)) {
              return null;
            }

            let description = '';

            switch (status) {
              case 'approved':
                description = 'This entry has been reviewed and approved by a project administrator.';
                break;
              case 'provisional':
                description = 'This entry has not yet been reviewed by a project administrator.';
                break;
              case 'draft':
              default:
                description = 'This entry is a draft and can only be viewed by catalogers.';
                break;
            }

            return (
              <div className={`publication-status bar ${status}`}>
                <span className="h3">
                  {`${status}:`}
                </span>
                <span>{description}</span>
              </div>
            );
          };

          return (
            <div className="detailed-entry">
              <div>
                {pubStatus()}
                <div className="entry-type">
                  {`${entryTypeForDisplay}:`}
                </div>
                {heading()}
                <table className="u-full-width">
                  <DisplayComponent values={values} />
                </table>
                {
                  !authenticated
                    ? null
                    : (
                      <div className="edit-entry-link">
                        <Link to={`/dashboard/edit/${queryName}/${id}`}>
                          {`Edit this ${entryTypeForDisplay} \u2192`}
                        </Link>
                      </div>
                    )
                }
              </div>
            </div>
          );
        }
      }
    </QueryWrap>
  );
};

DetailedEntry.defaultProps = {
  entryTypeForDisplay: 'entry',
};

DetailedEntry.propTypes = {
  DisplayComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  entryTypeForDisplay: PropTypes.string,
  gqlQuery: PropTypes.oneOf(Object.values(queries)).isRequired,
  id: PropTypes.number.isRequired,
  queryName: PropTypes.string.isRequired,
};

export default DetailedEntry;
