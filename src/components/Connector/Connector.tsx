import WebApp from "@twa-dev/sdk";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Connector() {
    const tg = WebApp;
    const userId = tg.initDataUnsafe.user?.id
    const navigate = useNavigate();
    const startParam = tg.initDataUnsafe?.start_param ?? "";

    useEffect(() => {
        if (startParam) {
            const startData = startParam.split("_");

            switch (startData[0]) {
                case "form":
                    navigate(`/form/${startData[1]}`);
                    break;
                case "ticket":
                    navigate(`/ticket/${startData[1]}?user_id=${userId}`);
                    break;
                case "check":
                    navigate(`/ticket/check/${startData[1]}`);
                    break;
                default:
                    break;
            }

        }

        // navigate("/main")

    }, [navigate, startParam]);

    return (
        <>
            <h1>Connector</h1>
            <h1>{startParam}</h1>
            <h1>{userId}</h1>
        </>
    )
}

export default Connector;