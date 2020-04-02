import Layout from "../../components/auth/Layout";
import PhoneConfirm from "../../components/auth/PhoneConfirm";

export default props => {
  console.log(props);

  return (
    <Layout>
      <PhoneConfirm confirmationCode={1} />
    </Layout>
  );
};
