import styled, { StyledComponent } from 'styled-components';

type StyledComponentDiv = StyledComponent<'p', any, Record<string, any>>;

interface FlexTypes {
  center: StyledComponentDiv;
  left: StyledComponentDiv;
  right: StyledComponentDiv;
}

export const Flex: FlexTypes = {
  center: styled.div`
    display: flex;
    justify-content: center;
  `,
  left: styled.div`
    display: flex;
    justify-content: flex-start;
  `,
  right: styled.div`
    display: flex;
    justify-content: flex-end;
  `,
};

const Wrapper = { Flex };
export default Wrapper;
