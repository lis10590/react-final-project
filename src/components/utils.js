import { customers, purchases, products } from "./database";

export const findProductById = (id) => {
  let data = {};
  products.map((product) => {
    if (product.id === id) {
      data = {
        name: product.name,
        price: product.price,
        quantity: product.quantity,
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

  const customersArr = arr.map((customer) => {
    return customer.name;
  });
  const isDuplicate = customersArr.filter((item, index) => {
    return customersArr.indexOf(item) !== index;
  });

  const [duplicateProducts] = isDuplicate.map((item) => {
    return products.filter((product) => {
      return item === product.name;
    });
  });

  const selectedCustomersId = [];
  const selectedCustomers = [];

  for (const item of arr) {
    for (const dupProduct of isDuplicate) {
      if (item.name === dupProduct) {
        selectedCustomersId.push(item.customers);
      }
    }
  }

  for (const customer of customers) {
    for (const id of selectedCustomersId) {
      if (customer.id === id) {
        selectedCustomers.push(customer);
      }
    }
  }
};

// export const newCollection = () => {
//   let selectedProducts = [];
//   for (const product of products) {
//     for (const purchase of purchases) {
//       if (purchase.productId === product.id) {
//         selectedProducts.push(product);
//       }
//     }
//   }
//   console.log(selectedProducts);
// };

export const findPurchaseByProductId = (idArray) => {
  let arr = [];
  for (const purchase of purchases) {
    for (const id of idArray) {
      if (purchase.productId === id) {
        arr.push(purchase);
      }
    }
  }

  return arr;
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

export const newProduct = (arr, idArray, dates) => {
  let newProduct = {};
  let customer = {};
  let customers = [];

  arr.map((name, index) => {
    customer = {
      name: name,
      date: dates[index],
    };
    customers.push(customer);
  });

  // for (const name of arr) {
  //   for (const date of dates) {
  //     customer = {
  //       name: name,
  //       date: date,
  //     };

  //     customers.push(customer);
  //   }
  // }
  for (const product of products) {
    for (const id of idArray) {
      if (product.id === id) {
        newProduct = {
          ...product,
          customers: customers,
        };
      }
    }
  }
  return newProduct;
};

function hasDuplicates(array) {
  const dup = new Set(array).size !== array.length;
  let isDuplicate;
  if (dup) {
    isDuplicate = array.filter((item, index) => {
      return array.indexOf(item) !== index;
    });
  }

  return isDuplicate;
}

const productIdArray = () => {
  let arr = [];
  for (const purchase of purchases) {
    arr.push(purchase.productId);
  }

  return arr;
};

const ProductsArr = () => {
  const arr = [];
  for (const purchase of purchases) {
    for (const product of products) {
      if (purchase.productId === product.id) {
        const data = {
          ...product,
          customers: purchase.customerId,
          dates: purchase.date,
        };

        arr.push(data);
      }
    }
  }

  for (const item of arr) {
    for (const customer of customers) {
      if (item.customers === customer.id) {
        item.customers = customer.firstName + " " + customer.lastName;
      }
    }
  }
  console.log(arr);
  return arr;
};

const deleteProduct = (idArr, productsArray) => {
  for (const item of productsArray) {
    for (const id of idArr) {
      if (item.id === id) {
        productsArray = productsArray.filter((product) => product.id !== id);
      }
    }
  }
  return productsArray;
};

const createId = (arr) => {
  let index = 1;
  for (const item of arr) {
    item.id = index;
    index++;
  }
  return arr;
};

const dateArr = (dupProducts) => {
  let arr = [];
  for (const purchase of purchases) {
    for (const item of dupProducts) {
      if (purchase.productId === item) {
        arr.push(purchase.date);
      }
    }
  }
  return arr;
};

export const PurchasedProducts = () => {
  const productIdArr = productIdArray();
  const dupProducts = hasDuplicates(productIdArr);
  const dupPurchase = findPurchaseByProductId(dupProducts);
  const a = duplicateProducts(dupPurchase);
  const customersArry = customersArr(a);
  const dates = dateArr(dupProducts);
  const product = newProduct(customersArry, productIdArr, dates);
  const productsArray = ProductsArr();
  const newProductsArray = deleteProduct(dupProducts, productsArray);
  newProductsArray.push(product);
  const finalArray = createId(newProductsArray);

  return finalArray;
};

console.log(PurchasedProducts());
