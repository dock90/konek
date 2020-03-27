import PropTypes from "prop-types";
import Router from "next/router";
import styled from "styled-components";
import { auth } from "../config/firebase";

// material
import { NotificationsOutlined, Menu, Input } from "@material-ui/icons";
import { Hidden, IconButton, Badge, Avatar } from "@material-ui/core";

// components
import { H4 } from "./styles/Typography";
import Search from "./search";
import { BaseButton } from "./material/StyledButton";

// styles
const MenuToggle = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 10px;
`;

const Container = styled.div`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  background: #bbbbbb;
`;

const Branding = styled.div`
  display: flex;
  align-items: center;
  margin-left: 22px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = ({ drawerToggle }) => {
  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        console.log("User Signed Out");
        Router.push("/auth/login");
      })
      .catch(error => {
        console.log("There was an error signing out: ", error);
      });
  };

  return (
    <Container>
      <Hidden smUp>
        <MenuToggle>
          <IconButton onClick={drawerToggle}>
            <Menu fontSize="large" />
          </IconButton>
        </MenuToggle>
      </Hidden>
      <Branding>
        <Avatar
          alt="Konek Logo"
          src="https://raw.githubusercontent.com/EdwardGoomba/imgHost/master/crmBeta/logo.png"
        />
        <H4 color="#ffffff" pLeft="0.5rem">
          Konek
        </H4>
      </Branding>
      <Actions>
        <Search />
        <IconButton color="inherit">
          <Badge variant="dot">
            <NotificationsOutlined />
          </Badge>
        </IconButton>
        <BaseButton color="inherit" onClick={handleLogout}>
          <Input />
          Sign out
        </BaseButton>
      </Actions>
    </Container>
  );
};

Header.propTypes = {
  drawerToggle: PropTypes.func
};

export default Header;
