export const renameKey = (data: any) => {
  const rename = (obj: any) => {
    let result = Object.assign({}, obj);

    // result = Object.keys(result).map(item => {
    //   item.includes('Ids') ? item.slice(0, -3) : item;
    // })

    result.id = result._id;
    delete result._id

    return result;
  }

  if (Array.isArray(data)) {
    return data.map((item: any) => {
      return rename(item);
    });
  } else {
    return rename(data);
  }
};
