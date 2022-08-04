import firebase from "./firebaseApp";

export const getProducts = async () => {
  let data = await firebase.firestore().collection("products").get();
  let dataArr = [];

  data.forEach((item) => {
    let obj = {
      id: item.id,
      name: item.data().name,
      price: item.data().price,
      quantity: item.data().quantity,
    };

    dataArr.push(obj);
  });

  return dataArr;
};

export const addProduct = async (product) => {
  await firebase.firestore().collection("products").add(product);
};

export const updateProduct = async (productId, newData) => {
  await firebase.firestore().collection("products").doc(productId).set(newData);
};

export const deleteProduct = async (productId) => {
  await firebase.firestore().collection("products").doc(productId).delete();
};
