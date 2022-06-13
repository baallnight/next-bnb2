import { useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../store";
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";


const Container = styled.div`
  z-index: 11;
`;


interface IProps {
    closeModal: () => void;
}

const AuthModal: React.FC<IProps> = ({closeModal}) => {
    const authMode = useSelector((state: RootState) => state.auth.authMode);
    console.log(authMode, "authMode");

    return (
        <Container>
            {authMode === "signup" && <SignUpModal closeModal={closeModal} />}
            {authMode === "login" && <LoginModal closeModal={closeModal}/>}
        </Container>
    )
}

export default AuthModal;