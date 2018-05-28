import React, {Component} from 'react';


class ProtectedRoute extends Component {
  render(){
    return(
      <div>
        <h1>ProtectedRoute</h1>
        {console.log("props inside ProtectedRoute ", this.props)}
      </div>
    )
  }
}

export default ProtectedRoute;