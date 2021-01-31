import React from 'react';
import PhysicianPatientTable from './PhysicianPatientTable';

class PhysicianPatientList extends React.Component {

    render(){
        return (<div><PhysicianPatientTable search={this.props.search} /></div>)
    }
}

export default PhysicianPatientList;