import Layout from '../../components/auth/Layout';
import PhoneConfirm from '../../components/auth/PhoneConfirm';

export default props => {
  return (
    <Layout>
      <PhoneConfirm verificationId={props.query.verificationId} />
    </Layout>
  );
};
