import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './Project.css'
import WebApp from '@twa-dev/sdk';
// import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

function Project() {
    const tg = WebApp;
    // const location = useLocation();
    const navigate = useNavigate();
    // const { projectId } = useParams();

    useEffect(() => {
        tg.BackButton.show();
        tg.onEvent('backButtonClicked', function() {
            tg.BackButton.hide();
            navigate(-1);
        })
    });

    return (
        <div className='project-screen'>
            <DotLottieReact
                className='image-check'
                src="/_DUCK14_MONEY_OUT.json"
                loop
                autoplay
            />

            <div className='project-title-block'>
                <h2 id='project-main-text'>Рассказы А.П. Чехова в театре на воде</h2>
            </div>

            {/* Separator */}
            <div style={{height: "20px"}}></div>

            <div className="all-revenue-block">
                <h1 id='main-text'>286 507₽</h1>
                <h4>Общий доход</h4>
            </div>

            {/* Separator */}
            <div style={{height: "20px"}}></div>

            <h4 id='main-text'>Доход</h4>

            <div style={{height: "5px"}}></div>

            <div className="revenue-block">
                <div className="revenue">
                    <h4 id='main-text'>За день</h4>
                    <h4 id='main-text' className='revenue-text'>6 412₽</h4>
                </div>

                <div className="vr"></div>


                <div className="revenue">
                    <h4 id='main-text'>За неделю</h4>
                    <h4 id='main-text' className='revenue-text'>53 805₽</h4>
                </div>
            </div>


            <div style={{height: "30px"}}></div>

            <h4 id='main-text'>Регистрации</h4>
            {/* График по количеству регистраций */}
            <div className="revenue-block">
                <div className="revenue">
                    <h4 id='main-text'>За день</h4>
                    <h4 id='main-text' className='revenue-text'>8</h4>
                </div>

                <div className="vr"></div>


                <div className="revenue">
                    <h4 id='main-text'>За неделю</h4>
                    <h4 id='main-text' className='revenue-text'>76</h4>
                </div>
            </div>


        </div>
    )
}

export default Project;