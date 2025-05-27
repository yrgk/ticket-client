import WebApp from '@twa-dev/sdk';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MyProjectResponse } from '../../types/ProjectProps';
import FetchMyProjects from '../../utils/projectFetches';
import './MyProjects.css';
import Loading from '../Loading/Loading';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

function MyProjects() {
    const tg = WebApp;
    const location = useLocation();
    const userId = tg.initDataUnsafe.user?.id
    // const userId = 5867
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true)
    const [projects, setProjects] = useState<MyProjectResponse>()

    const onBack = () => {
        tg.HapticFeedback.impactOccurred('medium');
        tg.MainButton.hide();
        tg.BackButton.hide();
        navigate(-1);
    }

    const onProjectclick = (projectId: string) => {
        tg.HapticFeedback.impactOccurred('medium');
        tg.MainButton.hide();
        navigate(`project/${projectId}`);
    }

    useEffect(() => {
        const loadProjects = async () => {
            const data = await FetchMyProjects(userId ?? 0)
            if (data) {
                setProjects(data)
            }
            setIsLoading(false)
        }
        loadProjects();

        tg.MainButton.setParams({ text: "Новое событие" })
        tg.MainButton.show();

        if (location.state && location.state.fromOtherPage) {
            tg.BackButton.show();
            tg.MainButton.setText("Назад")
            tg.onEvent('backButtonClicked', onBack);

        }

        const onClick = () => {
            tg.HapticFeedback.impactOccurred('medium');
            tg.MainButton.hide();
            navigate("/form/create")
        }

        tg.onEvent('mainButtonClicked', onClick)
        return () => {
            tg.offEvent('mainButtonClicked', onClick);
        };
    }, [])

    return (
        <div className="my-projects-screen">
            {
                isLoading ?
                    <></>
                :
                    projects ?
                        projects.Forms ?
                            <div className="my-projects-block">

                                <div className="choose-org">
                                    <h3 id='main-text'>Super Events ✨</h3>
                                </div>

                                {/* Block at the top of page with revenue */}
                                <div className="my-projects-revenue">
                                    <div style={{height: "40px"}}></div>
                                    <h1 id='main-text'>1 286 507₽</h1>
                                    {/* <h4 id='main-text'>Общий доход</h4> */}

                                    <div style={{height: "30px"}}></div>

                                    <div className='stat-selector'>
                                        <h4 id='main-text' style={{backgroundColor: 'var(--tg-theme-secondary-bg-color)', borderRadius: '15px'}}>Сегодня</h4>
                                        <h4 id='main-text'>Неделя</h4>
                                    </div>

                                    <div style={{height: "10px"}}></div>


                                    <div className="all-stats">
                                        <div className="main-stat">
                                            <h4 id="main-text">Доход</h4>
                                            <h4 id="main-text">11 084₽</h4>
                                        </div>

                                        <div className="vr"></div>

                                        <div className="main-stat">
                                            <h4 id="main-text">Регистраций</h4>
                                            <h4 id="main-text">68</h4>
                                        </div>

                                    </div>

                                    <div style={{height: "20px"}}></div>
                                </div>

                                <h3 id='project-title-text'>События</h3>
                                {projects.Forms.map(
                                    project =>
                                        (
                                            <div
                                                className="project"
                                                onClick={() => onProjectclick(project.public_id)}
                                            >
                                                <h4 id='main-text'>{project.title}</h4>
                                                {/* Copy link */}
                                                {
                                                    project.participants_limit == 0 ?
                                                        <h5 id='main-text'>{project.participants_count} регистраций</h5>
                                                        :
                                                        <h5 id='main-text'>{project.participants_count} / {project.participants_limit} регистраций</h5>
                                                }
                                            </div>
                                        )
                                )}
                            </div>
                        :
                            <div className='not-yet'>
                                <div className="not-yet-block">
                                    <DotLottieReact
                                        className='image-check'
                                        src="/_DUCK16_HEY_OUT.json"
                                        loop
                                        autoplay
                                        />
                                    <h3 id='main-text'>Здесь пока ничего нет</h3>
                                </div>
                            </div>

                    :
                       <div className='not-yet'>
                            <div className="not-yet-block">
                                <DotLottieReact
                                    className='image-check'
                                    src="/_DUCK16_HEY_OUT.json"
                                    loop
                                    autoplay
                                    />
                                <h3 id='main-text'>Здесь пока ничего нет</h3>
                            </div>
                        </div>
            }
        </div>
    )
}

export default MyProjects;