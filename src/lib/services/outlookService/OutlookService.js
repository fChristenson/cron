const fetch = require("node-fetch");
const Request = require("./Request");

class OutlookService {
  async accountNameIsAvailable(name) {
    const res = await fetch(
      "https://signup.live.com/API/CheckAvailableSigninNames?lcid=1033&wa=wsignin1.0&rpsnv=13&ct=1544209306&rver=7.0.6737.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f%3fnlp%3d1%26signup%3d1%26RpsCsrfState%3d0c9420c0-643a-9238-e793-1e8d3665d34a&id=292841&CBCXT=out&lw=1&fl=dob%2cflname%2cwld&cobrandid=90015&lic=1&uaid=5fdfdd755c2a4af59f22e23810e8362b",
      Request(name)
    );

    const json = await res.json();
    return json.isAvailable;
  }
}

module.exports = OutlookService;
