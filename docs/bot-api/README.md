# Bot API

This is a Go server side code to safely authorize a person and post in Discord, Telegram, and X from a website

To use:

You can use code given here and in [tbilisihc/admin](https://github.com/tbilisihc/admin)

> You have to set environmental values <br/>
> See someone else's guide on how to do so.

The server supports 2 handlers

api/handler (default, with images)
api/no-image (the same just with no image support)

Currently, supports just 1 image for Discord and Telegram and no images for X (will post, just without images)

Last updated: 20.06.25