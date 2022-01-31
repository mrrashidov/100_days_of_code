const cursorPaginationBuilder = require('./cursor-pagination-builder')

const SEPARATION_TOKEN = '_*_';
const ARRAY_DATA_SEPARATION_TOKEN = '_%_';

const encode = str => Buffer.from(str).toString('base64');
const decode = str => Buffer.from(str, 'base64').toString();

const operateOverScalarOrArray = (initialValue, scalarOrArray, operation, operateResult) => {
    let result = initialValue;
    const isArray = Array.isArray(scalarOrArray);
    if (isArray) {
        scalarOrArray.forEach((scalar, index) => {
            result = operation(scalar, index, result);
        });
    } else {
        result = operation(scalarOrArray, null, result);
    }
    if (operateResult) {
        result = operateResult(result, isArray);
    }

    return result;
};

const cursorGenerator = (id, customColumnValue) => encode(`${ id }${ SEPARATION_TOKEN }${ customColumnValue }`);

const getDataFromCursor = (cursor) => {
    const decodedCursor = decode(cursor);
    const data = decodedCursor.split(SEPARATION_TOKEN);
    if (data[0] === undefined || data[1] === undefined) {
        throw new Error(`Could not find edge with cursor ${ cursor }`);
    }
    const values = (data[0]?data[0]:data[1]).split(ARRAY_DATA_SEPARATION_TOKEN).map(v => JSON.parse(v));
    return [ data[0], values ];
};

const formatColumnIfAvailable = (column, formatColumnFn, isRaw = true) => {
    if (formatColumnFn) {
        return formatColumnFn(column, isRaw);
    }
    return column;
};

const buildRemoveNodesFromBeforeOrAfter = (beforeOrAfter) => {
    const getComparator = (orderDirection) => {
        if (beforeOrAfter === 'after') return orderDirection === 'asc' ? '<' : '>';
        return orderDirection === 'asc' ? '>' : '<';
    };
    return (nodesAccessor, cursorOfInitialNode, {
        orderColumn, ascOrDesc, isAggregateFn, formatColumnFn, primaryKey
    }) => {
        const data = getDataFromCursor(cursorOfInitialNode);
        const [ id, columnValue ] = data;

        const initialValue = nodesAccessor.clone();
        const executeFilterQuery = query => operateOverScalarOrArray(query, orderColumn, (orderBy, index, prev) => {
            let orderDirection;
            const values = columnValue;
            let currValue;
            if (index !== null) {
                orderDirection = ascOrDesc[index].toLowerCase();
                currValue = values[index];
            } else {
                orderDirection = ascOrDesc.toLowerCase();
                currValue = values[0];
            }
            const comparator = getComparator(orderDirection);


            if (index > 0) {
                const operation = (isAggregateFn && isAggregateFn(orderColumn[index - 1])) ? 'orHavingRaw' : 'orWhereRaw';
                return prev[operation](
                    `(?? = ? and ?? ${ comparator } ?)`,
                    [ formatColumnIfAvailable(orderColumn[index - 1], formatColumnFn), values[index - 1], formatColumnIfAvailable(orderBy, formatColumnFn), values[index] ],
                );
            }

            if (currValue === null || currValue === undefined) {
                return prev;
            }

            const operation = (isAggregateFn && isAggregateFn(orderBy)) ? 'havingRaw' : 'whereRaw';
            return prev[operation](`(?? ${ comparator } ?)`, [ formatColumnIfAvailable(orderBy, formatColumnFn), currValue ]);
        }, (prev, isArray) => {
            // Result is sorted by primaryKey as the last column
            const comparator = getComparator(ascOrDesc);
            const lastOrderColumn = isArray ? orderColumn.pop() : orderColumn;
            const lastValue = columnValue.pop();

            // If value is null, we are forced to filter by primaryKey instead
            const operation = (isAggregateFn && isAggregateFn(lastOrderColumn)) ? 'orHavingRaw' : 'orWhereRaw';
            if (lastValue === null || lastValue === undefined) {
                return prev[operation](
                    `(?? ${ comparator } ?) or (?? IS NOT NULL)`,
                    [ formatColumnIfAvailable(primaryKey, formatColumnFn), id, formatColumnIfAvailable(lastOrderColumn, formatColumnFn) ],
                );
            }

            return prev[operation](
                `(?? = ? and ?? ${ comparator } ?)`,
                [ formatColumnIfAvailable(lastOrderColumn, formatColumnFn), lastValue, formatColumnIfAvailable(primaryKey, formatColumnFn), id ],
            );
        });
        let result;

        if ((isAggregateFn && Array.isArray(orderColumn) && isAggregateFn(orderColumn[0]))
            || (isAggregateFn && !Array.isArray(orderColumn) && isAggregateFn(orderColumn))) {
            result = executeFilterQuery(initialValue);
        } else {
            result = initialValue.andWhere(query => executeFilterQuery(query));
        }
        return result;
    };
};

const orderNodesBy = (nodesAccessor, { orderColumn = 'id', ascOrDesc = 'asc', formatColumnFn, primaryKey = 'id' }) => {
    const initialValue = nodesAccessor.clone();
    return operateOverScalarOrArray(initialValue, orderColumn, (orderBy, index, prev) => {
        if (index !== null) {
            return prev.orderBy(formatColumnIfAvailable(orderBy, formatColumnFn, false), ascOrDesc[index]);
        }
        return prev.orderBy(formatColumnIfAvailable(orderBy, formatColumnFn, false), ascOrDesc);
    }, (prev, isArray) => (isArray
        ? prev.orderBy(formatColumnIfAvailable(primaryKey, formatColumnFn, false), ascOrDesc[0])
        : prev.orderBy(formatColumnIfAvailable(primaryKey, formatColumnFn, false), ascOrDesc)))
};
const removeNodesBeforeAndIncluding = buildRemoveNodesFromBeforeOrAfter('before');

const removeNodesFromEnd = (nodesAccessor, first) => nodesAccessor.clone().limit(first);

const removeNodesAfterAndIncluding = buildRemoveNodesFromBeforeOrAfter('after');

const removeNodesFromBeginning = (nodesAccessor, last, { orderColumn, ascOrDesc, primaryKey }) => {
    const invertedOrderArray = operateOverScalarOrArray([], ascOrDesc,
        (orderDirection, index, prev) => prev.concat(orderDirection === 'asc' ? 'desc' : 'asc'));

    const order = invertedOrderArray.length === 1 ? invertedOrderArray[0] : invertedOrderArray

    const subQuery = orderNodesBy(nodesAccessor.clone().clearOrder(), {
        orderColumn,
        ascOrDesc: order,
        primaryKey: primaryKey
    }).limit(last);
    return nodesAccessor.clone().from(subQuery.as('last_subQuery')).clearSelect().clearWhere()
};


const getNodesLength = async (nodesAccessor) => {
    const counts = await nodesAccessor.clone().clearSelect().clear('join').count('id as count');
    return counts.reduce((prev, curr) => {
        const currCount = curr.count || curr['count'];
        if (!currCount) return prev;
        return parseInt(currCount, 10) + prev;
    }, 0);
};

const hasLengthGreaterThan = async (nodesAccessor, amount) => {
    const result = await nodesAccessor.clone().limit(amount + 1);
    return result.length === amount + 1;
};

const convertNodesToEdges = (nodes, _, {
    orderColumn,
    primaryKey
}) => nodes.map((node) => {
    const dataValue = operateOverScalarOrArray('', orderColumn, (orderBy, index, prev) => {
        const nodeValue = node[orderBy];
        return `${ prev }${ index ? ARRAY_DATA_SEPARATION_TOKEN : '' }${ JSON.stringify(nodeValue) }`;
    });

    return {
        cursor: cursorGenerator(node[primaryKey], dataValue),
        node,
    };
});

const paginate = cursorPaginationBuilder(
    {
        removeNodesBeforeAndIncluding,
        removeNodesAfterAndIncluding,
        getNodesLength,
        hasLengthGreaterThan,
        removeNodesFromEnd,
        removeNodesFromBeginning,
        convertNodesToEdges,
        orderNodesBy,
    },
);

module.exports = paginate;
module.exports.getDataFromCursor = getDataFromCursor;
module.exports.removeNodesBeforeAndIncluding = removeNodesBeforeAndIncluding;
module.exports.removeNodesFromEnd = removeNodesFromEnd;
module.exports.removeNodesAfterAndIncluding = removeNodesAfterAndIncluding;
module.exports.removeNodesFromBeginning = removeNodesFromBeginning;
module.exports.getNodesLength = getNodesLength;
module.exports.hasLengthGreaterThan = hasLengthGreaterThan;
module.exports.convertNodesToEdges = convertNodesToEdges;
module.exports.orderNodesBy = orderNodesBy;