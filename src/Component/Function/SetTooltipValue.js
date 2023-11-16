const setTooltipValue = (datum, defaultOption) => {
    const percent = ['fg', 'twoPer', 'threePer'];
    const count = ['twoTry', 'twoMade', 'threeTry', 'threeMade', 'totalRebound', 'offensiveRebound', 'defensiveRebound', 'assist', 'steal', 'block', 'turnOver', 'foul'];
    const point = ['points', 'beff'];

    if(percent.includes(defaultOption.value)) {
        return (datum[defaultOption.value] * 100).toFixed(2) + '%';
    } else if(count.includes(defaultOption.value)) {
        return (datum[defaultOption.value].toFixed(2)) + '개';
    } else if(point.includes(defaultOption.value)) {
        return (datum[defaultOption.value].toFixed(2)) + '점';
    }
};

export default setTooltipValue;