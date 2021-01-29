import React from 'react';
import NavBar from '../NavBar/NavBar';
import PatientTable from '../Nurse/PatientTable';

class PhysicianPage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar />
        <PatientTable search={this.props.search} />
      </div>
    );
  }
}

export default PhysicianPage;
