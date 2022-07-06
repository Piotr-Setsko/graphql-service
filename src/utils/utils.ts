export const renameKey = (data: any) => {
  const rename = (obj: any) => {
    const result = Object.assign({}, obj);

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
