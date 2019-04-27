import React from 'react';
import {Query} from 'react-apollo';
import Spinner from './Spinner.jsx';
import ErrorMessage from './ErrorMessage.jsx';
const CustomQuery = ({children, ...props}) => (
  <Query {...props}>
    {({data, loading, error, client}) => {
      if (loading) {
        return (
          <div className="load-container">
            <h1>Loading</h1>
            <Spinner />
          </div>
        );
      }

      if (error) {
        return (
          <ErrorMessage
            errorMessage={
              'Sorry, there was an error processing your request...'
            }
          />
        );
      }

      return children(data, client);
    }}
  </Query>
);

export default CustomQuery;
