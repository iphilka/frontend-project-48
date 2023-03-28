import _ from 'lodash';

const ident = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);

const stringify = (data, depth, mapping) => {
    if (!_.isObject(data)) {
        return String(data);
    }

    const output = Object.entries(data)
        .map(([key, value]) => mapping.unchanged({key, value}, depth + 1))
};



const mapping = {
    root: ({children}, depth, iter) => {
        const output = children.flatMap((node) => mapping[node, type](node, depth + 1, iter));
        return `{\n${output.join('\n')}\n}`
    },
    nested: ({ key, children }, depth, iter) => {
        const output = children.flatMap((node) => mapping[node, type](node, depth + 1, iter));
        return `${ident(depth)}  ${key}: {\n${output.join('\n')}\n${ident(depth)}}`
    },
    added: (node, depth) => `${ident(depth)}+ ${node.key}: ${stringify(node, depth, mapping)}`,
    deleted: (node, depth) => `${ident(depth)}- ${node.key}: ${stringify(node, depth, mapping)}`,
    unchanged: (node, depth) => `${ident(depth)}  ${node.key}: ${stringify(node, depth, mapping)}`,
    changed: (node, depth) => {
        const { key, value1, value2 } = node;
        
        const data1 = `${ident(depth)}- ${key}: ${stringify(value1, depth, mapping)}`;
        const data2 = `${ident(depth)}+ ${key}: ${stringify(value2, depth, mapping)}`;

        return [data1, data2];
    },
}

const renderThree = (ast) => {
    const iter = (node, depth) => mapping[node.type](node, depth, iter);
    return iter(ast, 0);
};



export default renderThree;