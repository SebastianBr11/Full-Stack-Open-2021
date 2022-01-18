import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Button,
  CardGroup,
  Container,
  Divider,
  Header,
  Icon,
} from 'semantic-ui-react';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import { apiBaseUrl } from '../constants';
import { addEntry, updatePatient, useStateValue } from '../state';
import { Gender, Patient, Entry } from '../types';
import EntryDetails from './EntryDetails';

const PatientPage = () => {
  const [state, dispatch] = useStateValue();
  const { patientId } = useParams<{ patientId: string }>();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${patientId}/entries`,
        values
      );
      dispatch(addEntry({ entry: newEntry, patientId }));
      closeModal();
    } catch (e: any) {
      console.error(e?.response?.data || 'Unknown Error');
      setError(e?.response?.data || 'Unknown error');
    }
  };

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
        dispatch(updatePatient(patient));
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
      <p>
        ssn: {patient.ssn}
        <br />
        occupation: {patient.occupation}
      </p>
      <Header as='h2'>entries</Header>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
      <Divider hidden />
      <CardGroup>
        {patient.entries.map(entry => (
          <EntryDetails key={entry.id} entry={entry} />
        ))}
      </CardGroup>
    </Container>
  );
};

export default PatientPage;
