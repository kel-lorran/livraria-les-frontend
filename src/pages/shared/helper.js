export const disableRequiredAttribute = helper => helper.map(step => step.map(e =>  ({
    ...e,
    required: false,
    min: undefined,
    max: undefined,
    minLength: undefined,
    maxLength: undefined,
})));

export const alterInputAndAttributes = (inputMapStep, toRemove = [], toModify = {}) => {
    const result = [];
    inputMapStep.forEach((inp) => {
        if (!toRemove.includes(inp.name)) {
            result.push(toModify[inp.name] ? { ...inp, ...toModify[inp.name] } : inp)
        }
    });
    return result;
};
