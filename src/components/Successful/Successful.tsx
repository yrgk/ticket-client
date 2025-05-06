import "@lottiefiles/lottie-player";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

import './Successful.css'
import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function Successful() {
    const tg = WebApp;
    const location = useLocation();
    let { title } = location.state;

    useEffect(() => {
        tg.onEvent('mainButtonClicked', function() {
            tg.HapticFeedback.impactOccurred('medium')
            tg.close();
        })

        tg.MainButton.setParams({
            text: `Закрыть`
        });
        tg.MainButton.show();
    }, []);


    return (
        <div className="successful-screen">
            <div className="successful-block">
                <div className="emoji">
                    <DotLottieReact
                        src="/_004_FAST_OUT.json"
                        loop
                        autoplay
                    />
                </div>

                <h1 id='main-text'>Успешно!</h1>
                <h3 id='main-text'>{title}</h3>
                {/* <h3 id='main-text'>Standard</h3> */}
            </div>
        </div>
    )
}

export default Successful