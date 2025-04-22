import { TextProps } from "../../types/SegmentProps";

function TextSegment(props: TextProps) {
    return (
        <p style={{
            fontSize: props.size,
            fontWeight: 600,
            fontFamily: "Georgia"
        }}>{
            props.text
        }</p>
    )
}

export default TextSegment;