**Winner (SIEMENS challenge), FC Bayern Munich HackDays (Jan 19-22, 2018)**

**Enhance Journey to Allianz Arena** *– A new way to experience the way to Allianz Arena, no matter what kind of transportation*

- How would you provide best transportation fitting to each individual’s needs as speed, comfort, in groups or alone?
- What is your idea for fan interaction on the way to the stadium?
- How is the subway, the autobahn or even the subway station itself part of the experience?

** The solution - **

- An AI powered 3d animation of FCBayern football legends interacting with users at subways, bus-stops or other public places
- Real life expressions, natural language communication, real life movements and actions for the 3d player all powered by a contextual AI
- Computer Vision to detect users, detect expressions, classify users and detect fans so as to personalize the communication
- Data streams from Google Maps API, FCBayer APIs, Real time traffic feeds (Munich city public transport APIs), traffic history data-sets, Wikipedia, Social media platforms, etc to give latest data iteractively
- The platform enables people to interact with real life like player models, ask them questions, get updates about match, transport and traffic
- BLE beacons based ADHOC network for internet-less data transfer accross the city
- The systems helps the fans (by providing them with real time data, and interacting with them to give personalized experience), non-fans (Joke about wearning opponent team's jersey, cheer the other team up if it looses), non-football-fans (Attract such people to football by showing live streams and sharing cool trivia)
- The platform serves as targeted advertisements platform during non-match days

- Track number of people (TrackerJS)
- Track if a person is looking at the screen, to trigger a more personalized interaction (WebGazerJS)
- Detect and classify people infront of the screen (OpenCVJS)
- Live traffic updates (Google Maps JS API)
- Active voice commands listening (ArtyomJS)
- Extract answer to a question from a document (IBM Watson directory discivery API)


** To Build - **
- Install nodeJS and ReactJS
- The project builds with Yarn
- Needs Tracking.js, webGazer.js, OpenCV.js, Artyom.js, IBM Watson Directory discovery API key, Google maps API key
- If not deploying over localhost, the webgazerJS needs SSL

