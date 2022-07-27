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
