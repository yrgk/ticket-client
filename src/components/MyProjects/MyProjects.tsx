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
    })

    return (
        <div className="my-projects-screen">
            {
                isLoading ?
                    <Loading/>
                :
                    projects ?
                        projects.Forms ?
                            <div className="">
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