
export const initialState = {
    users: [],
    products: [
        {
            "name": "TechMaster X5000",
            "price": 599.99,
            "description": "The ultimate device for tech enthusiasts and professionals.",
            "category": "Electronics",
            "manufacturer": "TechCo",
            "ratings": 4.5,
            "availability": true,
            "colors": ["Black", "Silver"],
            "sizes": ["Medium", "Large"],
            "features": ["Quad-Core Processor", "4K Display", "Enhanced Connectivity"]
        },
        {
            "name": "InnoGadget Pro",
            "price": 349.99,
            "description": "Stay ahead of the curve with this innovative gadget.",
            "category": "Gadgets",
            "manufacturer": "InnovateTech",
            "ratings": 4.2,
            "availability": false,
            "colors": ["Blue", "Red"],
            "sizes": ["One Size"],
            "features": ["AI Assistant", "Waterproof", "Wireless Charging"]
        },
        {
            "name": "HomeEssentials Blender",
            "price": 79.99,
            "description": "Blend and create delicious recipes with ease.",
            "category": "Home and Kitchen",
            "manufacturer": "HomeEssentials",
            "ratings": 4.7,
            "availability": true,
            "colors": ["Green", "Yellow"],
            "sizes": ["Standard"],
            "features": ["Multiple Speeds", "Easy to Clean"]
        },
        {
            "name": "ProOffice EliteDesk",
            "price": 899.99,
            "description": "Boost your office productivity with this premium workstation.",
            "category": "Office Supplies",
            "manufacturer": "ProOffice",
            "ratings": 4.9,
            "availability": true,
            "colors": ["Black"],
            "sizes": ["Standard"],
            "features": ["High-Performance Processor", "Expandable Memory"]
        },
        {
            "name": "StyleMaster Classic Watch",
            "price": 199.99,
            "description": "Elegance meets functionality in this timeless timepiece.",
            "category": "Fashion",
            "manufacturer": "StyleMaster",
            "ratings": 4.6,
            "availability": true,
            "colors": ["Silver"],
            "sizes": ["One Size"],
            "features": ["Sapphire Crystal", "Automatic Movement"]
        },
        {
            "name": "TechWiz UltraPhone",
            "price": 449.99,
            "description": "Experience the future of communication with the TechWiz UltraPhone.",
            "category": "Electronics",
            "manufacturer": "TechWiz",
            "ratings": 4.3,
            "availability": true,
            "colors": ["Black", "Gray"],
            "sizes": ["Medium", "Large"],
            "features": ["Edge-to-Edge Display", "Dual Camera System"]
        },
        {
            "name": "LuxAuto Prestige",
            "price": 79999.99,
            "description": "Indulge in luxury and style with the LuxAuto Prestige.",
            "category": "Automotive",
            "manufacturer": "LuxAuto",
            "ratings": 4.8,
            "availability": false,
            "colors": ["Black"],
            "sizes": ["Standard"],
            "features": ["Leather Interior", "Advanced Safety Features"]
        },
        {
            "name": "CreateCraft Art Set",
            "price": 59.99,
            "description": "Unleash your artistic potential with the CreateCraft Art Set.",
            "category": "Art and Craft",
            "manufacturer": "CreateCraft",
            "ratings": 4.4,
            "availability": true,
            "colors": ["Assorted"],
            "sizes": ["Standard"],
            "features": ["Wide Color Variety", "High-Quality Materials"]
        },
        {
            "name": "SportEssentials Yoga Mat",
            "price": 29.99,
            "description": "Elevate your yoga practice with the SportEssentials Yoga Mat.",
            "category": "Sports and Outdoors",
            "manufacturer": "SportEssentials",
            "ratings": 4.0,
            "availability": true,
            "colors": ["Purple", "Blue"],
            "sizes": ["Standard"],
            "features": ["Non-Slip Surface", "Easy to Carry"]
        },
        {
            "name": "TechInnovate QuantumVR",
            "price": 1299.99,
            "description": "Embark on a journey of immersive virtual reality with TechInnovate QuantumVR.",
            "category": "Technology",
            "manufacturer": "TechInnovate",
            "ratings": 4.7,
            "availability": true,
            "colors": ["White", "Black"],
            "sizes": ["Standard"],
            "features": ["4K Display", "360-Degree Tracking"]
        }
    ],
    category: [
        "Electronics",
        "Gadgets",
        "Home and Kitchen",
        "Office Supplies",
        "Fashion",
        "Electronics",
        "Automotive",
        "Art and Craft",
        "Sports and Outdoors",
        "Technology"
    ],
    to_do:[
        {
          id: 1,
          task: "Buy groceries",
          completed: false
        },
        {
          id: 2,
          task: "Finish homework",
          completed: true
        },
        {
          id: 3,
          task: "Go for a run",
          completed: false
        },
        {
          id: 4,
          task: "Call mom",
          completed: false
        },
        {
          id: 5,
          task: "Read a book",
          completed: true
        },
      ],
    contactMails: [
        {
            "name": "Alice",
            "email": "alice@example.com",
            "message": "Hi there, I'm interested in your products."
        },
        {
            "name": "Bob",
            "email": "bob@example.com",
            "message": "Hello, I have a question about your services."
        },
        {
            "name": "Charlie",
            "email": "charlie@example.com",
            "message": "Hey, I wanted to provide feedback on your website."
        },
        {
            "name": "David",
            "email": "david@example.com",
            "message": "Hi, can you tell me more about your pricing?"
        },
        {
            "name": "Eve",
            "email": "eve@example.com",
            "message": "Hello, I'm looking for assistance with my account."
        },
        {
            "name": "Frank",
            "email": "frank@example.com",
            "message": "Hey there, I'm having trouble logging in."
        },
        {
            "name": "Grace",
            "email": "grace@example.com",
            "message": "Hi, I'd like to change my subscription plan."
        },
        {
            "name": "Hannah",
            "email": "hannah@example.com",
            "message": "Hello, do you offer any customization options?"
        }
    ],
    placed_orders: [
        {
            id: 1,
            customer: "Alice",
            products: [
                { name: "TechMaster X5000", quantity: 2 },
                { name: "InnoGadget Pro", quantity: 1 }
            ],
            total: 1199.96,
            status: "Pending"
        },
        {
            id: 2,
            customer: "Bob",
            products: [
                { name: "HomeEssentials Blender", quantity: 3 },
                { name: "TechMaster X5000", quantity: 1 }
            ],
            total: 849.96,
            status: "Shipped"
        },
        {
            id: 3,
            customer: "Charlie",
            products: [
                { name: "InnoGadget Pro", quantity: 2 },
                { name: "ProOffice EliteDesk", quantity: 2 }
            ],
            total: 949.97,
            status: "Delivered"
        },
        {
            id: 4,
            customer: "David",
            products: [
                { name: "StyleMaster Classic Watch", quantity: 1 },
                { name: "CreateCraft Art Set", quantity: 2 }
            ],
            total: 309.97,
            status: "Pending"
        },
        {
            id: 5,
            customer: "Eve",
            products: [
                { name: "LuxAuto Prestige", quantity: 1 }
            ],
            total: 79999.99,
            status: "Shipped"
        },
        {
            id: 6,
            customer: "Frank",
            products: [
                { name: "ProOffice EliteDesk", quantity: 1 },
                { name: "HomeEssentials Blender", quantity: 1 },
                { name: "TechMaster X5000", quantity: 3 }
            ],
            total: 2279.94,
            status: "Delivered"
        }
    ],
    lengths: {
        farmers: 0,
        corporates: 0,
        consumers: 0
    },
    drawer: true
}
const reducer = (state, action) => {
    var type = action.type
    switch (type) {
        case "SET_USERS":
            return { ...state, users: action.data }
        case "SET_CATE_LIST":
            return { ...state, category: action.data }
        case "SET_VIDEOS":
            return { ...state, videos: action.data }
        case "SET_USER_DATA":
            return { ...state, user: { ...state.user, userData: action.data } }
        case "SET_USER_CART":
            return { ...state, user: { ...state.user, userCart: action.data } }
        case "SET_FARMER_DATE":
            return { ...state, farmerData: action.data }
        case "SET_BRANDS":
            return { ...state, brands: action.data }
        case "SET_ITEM_TO_VERIFY":
            return { ...state, itemToVerify: action.data }
        case "SET_ALL_USERS_DATA":
            return { ...state, allUsersData: action.data }
        case "SET_DRAWER":
            return { ...state, drawer: action.data }
        case "SET_PLACED_ORDERS":
            return { ...state, placed_orders: action.data }
        case "SET_LENGTHS":
            return { ...state, lengths: action.data }
        case "SET_CROPS":
            return { ...state, crops: action.data }
        default:
            return state
    }
}
export default reducer
