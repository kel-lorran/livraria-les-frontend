import * as S from './style';

export default ({cover, callToAction, children}) => {
    return (
        <S.Wrapper>
            <div>
                <img className="cover-img" src={cover} />
                {callToAction && <div className="call-to-action">{callToAction}</div>}
                {children && <div className="bottom-slot">{children}</div>}
            </div>
        </S.Wrapper>
    )
}