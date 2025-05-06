import WebApp from '@twa-dev/sdk';
import './Event.css'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// import ImageSegment from '../Segments/ImageSegment';
// import TextSegment from '../Segments/TextSegment';

function Event() {
    const tg = WebApp;
    const navigate = useNavigate();

    tg.MainButton.show();

    // const response = [
    //         {
    //           "type": "image",
    //           "url": "https://drupal-prod.visitcalifornia.com/sites/default/files/styles/opengraph_1200x630/public/2023-05/VC_Music-Festivals_Outside-Lands_SUPPLIED_1280x640.jpg.webp?itok=ehtxDYFF",
    //           "subtitle": "Главное музыкальное событие этого лета",
    //           "alignment": "center",
    //           // "margin": "5%",
    //           // "rounding": "5px",
    //           "background_color": "#000000"
    //         },
    //         {
    //           "type": "text",
    //           "text": "Summer Sound Festival 2025 – это три дня живой музыки, лучших артистов и атмосферы свободы!",
    //           "size": "150%",
    //           "weight": 300,
    //           "color": "#FFFFFF",
    //           "background_color": "#1A1A1A"
    //         },
    //         {
    //           "type": "carousel image",
    //           "images": [
    //             {
    //               "url": "https://example.com/stage1.jpg",
    //               "subtitle": "Главная сцена"
    //             },
    //             {
    //               "url": "https://example.com/stage2.jpg",
    //               "subtitle": "Электронная сцена"
    //             },
    //             {
    //               "url": "https://example.com/camping.jpg",
    //               "subtitle": "Зона кемпинга"
    //             }
    //           ],
    //           "color": "#FFD700",
    //           "background_color": "#333333"
    //         },
    //         {
    //           "type": "faq",
    //           "questions": [
    //             {
    //               "question": "Можно ли приносить свою еду?",
    //               "answer": "Нет, но у нас есть фуд-корт с разными кухнями."
    //             },
    //             {
    //               "question": "Есть ли ограничения по возрасту?",
    //               "answer": "Да, вход на фестиваль возможен с 18 лет."
    //             },
    //             {
    //               "question": "Как добраться до фестиваля?",
    //               "answer": "Мы организуем трансфер из центра города."
    //             }
    //           ],
    //           "color": "#000000",
    //           "background_color": "#F5F5F5"
    //         },
    //         {
    //           "type": "location",
    //           "широта": 43.5855,
    //           "долгота": 39.7205,
    //           "адрес": "Сочи, Пляж «Солнечный берег»",
    //           "color": "#FFFFFF",
    //           "background_color": "#1A1A1A"
    //         },
    //         {
    //           "type": "video",
    //           "url": "https://example.com/trailer.mp4",
    //           "title": "Промо фестиваля",
    //           "color": "#FFD700",
    //           "background_color": "#000000"
    //         },
    //         {
    //           "type": "cards",
    //           "cards": [
    //             {
    //               "url": "https://example.com/artist1.jpg",
    //               "title": "DJ BassFlow",
    //               "subtitle": "Лучший электронный сет"
    //             },
    //             {
    //               "url": "https://example.com/artist2.jpg",
    //               "title": "The Neon Lights",
    //               "subtitle": "Синтвейв на закате"
    //             },
    //             {
    //               "url": "https://example.com/artist3.jpg",
    //               "title": "Rock Revival",
    //               "subtitle": "Гитарные риффы и энергия"
    //             }
    //           ],
    //           "color": "#FFFFFF",
    //           "background_color": "#333333"
    //         },
    //         {
    //           "type": "variations",
    //           "tickets": [
    //             {
    //               "title": "Стандарт",
    //               "price": "3000 ₽",
    //               "description": "Доступ на все три дня фестиваля"
    //             },
    //             {
    //               "title": "VIP",
    //               "price": "8000 ₽",
    //               "description": "Отдельная зона, напитки и удобные сиденья"
    //             },
    //             {
    //               "title": "Camping Pass",
    //               "price": "2000 ₽",
    //               "description": "Место в кемпинге для палатки"
    //             }
    //           ],
    //           "color": "#FFD700",
    //           "background_color": "#1A1A1A"
    //         },
    //         // {
    //         //   "type": "Фоновое изображение",
    //         //   "url": "https://example.com/background.jpg"
    //         // }
    //     ]

    useEffect(() => {
        tg.onEvent('mainButtonClicked', function() {
            tg.HapticFeedback.impactOccurred('light')
            navigate("/form/1")
        })
    }, []);

    tg.MainButton.setParams({
        text: `Зарегестрироваться`
    });

    return (
        <>
        <h1>Event</h1>
        {/* {response.map(segment => (
            <h1>{segment.type}</h1>
            {segment.type === "image" && }
        ))} */}
        {/* {response.map(segment => (
            <div key={segment.type}>
                <h1>{segment.type}</h1>
                {segment.type === "image" &&
                    <ImageSegment
                        url={segment.url ?? ""}
                        margin={segment.margin ?? ""}
                        alignment={segment.alignment ?? ""}
                        rounding={segment.rounding ?? ""}
                    />
                }

                {segment.type === "text" &&
                    <TextSegment
                        text={segment.text ?? ""}
                        size={segment.size ?? ""}
                    />
                }

            </div>
        ))} */}
        {/* {response.map(segment => <h1>{segment.type}</h1>)} */}
        </>
    )
}

export default Event