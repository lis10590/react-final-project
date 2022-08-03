import firebase from "./firebaseApp";

export const getPurchases = async () => {
  let data = await firebase.firestore().collection("purchases").get();
  let dataArr = [];

  data.forEach((item) => {
    let obj = {
      id: item.id,
      productId: item.data().productId,
      customerId: item.data().customerId,
      date: item.data().date,
    };

    dataArr.push(obj);
  });

  console.log(dataArr);
};

export const addCustomer = async (purchase) => {
  await firebase.firestore().collection("purchases").add(purchase);
};

export const updateCustomer = async (purchaseId, newData) => {
  await firebase
    .firestore()
    .collection("purchases")
    .doc(purchaseId)
    .set(newData);
};

export const deleteCustomer = async (purchaseId) => {
  await firebase.firestore().collection("purchases").doc(purchaseId).delete();
};
