import './Hall.css'

interface HallProps {
  rows: number;
  columns: number;
  aisles: number[];
}

function Hall(props: HallProps) {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '5px'
            }}
        >
            {Array.from({ length: props.rows }).map((_, rowIndex) => (
                <div
                    key={rowIndex}
                    style={{
                        display: 'flex',
                        gap: '5px'
                    }}
                >
                    {Array.from({ length: props.columns }).map((_, colIndex) => {
                        const isAisle = props.aisles.includes(colIndex);
                        return (
                            <div
                                key={colIndex}
                                style={{
                                    // width: '30px',
                                    // height: '30px',
                                    borderRadius: '3px',
                                    height: '20px',
                                    aspectRatio: '1/1',
                                    backgroundColor: isAisle ? 'transparent' : '#ccc',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default Hall;
