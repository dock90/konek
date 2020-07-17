import styled from 'styled-components';

const H1 = styled.h1`
  font-size: 35px;
  margin: 0;
  padding: 0;
  margin-bottom: 15px;
  color: ${(props) => props.color};
  padding-left: ${(props) => props.pLeft};
`;

const H2 = styled.h2`
  font-size: 29px;
  font-weight: normal;
  margin: 0;
  padding: 0;
`;

const H3 = styled.h3`
  font-size: 24px;
  font-weight: normal;
  margin: 0;
  padding: 0;
  margin-bottom: 28px;
  color: ${(props) => props.color};
`;

const H4 = styled.h4`
  font-size: 20px;
  margin: 0;
  padding: 0;
  color: ${(props) => props.color};
  padding-left: ${(props) => props.pLeft};
`;

const H5 = styled.h5`
  font-size: 16px;
  font-weight: normal;
  margin: 0;
  padding: 0;
  /* margin-bottom: 20px; */
  color: ${(props) => props.color};
`;

const H6 = styled.h6`
  font-size: 14px;
  font-weight: normal;
  margin: 0;
  padding: 0;
  margin-bottom: 5px;
  color: ${(props) => props.color};
`;

const BodyText = styled.p`
  font-size: 12px;
  margin: 0;
  padding: 0;
  color: ${(props) => props.color};
`;

const AltText = styled.p`
  font-size: 12px;
  margin: 0;
  padding: 0;
  color: #90a4ae;
`;

const LinkText = styled.a`
  color: ${(props) => props.color};
`;

export { H1, H2, H3, H4, H5, H6, BodyText, AltText, LinkText };
