import React, { Component } from 'react';
import TDLContainer from 'containers/TDL/TDLContainer';

class TDLBoard extends Component {
    render() {
        const {
            title,
        } = this.props.location.state;

        return (
            <TDLContainer 
            title={title}
            />
        )
    }
}

export default TDLBoard;