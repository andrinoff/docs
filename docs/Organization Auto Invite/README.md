# Organization auto invite

This is a serverless function that gets a GitHub username and automatically sends them an invite via email.

## Usage:

I have myself deployed it on a vercel and used it [here](https://tbilisi.hackclub.com/github)

You can test it out!

> Valuable mention: this suits people, if they actually want people inside your organization, it is not meant for big organization. Take your own risks

To use it:

1. Deploy on Vercel (or service of your choice)
2. Set enviromental the following enviromental values:
    - GITHUB_TOKEN -- your PAT
    - GITHUB_ORG -- name of your organization
    - GITHUB_TEAM_SLUG -- slug (name) of your team inside of the organization

3. Deploy and POST with the username

## Uses

- [Octocat](https://github.com/octocat)
- [Vercel](https://vercel.com)