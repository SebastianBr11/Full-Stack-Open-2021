import axios from 'axios';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Header, Icon } from 'semantic-ui-react';
import { apiBaseUrl } from '../constants';
import { useStateValue } from '../state';
import { Gender, Patient } from '../types';

const PatientPage = () => {
  const [state, dispatch] = useStateValue();
  const { patientId } = useParams<{ patientId: string }>();

  const patient = useMemo(
    () => (patientId ? state.patients[patientId] : undefined),
    [state.patients, patientId]
  );

  const genderIcon = useMemo(() => {
    if (!patient) return undefined;
    switch (patient.gender) {
      case Gender.Male:
        return 'mars';
      case Gender.Female:
        return 'venus';
      case Gender.Other:
        return 'genderless';
    }
  }, []);

  useEffect(() => {
    if (patient && patient.ssn) return;

    const getPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${patientId}`
        );
        dispatch({ type: 'UPDATE_PATIENT', payload: patient });
      } catch (e) {
        console.error(e);
      }
    };
    void getPatient();
  }, [patientId]);

  if (!patient) {
    return <h2>Loading...</h2>;
  }

  return (
    <Container>
      <Header as='h1'>
        {patient.name}
        <Icon name={genderIcon} />
      </Header>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </Container>
  );
};

export default PatientPage;
