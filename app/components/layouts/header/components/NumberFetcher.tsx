const NumberFetcher = async () => {
    try {
        const req = await fetch('https://api.muslimanshop.com/api/website/phone-numbers/');
        const number = await req.json(); // Await the JSON parsing
        return number;
    } catch (error) {
        console.error("Error fetching phone number:", error);
        return null; // Handle error gracefully
    }
};

export default NumberFetcher;