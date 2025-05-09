import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import './Project.css'

function Project() {
    return (
        <div className='project-screen'>
            <DotLottieReact
                className='image-check'
                src="/_DUCK14_MONEY_OUT.json"
                loop
                autoplay
            />

            <div className='project-title-block'>
                <h2 id='project-main-text'>Мастер класс по жарке стейка рибай</h2>
            </div>

            {/* Separator */}
            <div style={{height: "20px"}}></div>

            <h4 id='main-text'>Продажи</h4>

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

            <h4 id='main-text'>Выручка</h4>
            {/* День и неделя */}

            <h4 id='main-text'>Общая выручка с проекта</h4>
            {/* График роста */}

            <h4 id='main-text'>Регистрации</h4>
            {/* График по количеству регистраций */}

        </div>
    )
}

export default Project;