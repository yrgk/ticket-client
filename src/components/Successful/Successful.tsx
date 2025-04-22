import "@lottiefiles/lottie-player";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import './Successful.css'
import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Successful() {
    const tg = WebApp;
    const navigate = useNavigate();

    tg.MainButton.show();

    useEffect(() => {
        tg.onEvent('mainButtonClicked', function() {
            tg.HapticFeedback.impactOccurred('light')
            navigate("/ticket/1")
        })
    }, []);

    tg.MainButton.setParams({
        text: `Перейти к билету`
    });

    return (
        <div className="successful-screen">
            <div className="successful-block">
                <div className="emoji">
                    <DotLottieReact
                        src="/small_OUT.json"
                        loop
                        autoplay
                    />
                </div>

                <h1 id='main-text'>Успешно!</h1>
                <h3 id='main-text'>Gorillaz "Humanz Tour" - Concert in Berlin</h3>
                <h3 id='main-text'>Standard</h3>
            </div>
        </div>
    )
}

export default Successful