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

  return dataArr;
};

export const addPurchase = async (purchase) => {
  await firebase.firestore().collection("purchases").add(purchase);
};

export const updatePurchase = async (purchaseId, newData) => {
  await firebase
    .firestore()
    .collection("purchases")
    .doc(purchaseId)
    .set(newData);
};

export const deletePurchase = async (purchaseId) => {
  await firebase.firestore().collection("purchases").doc(purchaseId).delete();
};
