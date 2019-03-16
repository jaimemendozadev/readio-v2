import React from 'react';
import {Query} from 'react-apollo';
import Spinner from './Spinner.jsx';

const CustomQuery = ({children, ...props}) => (
  <Query {...props}>
    {({data, loading, error, client}) => {
      if (loading) {
        return <Spinner />;
      }

      if (error) {
        return (
          <div className="error-msg">
            Sorry, there was an error processing your request...
          </div>
        );
      }

      return children(data, client);
    }}
  </Query>
);

export default CustomQuery;
