import React, { ReactNode } from "react";
import styled from "styled-components";

interface ModalLayoutProps {
  children: ReactNode;
}
export const ModalLayout = React.forwardRef<HTMLDivElement, ModalLayoutProps>(({ children }, ref) => {
  return <Layout>{children}</Layout>;
});

const Layout = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  z-index: 1;
  height: 98%;
  width: 98%;
  padding: 1rem;
  background-color: rgba(3, 3, 3, 0.9);
`;
