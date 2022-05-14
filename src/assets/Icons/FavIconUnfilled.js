import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function FavIconUnfilled({size, color}) {
    return (
        <Svg
            width={size || 24}
            height={size || 24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Path
                d="M16.837 4.5a4.102 4.102 0 0 1 2.933 1.23 4.275 4.275 0 0 1 0 6L12 19.597 4.23 11.73a4.275 4.275 0 0 1 0-6 4.11 4.11 0 0 1 5.865 0L12 7.68l1.898-1.935a4.08 4.08 0 0 1 2.94-1.245Zm0-1.5a5.603 5.603 0 0 0-4.005 1.68L12 5.52l-.832-.84a5.618 5.618 0 0 0-8.01 0 5.79 5.79 0 0 0 0 8.115L12 21.75l8.843-8.955a5.79 5.79 0 0 0 0-8.115A5.618 5.618 0 0 0 16.837 3Z"
                fill={color||"#E3BA6A"}
            />
        </Svg>
    );
}

export default FavIconUnfilled;