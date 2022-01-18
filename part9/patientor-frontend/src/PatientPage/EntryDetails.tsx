import { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Divider,
  Icon,
  IconProps,
  List,
  ListItem,
} from 'semantic-ui-react';
import { SemanticCOLORS } from 'semantic-ui-react/dist/commonjs/generic';
import { useStateValue } from '../state';
import {
  Entry,
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry,
} from '../types';
import { assertNever } from '../utils';

interface EntryProps {
  entry: Entry;
}

const EntryDetails = ({ entry }: EntryProps) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryCard entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryCard entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckEntryCard entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;

interface EntryCardProps {
  entry: Entry;
  icon: IconProps['name'];
  children?: React.ReactNode;
  head?: React.ReactNode;
  extra?: React.ReactNode;
}

const EntryCard = ({ entry, icon, children, head, extra }: EntryCardProps) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Card>
      <CardContent>
        <CardHeader as='h2'>
          {entry.date} <Icon name={icon} /> {head}
        </CardHeader>
        <CardDescription>
          {entry.description}
          {entry.diagnosisCodes && (
            <>
              <Divider hidden />
              <h4>diagnoses</h4>
              <List>
                {entry.diagnosisCodes?.map(code => (
                  <ListItem key={code}>
                    {code}{' '}
                    {diagnoses[code]
                      ? diagnoses[code].name
                      : "couldn't find explanation"}
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </CardDescription>
        {children}
      </CardContent>
      {extra && <CardContent extra>{extra}</CardContent>}
    </Card>
  );
};

interface HospitalEntryProps {
  entry: HospitalEntry;
}

const HospitalEntryCard = ({ entry }: HospitalEntryProps) => {
  return (
    <EntryCard
      entry={entry}
      icon='hospital'
      extra={
        <>
          {entry.discharge.date} - {entry.discharge.criteria}
        </>
      }
    ></EntryCard>
  );
};

interface OccupationalHealthcareEntryProps {
  entry: OccupationalHealthcareEntry;
}

const OccupationalHealthcareEntryCard = ({
  entry,
}: OccupationalHealthcareEntryProps) => {
  return (
    <EntryCard
      entry={entry}
      icon='stethoscope'
      head={entry.employerName}
      extra={
        entry.sickLeave && (
          <>
            from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}
          </>
        )
      }
    ></EntryCard>
  );
};

interface HealthCheckEntryProps {
  entry: HealthCheckEntry;
}

const HealthCheckEntryCard = ({ entry }: HealthCheckEntryProps) => {
  const color = useMemo<SemanticCOLORS | undefined>(() => {
    switch (entry.healthCheckRating) {
      case 0:
        return 'green';
      case 1:
        return 'yellow';
      case 2:
        return 'orange';
      case 3:
        return 'red';
    }
  }, []);
  return (
    <EntryCard
      entry={entry}
      icon='doctor'
      extra={color && <Icon name='heart' color={color} />}
    ></EntryCard>
  );
};
