import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .moreCont {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 8px 12px;
    position: absolute;
    width: 161px;
    background: #ffffff;
    box-shadow: 0px 0px 1px rgba(12, 26, 75, 0.2),
      0px 1px 3px rgba(50, 50, 71, 0.1);
    border-radius: 8px;
    top: 29px;
    right: 0;
    z-index: 1;
    .more-item {
      border-radius: 6px;
        flex: none;
        order: 1;
        align-self: stretch;
        flex-grow: 0;
        margin: 6px 0px;
        font-style: normal;
        font-weight: normal;
        font-size: 14px;
        line-height: 14px;
        display: flex;
        align-items: center;
        padding: 10px 11px;
      &:hover {
        background: #edf2f7; 
      }
    }
   

    }
  }
`;

export default Wrapper;
