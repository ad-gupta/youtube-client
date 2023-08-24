import React from "react";
import LoginIcon from "@mui/icons-material/Login";
import styled from "styled-components";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import HistoryIcon from "@mui/icons-material/History";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import SettingsIcon from "@mui/icons-material/Settings";
import ReportIcon from "@mui/icons-material/Report";
import HelpIcon from "@mui/icons-material/Help";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Container = styled.div`
  display: ${(props) => (props.isVisible ? "block" : "none")};
  flex: 1;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  height: 150vh;
  position: sticky;
  top: 0;
  // margin-top: 90px;

  @media (max-width: 868px) {
    display: ${(props) => (props.isVisible == false ? "block" : "none")};
  }
`;

const Wrapper = styled.div`
  margin-top: 90px;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  padding: 7.5px;
  color: ${({ theme }) => theme.text};
`;

const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const Login = styled.div`
  padding: 7.5px;
`;

const LoginButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  border: 1px solid rgba(10, 104, 203);
  color: rgba(10, 104, 203);
  padding: 5px 15px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.bg};
  margin: 5px;
  gap: 5px;
`;

const Title = styled.h2`
  color: #aaaaaa;
  font-weight: 500;
  font-size: 14px;
  margin: 10px 25px;
`;

const Menu = ({ darkMode, setDarkMode, isVisible }) => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <Container isVisible = {isVisible}>
      <Wrapper>
        <Link to="/" style={{ textDecoration: "none" }}>
          <Item>
            <HomeIcon />
            Home
          </Item>
        </Link>
        <Link to="/trend" style={{ textDecoration: "none" }}>
          <Item>
            <ExploreIcon />
            Explore
          </Item>
        </Link>

        <Link to="/subscription" style={{ textDecoration: "none" }}>
          <Item>
            <SubscriptionsIcon />
            Subscriptions
          </Item>
        </Link>
        <Hr />
        <Item>
          <VideoLibraryIcon />
          Library
        </Item>
        <Item>
          <HistoryIcon />
          History
        </Item>
        <Hr />

        {!currentUser ? (
          <Login>
            Sign in to like videos, comment, and subscribe
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <LoginButton>
                <LoginIcon />
                SIGN IN
              </LoginButton>
            </Link>
          </Login>
        ) : (
          ""
        )}
        <Title>Explore</Title>
        <Item>
          <LibraryMusicIcon />
          Music
        </Item>
        <Item>
          <SportsSoccerIcon />
          Sports
        </Item>
        <Item>
          <SportsEsportsIcon />
          Gaming
        </Item>
        <Item>
          <MovieFilterIcon />
          Movies
        </Item>
        <Item>
          <NewspaperIcon />
          News
        </Item>
        <Item>
          <LiveTvIcon />
          Live
        </Item>
        <Hr />
        <Item>
          <SettingsIcon />
          Settings
        </Item>
        <Item>
          <ReportIcon />
          Report
        </Item>
        <Item>
          <HelpIcon />
          Help
        </Item>
        <Item onClick={() => setDarkMode(!darkMode)}>
          <LightModeIcon />
          {darkMode ? "Light Mode" : "Dark Mode"}
        </Item>
      </Wrapper>
    </Container>
  );
};

export default Menu;
