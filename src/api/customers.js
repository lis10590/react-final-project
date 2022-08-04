import firebase from "./firebaseApp";

export const getCustomers = async () => {
  let data = await firebase.firestore().collection("customers").get();
  let dataArr = [];

  data.forEach((item) => {
    let obj = {
      id: item.id,
      firstName: item.data().firstName,
      lastName: item.data().lastName,
      city: item.data().city,
    };

    dataArr.push(obj);
  });

  return dataArr;
};

export const addCustomer = async (customer) => {
  await firebase.firestore().collection("customers").add(customer);
};

export const updateCustomer = async (customerId, newData) => {
  await firebase
    .firestore()
    .collection("customers")
    .doc(customerId)
    .set(newData);
};

export const deleteCustomer = async (customerId) => {
  await firebase.firestore().collection("customers").doc(customerId).delete();
};
