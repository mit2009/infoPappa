import requests, json

try: 
    from BeautifulSoup import BeautifulSoup
except ImportError:
    from bs4 import BeautifulSoup

from InstagramAPI import InstagramAPI

import config

# register = template.Library()

api = InstagramAPI(config.username, config.password)
api.login() # login
api.tagFeed("009mit") # get media list by tag #cat
media_id = api.LastJson # last response JSON
print(media_id)

# @register.simple_tag
def instafeed(hashtag, count):
    """Simply use with autoescapeoff, for example: {% autoescape off %}{% instafeed 'manifeste16' 8 %}{% endautoescape %}"""
    
    html = ''
    main_url = 'https://www.instagram.com'
    query_url = main_url + '/explore/tags/%s' % (hashtag,)
    # params = 'ig_hashtag(%s){media.first(%s){nodes{caption,display_src}}}' % (hashtag, str(count))
    item_html = '<div class="box-item-25"><a href="%s" target="_blank"><img src="%s" alt="%s" title="%s"></a></div>'
    # print(query_url + params)
    # r = requests.get(query_url + params)
    r = requests.get(query_url)
    print(r.content)
    j = json.loads(r.content.decode('utf-8'))


    file = open("/Volumes/courses/2.009/2.009, 2016/infoPappa/display/public/insta.json", "w")
    json.dump(j['media']['nodes'], file)
    file.close()

instafeed('009mit', 16);
