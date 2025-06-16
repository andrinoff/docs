# Bot-UI

> !!!
> This is no longer maintained. see [bot-api](https://github.com/andrinoff/bot-api)


This is a UI for posting in several telegram and discord channels from a MarkDown file and an image.

Set Discord Token and Telegram token

```
$ export DISCORD_TOKEN=<token>
$ export BOT_TOKEN=<token>
```

To use:

```
$ git clone https://github.com/andrinoff/bot-ui.git
$ cd bot-ui
$ go run main.go <filename>.md <some image>.<some-extension>
```
This will send automatically exactly what you wrote in Markdown with an image attached.


> !!! You have to use MarkdownV1 syntax <br />
> ( *"some text"  *  instead of # some text)

You have to add your bots to your channels and make sure they have all the rights to write

Last updated: 16.06.25