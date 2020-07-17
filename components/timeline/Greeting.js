import { H3, H5 } from '../styles/Typography';
import { useContext } from 'react';
import { MeContext } from '../../contexts/MeContext';

const Greeting = () => {
  const { name } = useContext(MeContext);

  return (
    <>
      <H3>Good morning, {name}.</H3>
      <H5>Heres what happened while you were away.</H5>
    </>
  );
};

export default Greeting;
