import { customers, purchases, products } from "./database";

export const findProductById = (id) => {
  let data = {};
  products.map((product) => {
    if (product.id === id) {
      data = {
        productName: product.name,
        productPrice: product.price,
        productQuantity: product.quantity,
      };
    }
  });
  return data;
};

export const findCustomerById = (id) => {
  let data = {};
  customers.map((customer) => {
    if (customer.id === id) {
      data = customer.firstName + " " + customer.lastName;
    }
  });
  return data;
};

export const ProductsArray = () => {
  const arr = [];
  const customersArray = [];

  let data = {};

  for (const product of products) {
    for (const purchase of purchases) {
      if (product.id === purchase.productId) {
        data = {
          name: product.name,
          price: product.price,
          quantity: product.quantity,
          customers: customersArray.push(purchase.customerId),
        };

        arr.push(data);
      }
    }
  }
  console.log(arr);
  const customersArr = arr.map((customer) => {
    return customer.name;
  });
  const isDuplicate = customersArr.filter((item, index) => {
    return customersArr.indexOf(item) !== index;
  });
  console.log(isDuplicate);

  const [duplicateProducts] = isDuplicate.map((item) => {
    return products.filter((product) => {
      return item === product.name;
    });
  });
  console.log(duplicateProducts);
  const selectedCustomersId = [];
  const selectedCustomers = [];

  for (const item of arr) {
    for (const dupProduct of isDuplicate) {
      if (item.name === dupProduct) {
        selectedCustomersId.push(item.customers);
      }
    }
  }
  console.log(selectedCustomersId);

  for (const customer of customers) {
    for (const id of selectedCustomersId) {
      if (customer.id === id) {
        selectedCustomers.push(customer);
      }
    }
  }

  console.log(selectedCustomers);
};

export const newCollection = () => {
  let selectedProducts = [];
  for (const product of products) {
    for (const purchase of purchases) {
      if (purchase.productId === product.id) {
        selectedProducts.push(product);
      }
    }
  }
  console.log(selectedProducts);
};

export const findPurchaseByProductId = (id) => {
  let arr = [];
  purchases.map((purchase) => {
    if (purchase.productId === id) {
      arr.push(purchase);
    }
    console.log(arr);
    return arr;
  });
};

export const duplicateProducts = (arr) => {
  let newArr = [];
  if (arr.length > 1) {
    arr.map((product) => {
      newArr.push(product.customerId);
    });
    return newArr;
  }
};

export const customersArr = (arr) => {
  let array = [];
  for (const item of arr) {
    for (const customer of customers) {
      if (item === customer.id) {
        array.push(customer.firstName + " " + customer.lastName);
      }
    }
  }
  return array;
};

export const newProduct = (arr, id) => {
  for (const product of products) {
    if (product.id === id) {
      const newProduct = {
        ...product,
        customers: arr,
      };
      return newProduct;
    }
  }
};

const p = findPurchaseByProductId(5);
const a = duplicateProducts(p);
