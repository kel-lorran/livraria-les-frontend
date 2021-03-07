import { useState, useEffect } from 'react';
import MyInput from '../MyInput';
import MyTextArea from '../MyTextarea';
import MySelect from '../MySelect';
import MyInputRadio from '../MyInputRadio';
import MyButton from '../MyButton';

import * as S from './style';

export const buildInitialState = names => names.reduce((ac, name) => ({ ...ac, [name]: '' }), {});

export default ({ inputMap, submmitButtonText = 'Enviar', onSubmit }) => {
    const [step, setStep] = useState(0);
    const [mustContinue, setContinue] = useState(false);
    const [formData, setFormData] = useState(buildInitialState(inputMap[step].map(e => e.name)));

    useEffect(() => setContinue(!!inputMap[step + 1]), [step])
    
    const handleSubmit = e => {
        e.preventDefault();

        if(mustContinue) {
            setStep(step + 1)
        } else {
            onSubmit(formData);
        }
    }

    const getComponent = ({ componentName, options, name,...props }) => {
        debugger
        switch (componentName) {
            case 'MyInput':
                return <MyInput {...props} key={name} name={name} value={formData[name]} handleChange={e => setFormData({ ...formData, [name]: e.target.value})} />;
            case 'MyTextArea':
                return <MyTextArea {...props} key={name} name={name} value={formData[name]} handleChange={e => setFormData({ ...formData, [name]: e.target.value})} />;
            case 'MySelect':
                return (
                    <MySelect {...props} key={name} name={name} value={formData[name]} handleChange={e => setFormData({ ...formData, [name]: e.target.value})} >
                        {options.map(({ value, text }) => <span data-value={value} key={value}>{text}</span>)}
                    </MySelect>
                );
            case 'MyInputRadio':
                return <MyInputRadio {...props} key={name} name={name} value={formData[name]} handleChange={e => setFormData({ ...formData, [name]: e.target.value})} options={options} />;
            default:
                return null;
        }
    }

    return (
        <S.Wrapper onSubmit={handleSubmit}>
            <div className="my-input-group">
                {inputMap[step].map(e => getComponent(e))}
            </div>
            <MyButton type="submit">
                {mustContinue ? 'continuar' : submmitButtonText}
            </MyButton>
        </S.Wrapper>
    )
}