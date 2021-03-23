import { useState, useEffect } from 'react';
import * as S from './style';

export default ({ placeholder = 'adicionar', defaultValueList = [], onChange, keysToCommit = [13] }) => {
    const [valueSet, setValueSet] = useState(new Set(defaultValueList));

    const handleKeyUp = e => {
        e.preventDefault();
        if (keysToCommit.includes(e.keyCode)) {
            setValueSet((new Set(valueSet)).add(e.target.value));
            e.target.value = '';
        }
    }

    const removeTag = valueToRemove => {
        const newSet = new Set(valueSet);
        newSet.delete(valueToRemove);
        setValueSet(newSet);
    }

    useEffect(() => onChange({ target: { value: [...valueSet] } }),[valueSet])

    return (
        <S.Wrapper>
            <div>
                {[...valueSet].map(e => (
                    <S.Tag key={e}>
                        <span>
                            {e}
                        </span>
                        <i onClick={() => removeTag(e)} className="fas fa-times-circle"></i>
                    </S.Tag>
                ))}
                <input type="text" onKeyUp={handleKeyUp} placeholder={placeholder} />
            </div>
        </S.Wrapper>
    );
}
