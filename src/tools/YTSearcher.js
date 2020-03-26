import Vars from "../data/Vars";

const axios = require("axios");
var ROOT_URL = "https://www.googleapis.com/youtube/v3/search";

export default class YTSearcher {
  search(term, callBack) {
    let arr;
    axios
      .get(ROOT_URL, { params: { q: term, ...Vars.YTSearchOpts } })
      .then(function(response) {
        if (response.data.items) {
          arr = response.data.items.map(item => {
            return { ytid: item.id.videoId, title: item.snippet.title };
          });
        }
        callBack(arr);
      })
      .catch(function(err) {
        console.log("Error searching YT", err);
      });
  }
}
