import styled from 'styled-components';

const Wrapper = styled.div`
  .toolbarClassName {
    background-color: ${(props) => props.toolbarBg};
    border: 0;
  }
  .button-class {
    background: transparent;
    border: 0;
    color: ${(props) => props.toolbarColor};
  }
  .wrapperClassName {
    border: 1px solid ${(props) => props.wrapperBorder};
  }
`;

export default Wrapper;
