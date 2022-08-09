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

export const findPurchaseByProductId = (idArray, purchases) => {
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

export const customersArr = (arr, customers) => {
  let array = [];
  if (arr && customers) {
    for (const item of arr) {
      for (const customer of customers) {
        if (item === customer.id) {
          array.push(customer.firstName + " " + customer.lastName);
        }
      }
    }
    return array;
  }
};

export const newProduct = (arr, idArray, dates, products) => {
  let newProduct = {};
  let customer = {};
  let customers = [];
  if (arr) {
    arr.map((name, index) => {
      customer = {
        name: name,
        date: dates[index],
      };
      customers.push(customer);
    });
  }

  console.log(customers);
  if (idArray) {
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
  console.log(isDuplicate);

  return isDuplicate;
}

const productIdArray = (purchases) => {
  let arr = [];
  for (const purchase of purchases) {
    arr.push(purchase.productId);
  }

  return arr;
};

const ProductsArr = (purchases, products, customers) => {
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

const dateArr = (dupProducts, purchases) => {
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

export const PurchasedProducts = (customers, purchases, products) => {
  if (customers && purchases && products) {
    const productIdArr = productIdArray(purchases);
    console.log(productIdArr);
    const dupProducts = hasDuplicates(productIdArr);
    const dupPurchase = findPurchaseByProductId(dupProducts, purchases);
    const a = duplicateProducts(dupPurchase);
    console.log(a);
    const customersArry = customersArr(a, customers);
    console.log(customersArry);
    const dates = dateArr(dupProducts, purchases);
    console.log(dates);
    const product = newProduct(customersArry, dupProducts, dates, products);
    console.log(product);
    const productsArray = ProductsArr(purchases, products, customers);
    const newProductsArray = deleteProduct(dupProducts, productsArray);
    newProductsArray.push(product);
    const finalArray = createId(newProductsArray);

    return finalArray;
  }
};

export const PurchasedProductsList = (customers, purchases, products) => {
  let purchasedProductsArr = [];

  if (purchases && products) {
    for (const purchase of purchases) {
      for (const product of products) {
        if (purchase.productId === product.id) {
          const item = {
            ...product,
            date: purchase.date,
            customers: purchase.customerId,
          };

          purchasedProductsArr.push(item);
        }
      }
    }
  }

  console.log(purchasedProductsArr);
  let purchasedProductsArr2 = [];
  if (customers) {
    for (const item of purchasedProductsArr) {
      for (const customer of customers) {
        if (item.customers === customer.id) {
          const data = {
            ...item,
            customers: customer.firstName + " " + customer.lastName,
          };
          purchasedProductsArr2.push(data);
        }
      }
    }
  }

  console.log(purchasedProductsArr2);
  let purchasedProductsIdArr = [];
  for (const product of purchasedProductsArr2) {
    purchasedProductsIdArr.push(product.id);
  }

  console.log(purchasedProductsIdArr);
  const dupProducts = hasDuplicates(purchasedProductsIdArr);
  console.log(dupProducts);
  let customersArr = [];
  let datesArr = [];
  let totalArr = [];
  let productObj = {};

  if (dupProducts) {
    for (const item of dupProducts) {
      for (const product of purchasedProductsArr2) {
        if (item === product.id) {
          customersArr.push(product.customers);
          datesArr.push(product.date);
          productObj = {
            name: product.name,
            price: product.price,
            quantity: product.quantity,
          };
        }
      }
      const obj = {
        ...productObj,
        customers: customersArr,
        date: datesArr,
      };
      totalArr.push(obj);
      customersArr = [];
      datesArr = [];
    }
  }

  console.log(totalArr);
  let temp = {};
  let tempArr = [];

  for (const product of purchasedProductsArr2) {
    for (const item of dupProducts) {
      if (product.id === item) {
        purchasedProductsArr2 = purchasedProductsArr2.filter(
          (product) => product.id !== item
        );
      }
    }
  }

  console.log(purchasedProductsArr2);

  const mergedArr = purchasedProductsArr2.concat(totalArr);
  console.log(mergedArr);
  const finalArr = createId(mergedArr);
  return finalArr;
};
