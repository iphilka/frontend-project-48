import fs from 'fs';
import path from 'path';
import _ from 'lodash';


const genDiff = (path1, path2) => {
    const data1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), path1) , 'utf-8'));
    const data2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), path2) , 'utf-8'));
    const keys = _.union(Object.keys(data1), Object.keys(data2));
    const sortedKeys = _.sortBy(keys);
    const diff = sortedKeys.flatMap((key) => {
        if (_.has(data1, key) && !_.has(data2, key)) {
           return (`- ${key}: ${data1[key]}`);
          }
        if (!_.has(data1, key) && _.has(data2, key)) {
            return (`+ ${key}: ${data2[key]}`);
        }
        if (_.has(data1, key) && _.has(data2, key) && data1[key] !== data2[key]) {
            return (`- ${key}: ${data1[key]} \n+ ${key}: ${data2[key]}`);
        }
          if (data1[key] === data2[key]) {
            return (`  ${key}: ${data1[key]}`);
        }
    })
    return (`{\n${diff.join('\n')}\n}`);
};


// const test2 =  path.resolve(process.cwd(), 'file1.json');


// const keys1 = _.union(Object.keys(data1));
// const keys2 = _.union(Object.keys(data2))
// const arrData =  _.sortBy([].concat(keys1, keys2));
// const keys = _.union(Object.keys(data1), Object.keys(data2));
// const sortedKeys = _.sortBy(keys);
// for (const key of sortedKeys) {
//     if (data1.hasOwnProperty(key) && !data2.hasOwnProperty(key)) {
//         const firstFile = `- ${key}: ${data1[key]}`
//         console.log(firstFile);
//         //return firstFile;
//     }
//     else if (data1.hasOwnProperty(key) && data2.hasOwnProperty(key) && data1[key] === data2[key]) {
//         const twoFile =  `  ${key}: ${data1[key]}`;
//         console.log(twoFile);
//     } 
//     else if (data1.hasOwnProperty(key) && data2.hasOwnProperty(key) && data1[key] !== data2[key]) {
//         const another = `- ${key}: ${data1[key]}  
//         + ${key}: ${data2[key]}`
//         return another;
//     }
// }

//     // const diff = sortedKeys.map((key) => {
   
//     // })
//     console.log(diff);
// };
    // if(key in sortedKeys && data1[key] != data2[key]){
    //     return `+ ${key} : ${data1[key]}`;
    // }
    // if (key in sortedKeys && data1[key] && !data2[key] ) {
    //     return `- ${key} : ${data1[key]}`;
    // } 

 



export default genDiff;