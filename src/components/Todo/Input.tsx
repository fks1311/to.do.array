import styled from "styled-components";

export const Input = () => {
  return (
    <Layout>
      <input />
    </Layout>
  );
};

const Layout = styled.div`
  width: 100%;
  input {
    width: 95%;
  }
`;

/**
 * 작업 요소
 *
 * 입력
 * 엔터키로 등록
 *
 */
