const formatTransactions = (transactioData) => {
  return transactioData.reduce((previous, current) => {
    const dataIndex = previous.findIndex((data) => data[current.date]);

    //date does not exist in array yet
    if (dataIndex < 0) {
      return [
        ...previous,
        {
          [current.date]: {
            [current.transactionType]: [current.amount]
          }
        }
      ];
    }

    // if date exist but current transactionType not on the date index
    if (!previous[dataIndex][current.date][current.transactionType]) {
      return [
        ...previous.slice(0, dataIndex),
        {
          [current.date]: {
            ...previous[dataIndex][current.date],
            [current.transactionType]: [current.amount]
          }
        },
        ...previous.slice(dataIndex + 1, previous.length)
      ];
    }

    // assume date exists and current transactionType exists on the date index
    return [
      ...previous.slice(0, dataIndex),
      {
        [current.date]: {
          ...previous[dataIndex][current.date],
          [current.transactionType]: previous[dataIndex][current.date][
            current.transactionType
          ].concat(current.amount)
        }
      },
      ...previous.slice(dataIndex + 1, previous.length)
    ];
  }, []);
};

export default formatTransactions;
