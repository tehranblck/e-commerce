import { NextRequest, NextResponse } from "next/server";


interface BasketItem {
    product: number;
    quantity: number;
    product_token?: string;
    key?: string;
    size?: number;
    color?: number;
}

interface RequestBody {
    items: BasketItem[];
}

interface ResponseData {
    id: number;
    items: BasketItem[];
    total_price: string;
    redirect_url: string;
}

export async function POST(request: NextRequest) {
    console.log("Payment API request received");

    try {
        const body: RequestBody = await request.json();
        console.log(JSON.stringify(body))

        // Authorization header'ını al
        const authHeader = request.headers.get("authorization");
        console.log('Auth Header:', authHeader);

        if (!authHeader) {
            return NextResponse.json(
                { error: "Authorization required" },
                { status: 401 }
            );
        }

        // API isteği
        const response = await fetch("https://admin.raelli.az/api/shops/basket/create/", {
            method: "POST",
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": authHeader // Authorization header'ını aynen ilet
            },
            body: JSON.stringify(body)
        });
        console.log(response)

        if (!response.ok) {
            console.log('API Error Response:', response.status);
            const errorData = await response.json();
            console.log('Error Data:', errorData);

            return NextResponse.json(
                { error: errorData.message || "Payment failed" },
                { status: response.status }
            );
        }

        const data: ResponseData = await response.json();
        console.log('Success Response:', data);

        return NextResponse.json(data, { status: 201 });

    } catch (error) {
        console.error("Payment API Error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
