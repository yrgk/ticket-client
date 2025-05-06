import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function Loading() {
    return (
        <div className="check-screen">
            <div className="image-block">
                <DotLottieReact
                    className='image-check'
                    src="/_DUCK4_THINK_OUT.json"
                    loop
                    autoplay
                />
            </div>

        </div>
    )
}

export default Loading;