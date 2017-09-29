import requests, json

try: 
    from BeautifulSoup import BeautifulSoup
except ImportError:
    from bs4 import BeautifulSoup

from InstagramAPI import InstagramAPI

import config

def extractBest(image_versions2):
    candidates = image_versions2['candidates']

    maxwidth = 0
    maxitem = ''

    for candidate in candidates:
        if int(candidate['width']) > maxwidth:
            maxwidth = int(candidate['width'])
            maxitem = candidate['url']
    return maxitem

def instafeed(hashtag):
    feed = []

    api = InstagramAPI(config.username, config.password)
    api.login() # login
    api.tagFeed(hashtag)
    media_id = api.LastJson # last response JSON
    # print(media_id)
    for item in media_id['ranked_items']:

        cap = item['caption']['text']

        # print(json.dumps(item, indent=4, sort_keys=True))
        if 'image_versions2' in item:
            candidates = item['image_versions2']
            url = extractBest(candidates)

            feed.append({"display_src": url, "caption": cap})
        elif 'carousel_media' in item:
            for image in item['carousel_media']:
                url = image['image_versions2']
                feed.append({"display_src": url, "caption": cap})

    print(feed)




    # file = open("/Volumes/courses/2.009/2.009, 2016/infoPappa/display/public/insta.json", "w")
    # json.dump(j['media']['nodes'], file)
    # file.close()

instafeed('009mit');
