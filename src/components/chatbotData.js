export const faqData = [
    {
        question: "Hi",
        answer: "👋 Hi there! Welcome to Rental Buddy 🚗✨\n\nI’m here to help you rent vehicles easily and hassle-free. You can ask me about:\n• Available vehicles\n• Rental prices\n• Locations\n• Booking process\n• Documents required\n• Policies & support\n\nJust type your question and I’ll take care of the rest 😊",
        keywords: ["hi", "hello", "hey", "start", "greeting"]
    },
    {
        question: "Who is eligible to rent a vehicle from your platform?",
        answer: "Anyone who is 18 years or older, holds a valid driving license, and can provide proper identification documents is eligible to rent a vehicle from our platform.",
        keywords: ["eligible", "eligibility", "age", "who can rent", "requirements"]
    },
    {
        question: "What documents are required at the time of pickup?",
        answer: "You must present an original or DigiLocker driving license, a college or employee ID, and any valid government-issued ID at the time of pickup.",
        keywords: ["documents", "id", "license", "pickup", "required", "proof"]
    },
    {
        question: "What is the minimum and maximum rental duration?",
        answer: "The minimum rental duration is 1 day, and the maximum rental duration is 15 days for safety and operational reasons.",
        keywords: ["duration", "minimum", "maximum", "time", "how long", "days"]
    },
    {
        question: "Can I extend my rental period after booking?",
        answer: "Yes, rental extensions will soon be available after booking and vehicle pickup, subject to availability.",
        keywords: ["extend", "extension", "longer", "booking"]
    },
    {
        question: "Is there an extra charge for early pickup or late drop?",
        answer: "Early pickup up to 2–3 hours is free. Late drops are charged ₹50 per hour beyond the scheduled drop time.",
        keywords: ["extra charge", "early pickup", "late drop", "penalty", "fee"]
    },
    {
        question: "Is there a mileage limit?",
        answer: "Yes, each vehicle has a specified mileage limit. Exceeding this limit will result in additional charges.",
        keywords: ["mileage", "limit", "km", "distance"]
    },
    {
        question: "What happens if the vehicle gets damaged?",
        answer: "The vehicle must be returned in the same condition. Any damages must be repaired or paid for by the customer.",
        keywords: ["damage", "accident", "broken", "scratch", "repair"]
    },
    {
        question: "Are helmets and safety gear provided?",
        answer: "Yes, helmets and safety gear are provided per person per vehicle. Additional gear may be charged extra.",
        keywords: ["helmet", "safety", "gear", "protection"]
    },
    {
        question: "What is your cancellation and refund policy?",
        answer: "A ₹500 cancellation fee applies. The remaining deposit amount will be refunded as per our refund policy.",
        keywords: ["cancellation", "refund", "cancel", "money back"]
    }
];

export const findBestMatch = (input) => {
    const lowerInput = input.toLowerCase();

    // Direct match with keywords
    const match = faqData.find(item =>
        item.keywords.some(keyword => lowerInput.includes(keyword)) ||
        item.question.toLowerCase().includes(lowerInput)
    );

    return match ? match.answer : "I'm not sure about that. Please contact support or try asking differently (e.g., 'documents', 'mileage', 'refund').";
};
