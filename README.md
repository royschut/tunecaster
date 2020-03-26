# tunecaster
TuneCaster - Host a home party and let everyone cast their tunes of choice!

Repo of TuneCaster.

Why TuneCaster?
Ever whitness a home party where people keep switching phones to control the music? Not very fortunate right? 
So I found, so I created an app that solves this problem. Host your party, add songs to the playlist and use the
personal URL on whatever device to add songs from there. 
When the playlist runs out, the Radio function will take over again, which always has random good music, until you submit new
tunes. You can filter which styles the radio uses to suit your party (more music added soon!).
Two YouTube players are used to prebuffer the next, for a fluent mix. 
You can set the AutoMix feature to keep the flow, which uses a decent party pace.
All submitters can send messages to be presented on screen.
And of course you can fullscreen to enjoy the vids fully!

Future version features: 
- Like/Request skip buttons for AppUser. Host can control how many 'Skips' actually make the song skip.
- Clickable video progress bar
- Submit party pics to be shown on screen!
- Save a playlist history to replay tracks whenever

React code
As a personal challenge, I tried to make this code more clear, better readadable and just smarter than my previous project (RadioDaisy.nl).
The structure and a few cool coding ideas I've used:
- TuneCaster.js is the main component, which selectes 1 of 2 apps: AppHost and AppUser (desktop host vs. mobile casters mainly)
- AppHost is the single source of truth (except for playlistcontrol)
- I'm using VO's (value objects) to store/update and read data, which is passed on to the state, so data binding can be used.
- As you can see, these VO's always send back themselves (this), which makes the updating code very very clear and readable.
For example:
        onNext={() => this.setState({ playActionVO: actVO.setAction(NEXT) })}
So here the Next button gets clicked, updates the playActionVO (setAction) which returns itself, so I can immediately update the state. I found this so sexy. :)

- The PlaylistVO is a pretty clever VO and keeps track of the playlists (user and radio
- The PlayController talks with playlists and controls the video's


