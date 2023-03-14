import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const genDiff = (path1, path2) => {
    const data1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), path1), 'utf-8'));
    const data2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), path2), 'utf-8'));
    
    const keys = _.union(Object.keys(data1), Object.keys(data2));
    const sortedKeys = _.sortBy(keys);
    const diff = sortedKeys.map((key) => {
        if()
        return null;
    })
    return 
};

export default genDiff;