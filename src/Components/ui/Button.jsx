import styled from "styled-components";

// La prop transitoire $color sert uniquement au style du bouton.
const Button = styled.button`
  padding: 0.8rem 1.25rem;
  color: white;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
  background-color: ${({ $color = "var(--accent)" }) => $color};
  border: 0;
  border-radius: 6px;
  transition:
    filter 160ms ease,
    transform 160ms ease;

  &:hover {
    filter: brightness(1.2);
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 520px) {
    width: 100%;
  }
`;

export default Button;
