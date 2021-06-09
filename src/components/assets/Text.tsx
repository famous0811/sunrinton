import styled, { StyledComponent } from 'styled-components';

// Interface & types
type ParagraphType = StyledComponent<'p', any, Record<string, any>>;

interface BoldType {
  color: StyledComponent<'span', any, Record<string, any>>;
  default: StyledComponent<'span', any, Record<string, any>>;
}

// Styles + Components

export const Title: StyledComponent<'p', any, Record<string, any>> = styled.p`
  font-size: 50px;
  font-weight: ${(props: any): number =>
    props.fontWeight ? props.fontWeight : 900};
  word-break: keep-all;
`;

export const SubTitle: ParagraphType = styled.p``;

export const Bold: BoldType = {
  color: styled.span`
    color: #ea5550;
    font-weight: 900;
  `,
  default: styled.span`
    font-weight: 900;
  `,
};

export const Paragraph = styled.p`
  font-size: 20px;
  font-weight: 300;
  line-height: 1.8;
  word-break: keep-all;
`;

const Text = { Title, Paragraph, Bold };

export default Text;
