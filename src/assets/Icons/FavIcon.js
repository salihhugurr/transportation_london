import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function FavIcon({size, color}) {
    return (
        <Svg
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Path
                d="M16.875 3c-1.5 0-2.925.6-3.975 1.65l-.9.9-.825-.825C9 2.475 5.4 2.475 3.225 4.65l-.075.075a5.704 5.704 0 0 0 0 8.1L12 21.75l8.85-8.925a5.704 5.704 0 0 0 0-8.1A5.395 5.395 0 0 0 16.875 3Z"
                fill={color||"#E3BA6A"}
            />
        </Svg>
    );
}

export default FavIcon;