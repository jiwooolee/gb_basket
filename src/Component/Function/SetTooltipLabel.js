const setTooltipLabel = (value, defaultOption) => {
    const percent = ['fg', 'twoPer', 'threePer'];
    if(percent.includes(defaultOption.value)) return value * 100 + '%';
    else return value;
};

export default setTooltipLabel;