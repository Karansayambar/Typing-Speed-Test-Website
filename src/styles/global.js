import { createGlobalStyle } from "styled-components";

const green = "green";

export const GlobalStyles = createGlobalStyle`
* {
  box-sizing: border-box;
}

body {
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.textColor};
  padding: 0;
  margin: 0;
  transition: all 0.25s linear;
}

.canvas {
  display: grid;
  grid-auto-flow: row;
  grid-template-rows: auto 1fr auto;
  padding: 2rem;
  gap: 0.5rem;
  min-height: 100vh;
  width: 100vw;
  align-items: center;
  text-align: center;
}

.type-box {
  width: 1000px;
  display: block;
  margin: 0 auto;
  overflow: hidden;
}

.words {
  display: flex;
  flex-wrap: wrap;
  font-size: 27px;
  color: ${({ theme }) => theme.typeBoxText};
}

.word {
  padding-right: 5px;
  margin: 1px 5px;
}

.current {
  border-left: 2px solid;
  animation: blinking 2s infinite;
  animation-timing-function: ease;
}

.current-right {
  border-left: 1px solid;
  animation: blinking 2s infinite;
  animation-timing-function: ease;
}

.correct {
  color: ${({ theme }) => theme.textColor};
}

.incorrect {
  color: red;
}

.upper-menu {
  display: flex;
  width: 1000px;
  margin: 0 auto;
  font-size: 1.35rem;
  justify-content: space-between;
  padding: 0.5rem;
}

.modes {
  display: flex;
  gap: 1rem;
}

.time-mode {
  cursor: pointer;
}

.time-mode:hover {
  color: ${green};
}

.hide-input {
  opacity: 0;
}

.correct {
  color: ${({ theme }) => theme.correctText};
}

.incorrect {
  color: red;
}

@keyframes blinking {
  0% { border-left-color: ${({ theme }) => theme.textColor}; }
  25% { border-left-color: ${({ theme }) => theme.background}; }
  50% { border-left-color: ${({ theme }) => theme.textColor}; }
  75% { border-left-color: ${({ theme }) => theme.background}; }
  100% { border-left-color: ${({ theme }) => theme.textColor}; }
}

.footer {
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1000px;
}

.stats-box {
  display: flex;
  width: 1000px;
  height: auto;
  margin-left: auto;
  margin-right: auto;
  justify-content : space-between;
}

.left-stats {
  width: 30%;
  padding: 30px;
}

.right-stats {
  width: 70%;
}

.header {
  display : flex;
  align-item : center;
  justify-content : space-between;
  width : 1000px;
  margin : auto;
}

.btn {
  width : 90%;
  padding : 2px 5px;
  margin : auto;
  border-radius : 5px;
  font-size : 18px;
  color : ${({ theme }) => theme.typeBoxText};
  background-color : ${({ theme }) => theme.textColor};
  border : none;
  display : flex;
  align-items : center;
  justify-content : center;
  gap : 1rem;
}

.user-profile {
  width : 1000px;
  margin : auto;
  display : flex;
  height : 15rem;
  border-radius : 20px;
  background : ${({ theme }) => theme.textColor};
  color : ${({ theme }) => theme.typeBoxText};
  padding : 1rem;
  align-item : center;
  justify-content : space-evenly;
  align-text : center;
}

.user {
  width : 50%;
  display : flex;
  align-item : center;
  margin-top : 30px;
  margin-bottom : 30px;
  font-size : 1.5rem;
  padding : 1rem;
  border-right : 2px solid;
}

.info{
  width : 100%;
  padding : 1rem;
  margin-top : 1rem;
}

.total-tests {
  width : 40%;
  font-size : 2rem;
  display : flex;
  align-items : center;
  justify-content : center;
}

.table, graph-user-page {
  margin : auto;
  width : 1000px;
}

.center-of-screen {
  display : flex;
  min-height : 100vh;
  justify-content : center;
  align-items : center;
}
`;
