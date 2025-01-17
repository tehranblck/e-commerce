"use client"
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

const ChatWindow = () => {
    const [chatHistory, setChatHistory] = useState<{ message: string, isUser: boolean }[]>([]);
    const [message, setMessage] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const chatEndRef = useRef<HTMLDivElement | null>(null);
    const chatWindowRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isOpen) {
                setIsOpen(true);
                setChatHistory(prevHistory => [...prevHistory, { message: "🛍️ Salam! 👋 Xoş gəlmisiniz! Sizə necə kömək edə bilərəm? Zəhmət olmasa bir sual verin və ya aşağıdan ən çox verilən suallarımızı seçin. 😊", isUser: false }]);
            }
        }, 10000);
        return () => clearTimeout(timer);
    }, [isOpen]);

    const questionsAndAnswers = [
        { question: "Çatdırılma müddəti nə qədərdir?", answer: "Sifarişləriniz adətən 1-3 iş günü ərzində kargoya verilir. Xüsusi günlərdə sıxlıq səbəbindən müddət uzana bilər. 📞 Daha ətraflı məlumat üçün WhatsApp ilə əlaqə saxlayın! (📩 WhatsApp ilə Dəstək Al düyməsi)" },
        { question: "Məhsullarınızın ölçüləri necədir?", answer: "Məhsullarımızın ölçüləri məhsul səhifələrində ətraflı şəkildə göstərilmişdir. Zəhmət olmasa ölçü cədvəlini yoxlayın." },
        { question: "Geri qaytarma və dəyişdirmə şərtləri nələrdir?", answer: "Geri qaytarma və dəyişdirmə əməliyyatları üçün 30 gün müddətiniz var. Ətraflı məlumat üçün müştəri xidmətlərimizə müraciət edin." },
        { question: "Ödəniş üsulları nələrdir?", answer: "Kredit kartı, bank köçürməsi və qapıda ödəniş seçimlərimiz mövcuddur." },
        { question: "Stokda olmayan məhsulları yenidən gətirəcəksinizmi?", answer: "Stokda olmayan məhsullar üçün tələb yarada bilərsiniz. Məhsul stoka daxil olduqda sizə bildiriş göndəriləcəkdir." }
    ];

    const handleSendMessage = () => {
        if (message.trim() !== "") {
            setChatHistory(prevHistory => [...prevHistory, { message, isUser: true }]);
            setMessage("");
            setIsTyping(true);
            setTimeout(() => {
                setChatHistory(prevHistory => [...prevHistory, { message: "🤔 Bu suallardan birinə cavab axtarırsınız? 📌 Zəhmət olmasa aşağıdan bir seçim edin:", isUser: false }, ...questionsAndAnswers.map(qa => ({ message: qa.question, isUser: false }))]);
                setIsTyping(false);
            }, 1000);
        }
    };

    const handleQuestionClick = (question: string, answer: string) => {
        setChatHistory(prevHistory => [...prevHistory, { message: question, isUser: true }]);
        setIsTyping(true);
        setTimeout(() => {
            setChatHistory(prevHistory => [...prevHistory, { message: answer, isUser: false }]);
            setIsTyping(false);
        }, 1000);
    };

    const renderChatBubbles = () => {
        return chatHistory.map((chat, index) => (
            <div key={index} className={`p-3 pr-3 w-full mb-2 rounded-xl ${chat.isUser ? 'bg-blue-500 text-white text-left' : 'bg-gray-200 dark:bg-gray-700 text-right'}`}>
                {!chat.isUser && questionsAndAnswers.some(qa => qa.question === chat.message) ? (
                    <button onClick={() => handleQuestionClick(chat.message, questionsAndAnswers.find(qa => qa.question === chat.message)?.answer || '')} className="text-blue-500  hover:underline">
                        {chat.message}
                    </button>
                ) : (
                    chat.message
                )}
            </div>
        ));
    };

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chatHistory]);

    const toggleChatWindow = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (isOpen) {
            gsap.to(chatWindowRef.current, { scale: 1, duration: 0.5, ease: 'power2.out' });
        } else {
            gsap.to(chatWindowRef.current, { scale: 0, duration: 0.5, ease: 'power2.in' });
        }
    }, [isOpen]);

    return (
        <>
            {isOpen ? (
                <div ref={chatWindowRef} style={{ zIndex: 9999 }} className="chat-window flex flex-col justify-between fixed bottom-4 right-4 bg-white dark:bg-gray-900 shadow-xl rounded-lg p-6 w-[28rem] min-h-[36rem] ">
                    <div className="flex justify-between items-center border-b pb-2 mb-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Çat Pəncərəsi</h2>
                        <button onClick={toggleChatWindow} className="text-red-500 hover:text-gray-700 text-4xl dark:hover:text-gray-300">✖</button>
                    </div>
                    <div className="chat-bubbles mt-4 space-y-3 w-full max-h-[24rem] pr-6 overflow-y-auto">
                        {renderChatBubbles()}
                        {isTyping && (
                            <div className="typing-indicator text-gray-500 text-sm">Cavab yazılır...</div>
                        )}
                        <div ref={chatEndRef} />
                    </div>
                    <div className="flex flex-col ">
                        <div className="flex space-x-2 mt-4">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Mesajınızı yazın..."
                                className="flex-grow p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                            />
                            <button onClick={handleSendMessage} className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300">
                                Göndər
                            </button>

                        </div>
                        <button onClick={() => window.open('https://wa.me/994997301998', '_blank')} className="bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 mt-3 transition duration-300">
                            WhatsApp ilə Dəstək Al
                        </button>
                        <button onClick={() => setChatHistory([])} className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 mt-3 transition duration-300">
                            Təmizlə
                        </button>
                    </div>

                </div>
            ) : (
                <div className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-4 cursor-pointer" onClick={toggleChatWindow}>
                    Çat Aç
                </div>
            )}
        </>
    );
};

export default ChatWindow;