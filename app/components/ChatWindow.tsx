"use client";
import React, { useState, useEffect, useRef } from 'react';
import { IoSend } from "react-icons/io5";
import { FaRobot } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdOutlineCleaningServices } from "react-icons/md";
import { RiAccountCircleLine } from "react-icons/ri";
import Image from 'next/image';

interface ChatMessage {
    sender: string;
    message: string;
    timestamp: Date;
    isTyping?: boolean;
    questions?: QuestionAnswer[];  // Soru butonları için
}

interface QuestionAnswer {
    id: number;
    question: string;
    answer: string;
}

// Önceden tanımlanmış soru ve cevaplar
const predefinedQuestions: QuestionAnswer[] = [
    {
        id: 1,
        question: "Çatdırılma müddəti nə qədərdir?",
        answer: "Sifarişləriniz adətən 1-3 iş günü ərzində kargoya verilir. Xüsusi günlərdə sıxlıq səbəbindən müddət uzana bilər. 📞 Daha ətraflı məlumat üçün WhatsApp ilə əlaqə saxlayın! (📩 WhatsApp ilə Dəstək Al düyməsi)"
    },
    {
        id: 2,
        question: "Məhsullarınızın ölçüləri necədir?",
        answer: "Məhsullarımızın ölçüləri məhsul səhifələrində ətraflı şəkildə göstərilmişdir. Zəhmət olmasa ölçü cədvəlini yoxlayın."
    },
    {
        id: 3,
        question: "Geri qaytarma və dəyişdirmə şərtləri nələrdir?",
        answer: "Geri qaytarma və dəyişdirmə əməliyyatları üçün 30 gün müddətiniz var. Ətraflı məlumat üçün müştəri xidmətlərimizə müraciət edin."
    },
    {
        id: 4,
        question: "Ödəniş üsulları nələrdir?",
        answer: "Kredit kartı, bank köçürməsi və qapıda ödəniş seçimlərimiz mövcuddur."
    },
    {
        id: 5,
        question: "Stokda olmayan məhsulları yenidən gətirəcəksinizmi?",
        answer: "Stokda olmayan məhsullar üçün tələb yarada bilərsiniz. Məhsul stoka daxil olduqda sizə bildiriş göndəriləcəkdir."
    }
];

const ChatBot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [userMessage, setUserMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<null | HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const isMobile = window.innerWidth < 768; // 768px'den küçük ekranları mobil olarak kabul ediyoruz

        if (isMobile && isOpen) {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.width = '100%';
        } else {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        }

        return () => {
            document.body.style.overflow = '';
            document.body.style.position = '';
            document.body.style.width = '';
        };
    }, [isOpen]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            setIsOpen(true);
            await simulateTyping("Salam! Raelli`yə  xoş gəlmisiniz! Sizə necə kömək edə bilərəm? 😊");
            await simulateTyping("Aşağıdakı suallardan birini seçə bilərsiniz 👇", 1000);

            setMessages(prev => [...prev, {
                sender: 'bot',
                message: 'questions',
                timestamp: new Date(),
                questions: predefinedQuestions
            }]);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const simulateTyping = async (message: string, delay = 1500) => {
        setIsTyping(true);
        setMessages(prev => [...prev, { sender: 'bot', message: '...', timestamp: new Date(), isTyping: true }]);

        await new Promise(resolve => setTimeout(resolve, delay));

        setMessages(prev => prev.filter(msg => !msg.isTyping));
        setMessages(prev => [...prev, { sender: 'bot', message, timestamp: new Date() }]);
        setIsTyping(false);
    };

    const handleSendMessage = async () => {
        if (userMessage.trim()) {
            const currentTime = new Date();
            const userMsg = userMessage.trim();
            setMessages(prev => [...prev, {
                sender: 'user',
                message: userMsg,
                timestamp: currentTime
            }]);
            setUserMessage('');

            // Bot yanıtını simüle et
            if (userMsg.toLowerCase().includes('salam')) {
                await simulateTyping("Salam! Necəsiniz? 😊");
                await simulateTyping("Aşağıdakı suallardan birini seçə bilərsiniz 👇", 1000);
            } else if (userMsg.toLowerCase().includes('sağ ol')) {
                await simulateTyping("Dəyməz! Başqa sualınız varsa, buyurun. 🤗");
                await simulateTyping("Aşağıdakı suallardan birini seçə bilərsiniz 👇", 1000);
            } else {
                await simulateTyping("Buyurun, sualınızı seçin:");
            }

            // Her durumda soruları göster
            setMessages(prev => [...prev, {
                sender: 'bot',
                message: 'questions',
                timestamp: new Date(),
                questions: predefinedQuestions
            }]);
        }
    };

    const handleSelectQuestion = async (question: string) => {
        setMessages(prev => [...prev, {
            sender: 'user',
            message: question,
            timestamp: new Date()
        }]);

        const selectedAnswer = predefinedQuestions.find(qa => qa.question === question)?.answer;
        if (selectedAnswer) {
            await simulateTyping(selectedAnswer);
            await simulateTyping("Başqa sualınız varsa, aşağıdakılardan seçə bilərsiniz 👇", 1000);

            setMessages(prev => [...prev, {
                sender: 'bot',
                message: 'questions',
                timestamp: new Date(),
                questions: predefinedQuestions.filter(q => q.question !== question)
            }]);
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('az-AZ', {
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleClearChat = async () => {
        setMessages([]);
        await simulateTyping("Salam! Raelli Logistics-ə xoş gəlmisiniz! Sizə necə kömək edə bilərəm? 😊");
        await simulateTyping("Aşağıdakı suallardan birini seçə bilərsiniz 👇", 1000);
        setMessages(prev => [...prev, {
            sender: 'bot',
            message: 'questions',
            timestamp: new Date(),
            questions: predefinedQuestions
        }]);
    };

    return (
        <>
            {/* Chat Window */}
            <div className={`fixed z-50 transition-all duration-300 
                ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-[120%] opacity-0'}
                bottom-3 right-3
                sm:bottom-4 sm:right-4 
                lg:bottom-8 lg:right-8
                max-w-[95vw] mx-auto`}
            >
                <div className="w-full xs:w-[320px] md:w-[380px] flex flex-col rounded-2xl shadow-lg dark:shadow-indigo-500/20 overflow-hidden">
                    {/* Header */}
                    <div className="bg-yellow-400 dark:bg-[#1f1f1f] p-2 sm:p-3 flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Image src="/chat.png" className='rounded-full ' alt="logo" width={48} height={48} />
                            <span className="font-medium text-xs sm:text-sm text-black dark:text-white">Dəstək</span>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-black dark:text-white p-1 sm:p-1.5 rounded-lg hover:bg-yellow-500/20 dark:hover:bg-gray-800"
                        >
                            <IoClose size={18} className="sm:w-5 sm:h-5" />
                        </button>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 h-[40vh] xs:h-[45vh] sm:h-[50vh] md:h-[400px] 
                        max-h-[60vh] sm:max-h-[65vh] md:max-h-[500px] 
                        bg-[#121212] 
                        p-2 xs:p-3 sm:p-4 
                        overflow-y-auto">
                        <div className="space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                                    <div className={`p-3 rounded-2xl max-w-[85%] relative ${msg.sender === 'bot'
                                        ? 'bg-gray-100 dark:bg-[#1f1f1f] text-black dark:text-white'
                                        : 'bg-yellow-400 dark:bg-indigo-600 text-black dark:text-white'
                                        }`}>
                                        {msg.isTyping ? (
                                            <div className="flex space-x-2">
                                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                                            </div>
                                        ) : msg.message === 'questions' ? (
                                            <div className="space-y-2">
                                                {msg.questions?.map((qa: QuestionAnswer) => (
                                                    <button
                                                        key={qa.id}
                                                        onClick={() => handleSelectQuestion(qa.question)}
                                                        className="w-full text-left p-2 rounded-lg text-sm
                                                            bg-gray-50 dark:bg-[#181818] 
                                                            text-gray-700 dark:text-gray-200
                                                            hover:bg-gray-100 dark:hover:bg-[#232323]
                                                            border border-gray-200 dark:border-gray-700
                                                            transition-colors duration-200"
                                                    >
                                                        {qa.question}
                                                    </button>
                                                ))}
                                            </div>
                                        ) : (
                                            <>
                                                {msg.message}
                                                <div className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">
                                                    {formatTime(msg.timestamp)}
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="bg-[#1f1f1f] p-2 xs:p-3 sm:p-4">
                        <div className="flex items-center space-x-1 xs:space-x-2">
                            <input
                                type="text"
                                value={userMessage}
                                onChange={(e) => setUserMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder="Mesajınızı daxil edin..."
                                className="flex-1 p-2 sm:p-2.5 text-xs sm:text-sm rounded-lg
                                    bg-gray-50 dark:bg-[#181818]
                                    text-gray-700 dark:text-gray-200
                                    border border-gray-200 dark:border-gray-700
                                    focus:outline-none focus:ring-2 focus:ring-yellow-400 dark:focus:ring-indigo-500"
                            />
                            <button
                                onClick={handleClearChat}
                                className="p-2 sm:p-2.5 rounded-lg bg-gray-100 dark:bg-[#232323] text-gray-700 dark:text-gray-300
                                    hover:bg-gray-200 dark:hover:bg-[#2a2a2a] transition-colors duration-200"
                                title="Söhbəti təmizlə"
                            >
                                <MdOutlineCleaningServices size={16} className="sm:w-5 sm:h-5" />
                            </button>
                            <button
                                onClick={handleSendMessage}
                                className="p-2 sm:p-2.5 rounded-lg bg-yellow-400 dark:bg-indigo-600 text-black dark:text-white
                                    hover:bg-yellow-500 dark:hover:bg-indigo-700 transition-colors duration-200"
                            >
                                <IoSend size={16} className="sm:w-5 sm:h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={`fixed z-50 
                    bottom-2 right-2 
                    sm:bottom-4 sm:right-4 
                    lg:bottom-8 lg:right-8
                     rounded-full 
                    bg-yellow-400 dark:bg-indigo-600
                    text-black dark:text-white
                    shadow-lg hover:shadow-xl
                    transition-all duration-300 ease-in-out
                    hover:scale-110
                    ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}`}
                title="Elxan E. ilə söhbət"
            >
                <div className="relative p-2">
                    <Image src="/chat_small.png" className='rounded-full ' alt="logo" width={50} height={50} />
                    <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full animate-pulse" />
                </div>
            </button>
        </>
    );
};

export default ChatBot;