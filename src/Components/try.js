import React, { useEffect } from 'react';
import { ZoomMtg } from '@zoomus/websdk';

const Zoom = () => {
  useEffect(() => {
    ZoomMtg.setZoomJSLib(
      'https://dmogdx0jrul3u.cloudfront.net/2.11.0/lib',
      '/av'
    );

    ZoomMtg.preLoadWasm();
    ZoomMtg.prepareJssdk();
    ZoomMtg.init({
      leaveUrl: 'https://zooom-sdk.netlify.app/',
      isSupportAV: true,
      isSupportChat: true,
      success: (success) => {
        console.log(success);
      },
      error: (error) => {
        console.log(error);
      },
      apiKey: 'uA8cT_hiQMmqJeQYwcDZ9g',
      apiSecret: '8h248jPIaXjFhI6srzc0lCNYVz0B5Il6',
    });
  }, []);

  return <div id='zmmtg-root'></div>;
};

export default Zoom;
