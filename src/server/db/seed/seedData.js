const users = [
    {
        first_name: "Emily",
        last_name: "Jonhson",
        email: "emily@example.com",
        password: "securepass",
    },
    {
        first_name: "Lui",
        last_name: "Wei",
        email: "liu@example.com",
        password: "strongpass",
    },
    {
        first_name: "Isabella",
        last_name: "Garcia",
        email: "bella@example.com",
        password: "pass1234",
    },

    // Add more user objects as needed
];

const products = [
    {
        name: "Cloud Monster",
        description: "Featuring our biggest CloudTec® ever for massive cushioning and max energy. A monster of a ride on the road.",
        price: "102.99",
        image_url:
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c2hvZXxlbnwwfHwwfHx8MA%3D%3D",
    },

    {
        name: "The Mav",
        description:
            "The Mav is a nod to innovation. Its cutting-edge features and futuristic design make it a conversation starter, capturing attention and admiration wherever you go. Elevate your footwear game with the Mav – where style, comfort, and innovation converge to create a shoe that stands out in a crowd.",
        price: "199.99",
        image_url: "https://www.andysowards.com/blog/assets/cg-video-cool-shoes-animation.jpeg",
    },
];

module.exports = {
    users,
    products,
};
