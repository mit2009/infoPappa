# infoPappa
The slideshow that runs in Pappalardo

# To run:

## Webapp
- install nodejs
- make sure you're connected to the server
- `cd display`
- `npm start`
- View on `localhost:3000`

## instaGrabber (gets recent photos from instagram)
- install python, pip, virtualenv
- make sure you're connected to the server
- `cd Python`
- `virtualenv venv`
- `source venv/bin/activate`
- `pip install -r requirements.txt`
- `python instaGrabber.py` - this should automatically update `display/public/insta.json` in the relevant file on the server.

## instaGrabber, to run automatically
- use cron. I don't remember how this was set up but maybe a future TA will be better at documenting. Otherwise, just run instaGrabber.py whenever you want to update it. This can be done from your local computer, since it maps to the server and the webapp pulls from the server.
