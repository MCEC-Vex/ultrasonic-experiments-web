import {Stats} from 'fast-stats';

function microToCM(microseconds)
{
    return (microseconds / 29) / 2;
}

export default class BaseStats
{
    constructor()
    {
        this.stats = new Stats();
        this.name = 'Unfiltered';
    }
    
    pushItem(value)
    {
        this.stats.push(value);
        if(this.stats.length > 25)
        {
            this.stats.shift();
        }
    }
    
    compute()
    {
        const [min, max] = this.stats.range().map(v => microToCM(v).toFixed(2));
        return {
            name: this.name,
            latest: microToCM(this.stats.data[this.stats.length - 1]).toFixed(2),
            mean: microToCM(this.stats.amean()).toFixed(2),
            median: microToCM(this.stats.median()).toFixed(2),
            min,
            max,
            stddev: this.stats.stddev().toFixed(2)
        };
    }
}
