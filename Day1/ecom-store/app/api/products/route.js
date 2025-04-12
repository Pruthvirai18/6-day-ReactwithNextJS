export async function GET(request) {
    const products = [
        {
            id: 1,
            title: "Boat Earbuds",
            desc: "Earbuds are basically a pair of tiny speakers that you wear inside your ears.",
            image: "boat.jpg"
        },
        {
            id: 2,
            title: "Sony Headphones",
            desc: "High-quality over-ear headphones with noise cancellation for immersive sound.",
            image: "sonyheadphones.jpg"
        },
        {
            id: 3,
            title: "JBL Bluetooth Speaker",
            desc: "Portable Bluetooth speaker with deep bass and long battery life.",
            image: "jblspeaker.jpg"
        }
    ];
    
    return new Response(JSON.stringify(products), {
        status: 200
    });
}
