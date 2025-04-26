import { JSX } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import logo from "@assets/icon.png";
import { NavState } from "@utils/Atom";

interface NavItem {
  icon: string;
  title: string;
  todo: number;
}

export const Nav = (): JSX.Element => {
  const navlist: NavItem[] = [
    { icon: logo, title: "오늘", todo: 0 },
    { icon: logo, title: "내일", todo: 0 },
    { icon: logo, title: "이번주", todo: 0 },
    { icon: logo, title: "완료됨", todo: 0 },
  ];
  const setCurNav = useSetRecoilState(NavState);
  const onClickNav = (data: NavItem) => {
    setCurNav({ day: data.title, count: data.todo });
  };

  return (
    <Layout>
      {navlist.map((data, i) => (
        <NavItem key={i} onClick={() => onClickNav(data)}>
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
  padding: 1rem;
  color: ${({ theme: { darkmode } }) => darkmode.txt_primary};
  &:hover {
    cursor: pointer;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
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
