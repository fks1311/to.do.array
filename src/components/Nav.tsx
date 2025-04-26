import styled from "styled-components";
import logo from "../assets/icon.png";
import { JSX } from "react";

interface NavItem {
  icon: string;
  title: string;
  todo: number;
}

export const Nav = (): JSX.Element => {
  const navlist: NavItem[] = [
    { icon: logo, title: "오늘", todo: 1 },
    { icon: logo, title: "내일", todo: 1 },
    { icon: logo, title: "이번주", todo: 1 },
    { icon: logo, title: "완료됨", todo: 1 },
  ];

  return (
    <Layout>
      {navlist.map((data, i) => (
        <NavItem key={i}>
          <NavTitle>
            <img src={data.icon} />
            <div>{data.title}</div>
          </NavTitle>
          <TodoCount>{data.todo}</TodoCount>
        </NavItem>
      ))}
    </Layout>
  );
};

const Layout = styled.nav`
  flex: 0.2;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 1rem;
  border-right: 1px solid ${({ theme: { darkmode } }) => darkmode.divider};
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme: { darkmode } }) => darkmode.txt_primary};
`;

const NavTitle = styled.div`
  display: flex;
  align-items: center;
  img {
    height: 2rem;
    margin-right: 1rem;
    border-radius: 50%;
  }
`;
const TodoCount = styled.div``;
