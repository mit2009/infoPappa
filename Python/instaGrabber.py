import requests, json

try:
    from BeautifulSoup import BeautifulSoup
except ImportError:
    from bs4 import BeautifulSoup

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
    r = requests.get(query_url)
    parsed = BeautifulSoup(r.content)

    scriptstuff = parsed.findAll('script')
    scriptstuff.sort(key=lambda x: len(x.text))
    actualScript = scriptstuff[-1].text[21:-1]
    j = json.loads(actualScript)
    # print(j)
    # print(j['entry_data']['TagPage'][0].keys())
    elements = j['entry_data']['TagPage'][0]['graphql']['hashtag']['edge_hashtag_to_media']['edges']
    nodes = [element['node'] for element in elements]
    for node in nodes:
        caption = node['edge_media_to_caption']['edges'][0]['node']['text']
        display_src = node['display_url']
        feed.append({'caption': caption, 'display_src': display_src})


    with open("/Volumes/courses/2.009/2.009, 2018/infoPappa/display/public/insta.json", "w") as f:
        json.dump(feed, f)

instafeed('009mit', 16);
