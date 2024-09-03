import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: ${props => props.theme.colors.light};
  padding: 1rem;
  text-align: center;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2024 MagicNote. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;