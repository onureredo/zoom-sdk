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
      leaveUrl: 'http://localhost:3000',
      isSupportAV: true,
      success: (success) => {
        console.log(success);
      },
      error: (error) => {
        console.log(error);
      },
      apiKey: process.env.REACT_APP_API_KEY,
      apiSecret: process.env.REACT_APP_API_SECRET,
    });
  }, []);

  return <div id='zmmtg-root'></div>;
};

export default Zoom;
