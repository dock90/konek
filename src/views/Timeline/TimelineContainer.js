import React from 'react';
import styled from 'styled-components';

// components
import { H3, H5 } from '../../components/Typography';

// styles
const Layout = styled.div`
  grid-area: main;
  background: #f4f6f8;
  padding: 2rem;
`;

const TimelineContainer = () => (
  <Layout>
    <H3>Good morning, Aaron.</H3>
    <H5>Heres what happened while you were away.</H5>
  </Layout>
);

export default TimelineContainer;
