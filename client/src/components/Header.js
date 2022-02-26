import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

const HeaderContainer = styled.nav`
  display: flex;
  background-image: url(${'https://cdn.pixabay.com/photo/2015/11/10/08/31/banner-1036483__340.jpg'});
  flex: 0 1 auto;
`

const NavWrapper = styled.div`
  display: flex;
  position: relative;
  height: 100%;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
`

const NavLink = styled.div`
  color: #fff;
  font-size: 2.1rem;
  padding: 0;
`

const Logo = styled.img`
  padding: 0 10px;
`

const LoginWrapper = styled.div`
  list-style-type: none;
  margin-right: 20px;
`

const spinnerAnimation = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
 `

const Loader = styled.div`
  margin-top: 15px;
  margin-right: 15px;
  border: 5px solid white;
  border-radius: 50%;
  border-top: 5px solid gray;
  border-left: 5px solid gray;
  width: 25px;
  height: 25px;
  animation: ${spinnerAnimation} 1s linear infinite;
`

const LoginButton = styled.a`
  text-decoration: none;
  font-size: 22px;
  font-weight: lighter;
  text-align: center;
  &:hover {
    color: gray;
  }
`

class Header extends Component {
  renderContent() {
    switch (this.props.authentication) {
      case null:
        return <Loader />
      case false:
        return <LoginButton href="/auth/google">Login With Google</LoginButton>
      default:
        return <LoginButton href="/api/v1/logout">Logout</LoginButton>
    }
  }
  render() {
    return (
      <HeaderContainer>
        <NavWrapper>
          <NavLink>
            <Link to="/">
              <Logo
                src="https://uploads-ssl.webflow.com/607d1e57c684c2576cfb89b1/607d3eb6b2641482643d788f_momos-logo.svg"
                alt="logo"
              />
            </Link>
          </NavLink>
          <LoginWrapper>{this.renderContent()}</LoginWrapper>
        </NavWrapper>
      </HeaderContainer>
    )
  }
}

const mapStateToProps = ({ authentication }) => ({ authentication })

export default connect(mapStateToProps)(Header)
