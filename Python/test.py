#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# Use text editor to edit the script and type in valid Instagram username/password

from InstagramAPI import InstagramAPI

api = InstagramAPI("009mit", "!cAdJ1nx0")
api.login() # login
api.tagFeed("009mit") # get media list by tag #cat
media_id = api.LastJson # last response JSON
print(media_id)
#api.like(media_id["ranked_items"][0]["pk"]) # like first media
#api.getUserFollowers(media_id["ranked_items"][0]["user"]["pk"]) # get first media owner followers
