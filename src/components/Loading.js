 // 让组件成为 Client Component
 "use client"
import styled, {css, keyframes } from "styled-components";

const Loader = ({fadeOut}) => {
  console.log("Loading")

  return (
    <Wrapper $fadeOut={fadeOut}>
      <Text>
        <Char>H</Char>
        <Char>U</Char>
        <Char>I</Char>
        <Char>X</Char>
        <Char>U</Char>
      </Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000;
  z-index: 9999;
  transition: opacity 2s;
  opacity: ${({ $fadeOut }) => ($fadeOut ? 0 : 1)};
  pointer-events: ${({ $fadeOut }) => ($fadeOut ? "none" : "auto")};
`;

const Text = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 100px;
`;

const BlurTextKeyframe = keyframes`
  0% { filter: blur(0px); }
  100% { filter: blur(4px); }
`;

const createTextAnimation = () => {
  let styles = [];
  for (let i = 0; i < 5; i++) {
    styles.push(css`
      &:nth-child(${i + 1}) {
        filter: blur(0px);
        animation: ${BlurTextKeyframe} 1.5s ${i / 5}s infinite linear alternate;
      }
    `);
  }
  return styles;
};

const Char = styled.span`
  display: inline-block;
  margin: 0 5px;
  color: #fff;
  font-family: "Quattrocento Sans", sans-serif;
  ${createTextAnimation()}
`;
export default Loader;