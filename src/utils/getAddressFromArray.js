
const getAddressFromArray = (array) =>
    array?.reduce((addresses, subscription) => {
        if (subscription?.address) {
            addresses.push(subscription.address);
        }
        return addresses;
    }, []) ?? [];

export default getAddressFromArray;

