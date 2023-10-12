const removeObjectProperty = (obj, propertyToRemove) => {
  const { [propertyToRemove]: removedProperty, ...newObj } = obj;
  return newObj;
};

export default removeObjectProperty;
