import { useState, useEffect } from 'react';

const AutoChanger = ({elements, frequency}) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((currentIndex + 1) % elements.length);
        }, frequency);

        // Clean up interval on unmount
        return () => clearInterval(interval);
    }, [currentIndex, elements.length, frequency]);

    return (
        <div>
            {elements[currentIndex]}
        </div>
    );
}

export default AutoChanger;