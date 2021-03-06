import React from 'react';
import axios from 'axios';
import { Route, Link, Switch } from 'react-router-dom';
import { Button, Divider, Header, Container } from 'semantic-ui-react';

import { apiBaseUrl } from './constants';
import { setDiagnoseList, setPatientList, useStateValue } from './state';
import { Diagnosis, Patient } from './types';

import PatientListPage from './PatientListPage';
import PatientPage from './PatientPage';

const App = () => {
  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDiagnoseList = async () => {
      try {
        const { data: diagnoseList } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnoseList(diagnoseList));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchPatientList();
    void fetchDiagnoseList();
  }, [dispatch]);

  return (
    <div className='App'>
      <Container>
        <Header as='h1'>Patientor</Header>
        <Button as={Link} to='/' primary>
          Home
        </Button>
        <Divider hidden />
        <Switch>
          <Route path='/patients/:patientId'>
            <PatientPage />
          </Route>
          <Route path='/'>
            <PatientListPage />
          </Route>
        </Switch>
      </Container>
    </div>
  );
};

export default App;
