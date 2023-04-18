import { ZoomMtg } from '@zoomus/websdk';

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.11.0/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

function Sample() {
  const authEndpoint =
    'https://zoom.us/oauth/authorize?response_type=code&client_id=uA8cT_hiQMmqJeQYwcDZ9g&redirect_uri=https%3A%2F%2Fzooom-sdk.netlify.app%2F';
  const sdkKey = 'uA8cT_hiQMmqJeQYwcDZ9g';
  const meetingNumber = '85982709098';
  const passWord = 'Myj3us';
  const role = 0;
  const userName = 'React';
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

export default Sample;
