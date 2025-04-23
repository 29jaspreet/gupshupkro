import React from 'react'
import styled from "styled-components"

const Welcome = ({currentUser}) => {
  return (
    <Container>
      <img src="https://thumbs.dreamstime.com/b/robot-icon-chat-bot-sign-support-service-concept-chatbot-character-flat-style-robot-icon-chat-bot-sign-support-service-121644324.jpg" alt="robot" className="logo" />
      <h1>
        Welcome , <span>{currentUser.username}!</span>
      </h1>
      <h3>Please select a chat to Start Messaging.. </h3>
    </Container>
  )
}
const Container = styled.div`
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;
background:rgb(123, 159, 186);

color:white;

.logo {
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
  box-shadow: 0 0 10px rgb(0, 255, 89);
}
span{
color: rgba(21, 255, 0, 0.79)}`;

export default Welcome
