import colors from './colors'
import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Loader = styled.div`
  padding: 10px;
  border: 12px solid ${colors.primary};
  border-bottom-color: transparent;
  border-radius: 44px;
  animation: ${rotate} 1s infinite linear;
  height: 0;
  width: 0;
  position: absolute;
  top: 50%;
  left: 50%;
`