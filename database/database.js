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


module.exports = { getSamples, getSample };