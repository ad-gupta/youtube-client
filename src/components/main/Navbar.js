import React, { useState } from "react";
import { styled } from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import LoginIcon from "@mui/icons-material/Login";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { logout } from "../../redux/userSlice";
import axios from "axios";
import logo from "../../images/logo.png";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "../menu/Menu";
import Upload from "./Upload";

const Nav = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  // z-index: 999;
  background-color: ${({ theme }) => theme.bg};

  
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Input = styled.input`
  height: 35px;
  width: 30vw;
  border: 2px solid grey;
  border-right: none;
  outline: none;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  padding: 5px 20px;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textSoft};
`;

const SearchBtn = styled.button`
  width: 35px;
  height: 35px;
  border: 2px solid grey;
  outline: none;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.textSoft};
  padding: 5px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  padding: 3px;
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

const Hr = styled.hr`
  margin: 15px 0;
  border: 0.5px solid ${({ theme }) => theme.soft};
`;

const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  
`;

const UserImg = styled.img`
  border-radius: 50%;
  height: 27px;
  width: 25px;

  @media (max-width: 868px) {
    display: none;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  
`;

const MenuAndLogo = styled.div`
  display: flex;
`;

const Menubtn = styled.button`
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg};
  border: none;
`;

const Username = styled.p`
@media (max-width: 868px) {
  display: none;
}
`;


const Navbar = ({menuVisible, setMenuVisible}) => {
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [key, setKey] = useState("")

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const addPost = () => {
    setOpen(true)
    navigate("/addPost");
  };

  const handleMenubarClick = () => {
    setMenuVisible(!menuVisible);
  }

  const handleLogout = async () => {
    try {
      await axios.get("/auths/logout");
      dispatch(logout());
    } catch (err) {
      console.log(err);
    }
  };


  
  return (
    <>
      <Nav>
        <Container>
          <MenuAndLogo>
            <Menubtn onClick={handleMenubarClick}>
              <MenuIcon />
            </Menubtn>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Logo>
                <img src={logo} style={{ height: "25px" }} />
                Shorts
              </Logo>
            </Link>
          </MenuAndLogo>
          <SearchBar>
            <Input type="text" placeholder="Search" onChange={(e) => setKey(e.target.value)}/>
            <SearchBtn>
              <SearchIcon onClick={()=>navigate(`/search?q=${key}`)}/>
            </SearchBtn>
          </SearchBar>
          {!currentUser ? (
            <Link to="/signin" style={{ textDecoration: "none" }}>
              <LoginButton>
                <LoginIcon />
                SIGN IN
              </LoginButton>
            </Link>
          ) : (
            <User>
              <p onClick={addPost}>
                <PostAddIcon />
              </p>
              <UserImg src={currentUser.imgUrl} />
              <Username>{`Hi ${currentUser.name}`} </Username>
              <LoginButton onClick={handleLogout}>Logout</LoginButton>
            </User>
          )}
        </Container>
        <Hr />
      </Nav>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
