const database = {
    
};

const getSamples = () => {
    return [];
};

const getSample = (id) => {
    return {
        id: id,
        timestamp:  new Date().toISOString(),
        value: 12.3};
};

const writeSample = (sample) => {
    const id = generateUUID();
    sample.id = id;
    return sample;
};

module.exports = { getSamples, getSample };