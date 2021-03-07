import CustomForm from '../../../components/CustomForm';

import { inputMap } from './helper';

export const FormHelper = ({ type }) => {
    switch (type) {
        case 'createBook':
            return <CustomForm inputMap={inputMap} onSubmit={obj => console.log(obj)} />
    
        default:
            return null
    }
}