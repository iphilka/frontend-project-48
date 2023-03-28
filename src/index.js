import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parse.js';
import format from './formatters/index.js'
import buildTree from './treeBuider.js'

const buildFullPath = (filepath) => path.resolve(process.cwd(), filepath);
const getData = (filepath) => parse(fs.readFileSync(filepath), 'utf-8');

const extractFormat = (filepath) => parse.extname(filepath).slice(1);

const genDiff = (path1, path2, formstName = 'stylish') => {
    const data1 = getData(buildFullPath(path1));
    const data2 = getData(buildFullPath(path2));

    const tree = build(data1, data2);

    return format(tree, formatName);

}
// const genDiff = (arrPath) => {
//     const pathStatic = '../fixture/'
//     const arrData = arrPath.map(item => JSON.parse(fs.readFileSync(pathStatic + item, 'utf-8')))
//     console.log(arrData)
// };


// const genDiff = (path1, path2) => {
//     const data1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), path1) , 'utf-8'));
//     const data2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), path2) , 'utf-8'));
//     const arrPattern = []
//     const arrData = _.sortBy([].concat(Object.keys(data1), Object.keys(data2)));
//     arrData.forEach(item => {
//         if(item in data1 && item in data2 && data1[item] === data2[item]){
//             arrPattern.push(`  ${item} : ${data2[item]}`)
//         }else if(item in data1 && item in data2 && data1[item] !== data2[item]){
//             arrPattern.push(`- ${item} : ${data1[item]}`,`+ ${item} : ${data2[item]}`)
//         }else if(item in data1){
//             arrPattern.push(`- ${item} : ${data1[item]}`)
//         }else{
//             arrPattern.push(`+ ${item} : ${data2[item]}`)
//         }
//     })

//     const diff = Object.fromEntries(_.union((arrPattern.map(item => item.split(' : ')))))
//     console.log(diff)
// }

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