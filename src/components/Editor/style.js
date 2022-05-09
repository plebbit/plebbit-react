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
    width: 100% !important;
    display: block !important;
  }
  .editorClassName {
    height: 200px !important;
    border: 1px solid ${(props) => props.wrapperBorder};
    padding: 5px !important;
    border-radius: 2px !important;
  }
`;

export default Wrapper;
