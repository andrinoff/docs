# Secure Discord webhook

This is a serverless function that makes your discord webhook URL, which is accessible by anyone in default.

This uses environmental variables and CORS to block any other connections, other, than your website.

## To use:

1. Generate webhook URL (see someone elses guide.)
2. Fork this [repository](https://github.com/andrinoff/secure-discord-webhook.)
3. Replace allowedOrigin with your base URL website.
4. Deploy to Vercel (or any other service of your choice.)
5. Set environmental variable DISCORD_WEBHOOK_URL with an URL you got from step 1.
6. That's it! All you have to do is pass content and that's it!

## Uses:

1. [Golang](https://golang.org/)
2. [Vercel](https://vercel.com)
3. [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
4. [Discord API](https://discord.com/developers/docs/resources/webhook#create-a-webhook)

Last updated: 20.06.25