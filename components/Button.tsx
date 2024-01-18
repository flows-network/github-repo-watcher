import React, {useState} from "react";
import Lottie from "react-lottie";
import roundLoading from "../media/roundLoading.json";

interface ButtonProps {
    onClick: (e?: React.MouseEvent<HTMLButtonElement>) => Promise<void> | void;
    className?: string;
    disabled?: boolean;
    type?: string;
    size?: "small" | undefined;
    notRounded?: boolean;
    loading?: boolean;
    text?: string;
    children?: React.ReactNode;
}

export default function Button(props: ButtonProps) {
    const {onClick, className, disabled, type, size, notRounded, loading, text, children} = props
    const [buttonState, setButtonState] = useState(true)
    const [loadingState, setLoadingState] = useState(false)

    const buttonFunc = async (e: React.MouseEvent<HTMLButtonElement>) => {
        setButtonState(false)
        setLoadingState(true)
        try {
            await onClick(e)
            setButtonState(true)
            setLoadingState(false)
        } catch (e) {
            setButtonState(true)
            setLoadingState(false)
        }
    }

    return (<div className="relative">
        <button
            className={"flex justify-center items-center select-none " + (type && !disabled ? type : "border cursor-not-allowed") + (className ? " " + className : "") + (loadingState ? " cursor-not-allowed" : "") + (notRounded ? "" : " rounded")}
            onClick={(e) => disabled ? {} : (buttonState ? buttonFunc(e) : {})}>
            {loadingState || loading ?
                <Lottie width={size === "small" ? "1rem" : "2rem"}
                        height={size === "small" ? "1rem" : "2rem"} options={{
                    loop: true,
                    autoplay: true,
                    rendererSettings: {preserveAspectRatio: 'xMidYMid slice'},
                    animationData: roundLoading
                }}/>
                : <></>}
            {children ? children : text}
        </button>
    </div>)
}