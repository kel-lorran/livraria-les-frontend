import React from 'react';

export const personDataParses = {
    birthDate: strIsoDate => (new Date(strIsoDate)).toLocaleDateString(),
    gender: char => {
        switch (char) {
            case 'm':
                return 'masculino';
            case 'f':
                return 'masculino';
            default:
                return 'indefinido';
        }
    }
}

export const createDescriptionsList = (defaultHelper, item, parses = {}) => {
    return defaultHelper.map(step => step.reduce((ac, inp) => {
        return [
            ...ac,
            <React.Fragment key={'dt' + inp.name}>
                <dt>{inp.label || inp.placeholder}</dt>
                <dd>{parses[inp.name]?.(item[inp.name]) || item[inp.name]}</dd>
                <br />
            </React.Fragment>
        ]
    }, []))
}
