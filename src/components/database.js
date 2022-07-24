
export const products = [
    {
        id: 1,
        name: "Skirt",
        price: 90,
        quantity: 3
    },
    {
        id: 2,
        name: "Skinny Jeans",
        price: 150,
        quantity: 5
    },
    {
        id: 3,
        name: "Black Boots",
        price: 200,
        quantity: 4
    },
    {
        id:4,
        name: "Denim Shorts",
        price: 80,
        quantity: 2
    },
    {
        id: 5,
        name: "Dress",
        price: 100,
        quantity: 9
    }
]


export const customers = [
    {
        id: 1,
        firstName: "Shir",
        lastName: "Falcon",
        city: "Beer Sheva"

    },
    {
        id: 2,
        firstName: "Tal",
        lastName: "Cohen",
        city: "Tel Aviv"
    },
    {
        id: 3,
        firstName: "Yael",
        lastName: "Volinsky",
        city: "Rehovot"
    },
    {
        id: 4,
        firstName: "Eden",
        lastName: "Sulimani",
        city: "Dimona"
    }
]

export const purchases = [
    {
        id: 1,
        customerId: 1,
        productId: 3,
        date: new Date("2022-02-14")
    },
    {
        id: 2,
        customerId: 4,
        productId: 4,
        date: new Date("2022-04-20")
    },
    {
        id: 3,
        customerId: 2,
        productId: 5,
        date: new Date("2022-06-30")
    }

]