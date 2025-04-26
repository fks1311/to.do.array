import styled from "styled-components";

export const Input = () => {
  return (
    <Layout>
      <input placeholder="엔터키를 눌러 작업을 추가합니다." />
    </Layout>
  );
};

const Layout = styled.div`
  input {
    width: 100%;
    padding: 0.7rem 10px;
    border: none;
    border-radius: 3px;
    box-sizing: border-box;
  }
`;

/**
 * 작업 요소
 *
 * 입력
 * 엔터키로 등록
 *
 */
