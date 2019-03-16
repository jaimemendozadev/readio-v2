import React from 'react';
import {Mutation} from 'react-apollo';
import Spinner from './Spinner.jsx';

const CustomMutation = ({children, ...props}) => (
  <Mutation {...props}>
    {(mutateFunction, {data, loading, error, called, client}) => {
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
          <div className="error-msg">
            Sorry, there was an error processing your request...
          </div>
        );
      }

      return children(mutateFunction, {data, called, client});
    }}
  </Mutation>
);

export default CustomMutation;
