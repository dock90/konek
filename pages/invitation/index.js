import Layout from '../../components/Layout';
import AcceptInvitation from '../../components/invitation/AcceptInvitation';
import { H2 } from '../../components/styles/Typography';
import { useRouter } from 'next/router';
import { ContentContainer } from '../../components/styles/PageStyles';

const Invitation = () => {
  const router = useRouter();
  return (
    <Layout>
      <ContentContainer>
        <H2>Accept Invitation</H2>
        <AcceptInvitation code={router.query.code} />
      </ContentContainer>
    </Layout>
  );
};

export default Invitation;
