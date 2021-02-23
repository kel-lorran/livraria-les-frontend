import * as S from './style';

const MyModal = ({ children, handleClose, show = false }) => {
    return (
        <S.Wrapper show={show}>
            <div>
                {handleClose && <span onClick={handleClose} className="close-button"><i className="fas fa-times"></i></span>}
                {children}
            </div>
        </S.Wrapper>
    )
}

export default MyModal;
