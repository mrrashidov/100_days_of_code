const applyCursorsToNodes = (
    allNodesAccessor,
    { before, after }, {
        removeNodesBeforeAndIncluding,
        removeNodesAfterAndIncluding,
    }, {
        orderColumn, ascOrDesc, isAggregateFn, formatColumnFn, primaryKey
    },
) => {
    let nodesAccessor = allNodesAccessor;
    if (after) {
        nodesAccessor = removeNodesBeforeAndIncluding(nodesAccessor, after, {
            orderColumn, ascOrDesc, isAggregateFn, formatColumnFn, primaryKey
        });
    }
    if (before) {
        nodesAccessor = removeNodesAfterAndIncluding(nodesAccessor, before, {
            orderColumn, ascOrDesc, isAggregateFn, formatColumnFn, primaryKey
        });
    }
    return nodesAccessor;
};

const nodesToReturn = async (
    allNodesAccessor,
    {
        removeNodesBeforeAndIncluding,
        removeNodesAfterAndIncluding,
        hasLengthGreaterThan,
        removeNodesFromEnd,
        removeNodesFromBeginning,
        orderNodesBy,
    },
    {
        before, after, first, last,
    }, {
        orderColumn, ascOrDesc, isAggregateFn, formatColumnFn, primaryKey
    },
) => {
    const orderedNodesAccessor = orderNodesBy(allNodesAccessor, {
        orderColumn, ascOrDesc, isAggregateFn, formatColumnFn, primaryKey
    });
    const nodesAccessor = applyCursorsToNodes(
        orderedNodesAccessor,
        { before, after },
        {
            removeNodesBeforeAndIncluding,
            removeNodesAfterAndIncluding,
        }, {
            orderColumn, ascOrDesc, isAggregateFn, formatColumnFn, primaryKey
        },
    );
    let hasNextPage = !!before;
    let hasPreviousPage = !!after;
    let nodes = [];
    if (first) {
        if (first < 0) throw new Error('`first` argument must not be less than 0');
        nodes = await removeNodesFromEnd(nodesAccessor, first + 1, { orderColumn, ascOrDesc });
        if (nodes.length > first) {
            hasNextPage = true;
            nodes = nodes.slice(0, first);
        }
    }
    if (last) {
        if (last < 0) throw new Error('`last` argument must not be less than 0');
        nodes = await removeNodesFromBeginning(nodesAccessor, last + 1, { orderColumn, ascOrDesc, primaryKey });
        if (nodes.length > last) {
            hasPreviousPage = true;
            nodes = nodes.slice(1);
        }
    }
    return { nodes, hasNextPage, hasPreviousPage };
};

const cursorPaginationBuilder = ({
                                     removeNodesBeforeAndIncluding,
                                     removeNodesAfterAndIncluding,
                                     getNodesLength,
                                     hasLengthGreaterThan,
                                     removeNodesFromEnd,
                                     removeNodesFromBeginning,
                                     convertNodesToEdges,
                                     orderNodesBy,
                                 }) => async (
    allNodesAccessor,
    args = {},
    opts = {},
) => {
    const {
        isAggregateFn, formatColumnFn, skipTotalCount = false, modifyEdgeFn, modifyNodeFn, primaryKey = 'id',
    } = opts;
    let {
        orderColumn, ascOrDesc,
    } = opts;
    const {
        before, after, first, last, orderDirection = 'asc', orderBy = primaryKey,
    } = args;

    if (orderColumn) {
        console.warn('"orderColumn" and "ascOrDesc" are being deprecated in favor of "orderBy" and "orderDirection" respectively');
    } else {
        orderColumn = orderBy;
        ascOrDesc = orderDirection;
    }

    if (formatColumnFn && formatColumnFn(orderColumn) === orderColumn) {
        console.warn(`orderBy ${ orderColumn } should not equal its formatted counterpart: ${ formatColumnFn(orderColumn) }.`);
        console.warn('This may cause issues with cursors being generated properly.');
    }

    const { nodes, hasPreviousPage, hasNextPage } = await nodesToReturn(
        allNodesAccessor,
        {
            removeNodesBeforeAndIncluding,
            removeNodesAfterAndIncluding,
            getNodesLength,
            hasLengthGreaterThan,
            removeNodesFromEnd,
            removeNodesFromBeginning,
            orderNodesBy,
        }, {
            before, after, first, last,
        }, {
            orderColumn, ascOrDesc, isAggregateFn, formatColumnFn, primaryKey
        },
    );

    const totalCount = !skipTotalCount && await getNodesLength(allNodesAccessor, {
        getNodesLength,
    });

    let edges = convertNodesToEdges(modifyNodeFn ? modifyNodeFn(nodes) : nodes, { before, after, first, last, }, { orderColumn, ascOrDesc, isAggregateFn, formatColumnFn, primaryKey });

    if (modifyEdgeFn) {
        edges = edges.map(edge => modifyEdgeFn(edge));
    }

    const startCursor = edges[0] && edges[0].cursor;
    const endCursor = edges[edges.length - 1] && edges[edges.length - 1].cursor;

    return {
        pageInfo: {
            hasPreviousPage,
            hasNextPage,
            startCursor,
            endCursor,
        },
        totalCount,
        edges,
    };
};

module.exports = cursorPaginationBuilder;