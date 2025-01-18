const PaymentsFetcher = async () => {
    try {
        const req = await fetch('https://admin.raelli.az/api/website/cards/');
        const cards = await req.json();
        return cards;
    } catch (error) {
        console.error("Error fetching cards:", error);
        return null; // Handle error gracefully
    }
};

export default PaymentsFetcher;