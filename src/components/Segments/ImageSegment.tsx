import { ImageProps } from "../../types/SegmentProps";
import './ImageSegment.css'

function ImageSegment(props: ImageProps) {
    return (
        <div className="image-segment-block" style={{margin: props.margin}}>
            <img className="image-segment" src={props.url} style={{borderRadius: props.rounding}} alt="" />
        </div>
    )
}

export default ImageSegment;