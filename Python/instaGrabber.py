import requests, json

try: 
    from BeautifulSoup import BeautifulSoup
except ImportError:
    from bs4 import BeautifulSoup

from InstagramAPI import InstagramAPI

import config

# def extractBest(image_versions2):
#     candidates = image_versions2['candidates']

#     maxwidth = 0
#     maxitem = ''

#     for candidate in candidates:
#         if int(candidate['width']) > maxwidth:
#             maxwidth = int(candidate['width'])
#             maxitem = candidate['url']
#     return maxitem

def instafeed(hashtag, count):
    """Simply use with autoescapeoff, for example: {% autoescape off %}{% instafeed 'manifeste16' 8 %}{% endautoescape %}"""
    feed = []
    
    html = ''
    main_url = 'https://www.instagram.com'
    query_url = main_url + '/explore/tags/%s' % (hashtag,)
    # params = 'ig_hashtag(%s){media.first(%s){nodes{caption,display_src}}}' % (hashtag, str(count))
    # item_html = '<div class="box-item-25"><a href="%s" target="_blank"><img src="%s" alt="%s" title="%s"></a></div>'
    # print(query_url + params)
    # r = requests.get(query_url + params)
    r = requests.get(query_url)
    parsed = BeautifulSoup(r.content)
    # j = json.loads(r.content.decode('utf-8'))
    
    scriptstuff = parsed.findAll('script')
    scriptstuff.sort(key=lambda x: len(x.text))
    actualScript = scriptstuff[-1].text[21:-1]
    j = json.loads(actualScript)
    media = j['entry_data']['TagPage'][0]['tag']['media']['nodes']
    for image in media:
        caption = image['caption']
        display_src = image['display_src']
        feed.append({'caption': caption, 'display_src': display_src})


    file = open("/Volumes/courses/2.009/2.009, 2017/infoPappa/display/public/insta.json", "w")
    json.dump(feed, file)
    file.close()

instafeed('009mit', 16);
