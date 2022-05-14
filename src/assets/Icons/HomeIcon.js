import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function HomeIcon({size, color}) {
  return (
    <Svg
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="#000"
      xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M3 13h1v7c0 1.103.897 2 2 2h12c1.103 0 2-.897 2-2v-7h1a1 1 0 00.707-1.707l-9-9a1 1 0 00-1.414 0l-9 9A1 1 0 003 13zm9-8.586l6 6V15l.001 5H6v-9.586l6-6z"
        fill={color || '#E3BA6A'}
      />
      <Path
        d="M12 18c3.703 0 4.901-3.539 4.95-3.689l-1.9-.621c-.008.023-.781 2.31-3.05 2.31-2.238 0-3.02-2.221-3.051-2.316l-1.899.627C7.099 14.461 8.297 18 12 18z"
        fill={color || '#E3BA6A'}
      />
    </Svg>
  );
}

export default HomeIcon;
