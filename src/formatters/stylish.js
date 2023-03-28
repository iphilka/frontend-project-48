import _ from 'lodash';

const ident = (depth, spaceCount = 4) => ' '.repeat(depth * spaceCount - 2);

const stringify = (data, deth, mapping) => {
    if (!_.isObject(data)) {
        return String(data);
    }

    const output = Object.entries(data)
        .map(([key, values]) => )
};