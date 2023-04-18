import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.11.0/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

function Zoom() {
  const authEndpoint = 'http://localhost:4000';
  const sdkKey = process.env.REACT_APP_ZOOM_API_KEY;
  const meetingNumber = process.env.REACT_APP_MEETING_NUMBER;
  const passWord = process.env.REACT_APP_MEETING_PASSWORD;
  const role = 0;
  const userName = 'Onur';
  const userEmail = '';
  const registrantToken = '';
  const zakToken = '';
  const leaveUrl = 'http://localhost:3000';

  function getSignature(e) {
    e.preventDefault();

    fetch(authEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        startMeeting(response.signature);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block';

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signature: signature,
          sdkKey: sdkKey,
          meetingNumber: meetingNumber,
          passWord: passWord,
          userName: userName,
          userEmail: userEmail,
          tk: registrantToken,
          zak: zakToken,
          success: (success) => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  return (
    <div className='App'>
      <main>
        <button onClick={getSignature}>Join Meeting</button>
      </main>
    </div>
  );
}

export default Zoom;
