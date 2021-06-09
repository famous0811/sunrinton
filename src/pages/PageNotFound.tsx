import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  background-color: black;
  height: 100vh;
  width: 100vw;
`;

export default function PageNotFound(): React.ComponentElement<any, any> {
  return <Wrapper>Page Not Found</Wrapper>;
}
