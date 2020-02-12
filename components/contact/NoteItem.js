import PropTypes from 'prop-types';
import styled from 'styled-components';
// material
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
// styled
import { BodyText } from '../styles/Typography';

const Container = styled.div`
  margin-top: 1rem;
`;

const NoteItem = ({ note }) => {
  const { entryId, message, title } = note;
  return (
    <Container key={entryId}>
      <Card>
        <CardHeader
          title={title}
          style={{ borderBottom: '1px solid #EEEEEE' }}
        />
        <CardContent>
          <BodyText>{message}</BodyText>
        </CardContent>
      </Card>
    </Container>
  );
};

NoteItem.propTypes = {
  // TODO: add shape to prop type
  note: PropTypes.object.isRequired,
};

export default NoteItem;
