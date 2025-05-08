import { useEffect, useState } from 'react';
import './MyProjects.css'
import WebApp from '@twa-dev/sdk';
import { useNavigate } from 'react-router-dom';
import { MyProjectResponse } from '../../types/ProjectProps';
import FetchMyProjects from '../../utils/projectFetches';

function MyProjects() {
    const tg = WebApp;
    const userId = tg.initDataUnsafe.user?.id
    const navigate = useNavigate();
    // const startParam = tg.initDataUnsafe?.start_param ?? "";
    const [projects, setProjects] = useState<MyProjectResponse>()

    useEffect(() => {
        const loadProjects = async () => {
            const data = await FetchMyProjects(userId ?? 0)
            if (data) {
                setProjects(data)
            }
        }
        loadProjects();

        tg.MainButton.setParams({ text: "Новая форма" })
        tg.MainButton.show();

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
                projects ?
                    projects.Forms ?
                        <div className="">
                            <h3 id='project-title-text'>Формы</h3>
                            {projects.Forms.map(
                                project =>
                                    (
                                        <div className="project">
                                            <h4 id='main-text'>{project.title}</h4>
                                            {/* Copy link */}
                                            <h4 id='main-text'>{project.participants_count} / {project.participants_limit} регистраций</h4>
                                        </div>
                                    )
                            )}
                        </div>
                    :
                        <h1>hzhz</h1>

                :
                    <h1>no</h1>
            }
        </div>
    )
}

export default MyProjects;