let local = process.env.NODE_ENV === "development";

let SERVER = "/tcdata.php";
if (local) SERVER = "http://192.168.0.102:80/tcdata.php";

let siteURL = "tunecaster.nl/#";
if (local) siteURL = "192.168.0.102:3000/#";

export default {
  SERVER: SERVER,
  siteURL: siteURL,
  searchDelay: 400,
  mixstyles: [
    {
      id: 1,
      name: "Always full song",
      runtime: 360000000,
      fadetime: 3000,
      descr: "" //10 hrs
    },
    {
      id: 2,
      name: "Extra slow",
      runtime: 220000,
      fadetime: 3000,
      descr: "(3m40s)"
    },
    { id: 3, name: "Slow", runtime: 190000, fadetime: 3000, descr: "(3m10)" },
    {
      id: 4,
      name: "Normal",
      runtime: 160000,
      fadetime: 3000,
      descr: "(2m40s)"
    },
    { id: 5, name: "Fast", runtime: 130000, fadetime: 3000, descr: "(2m10)" },
    {
      id: 6,
      name: "Extra fast",
      runtime: 100000,
      fadetime: 3000,
      descr: "(1m40s)"
    }
  ],
  defaultMixstyle: 1,

  YTOpts: {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 0,
      cc_load_policy: 0,
      controls: 0,
      disablekb: 1,
      enablejsapi: 1,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      showinfo: 0,
      start: 0
    }
  },
  YTSearchPlayerOpts: {
    height: 113,
    width: 200,
    playerVars: {
      autoplay: 0,
      cc_load_policy: 0,
      controls: 1,
      disablekb: 1,
      enablejsapi: 1,
      fs: 0,
      iv_load_policy: 3,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
      showinfo: 1,
      start: 0
    }
  },
  YTSearchOpts: {
    part: "snippet",
    maxResults: 8,

    type: "video",
    key: "AIzaSyAWujt9Jb3Yn8eip7A2gGg9uzSmTf6FBFA",
    fields: "items(id(videoId),snippet(title))"
  },
  maxMessageLength: 99
};
