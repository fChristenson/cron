module.exports = name => {
  return {
    credentials: "include",
    headers: {
      Cookie: "amsc=aI/5ityVJKANYhRzYmHUods2K7ifTwaYjEYLcly9suDJYsWSSYcQNsIJTSD9doT3zG/y5wxJpe4iKOsb0sTgAox8PZYVflRxHdPULlQzJ4H+3qMVdeXmC7LYfn0ZeDROzDvnx5a2I5eyoDJ9xbqU4y6REavkiZpP+/EORmRoqPQMvW+5xCAZkkAymjrac5WMH5nECSZXr0k+SiqOR6hUhdFjZu33mJOIElc5RHEX4S+IvxLjdSXTwsiB7TM7cuApAfFDmbDfVHo3mEfbCQx0iege9wcajVlwDQkiDrkrcSc=:2:3c",
      accept: "application/json",
      "accept-language": "en-US,en;q=0.9,de-DE;q=0.8,de;q=0.7,ru-RU;q=0.6,ru;q=0.5",
      "cache-control": "no-cache",
      canary: "rmsWCO6YnrtGOh6we6o7A7wkdOXk/cPqYiDEWZVOb8sCtglEk/B8LktsY8LzYy0lvFbn1NZyiQUm+nceHatixoFr7v5n7CUI1XF9jHlUrebm0PuCL8wVUgIzh50MNYGlTYZACK65zfDV5aJOjQGxatVBtxH1A0yhNMyVlxWdxuFHhxQaDNyUPNwgh5tYYw5hIGdUBlXroNh3blq9FoheCACrO0c1NF7Z7W/Xs1ZXGw0H6S1eUeZWB3oN/+30LwZi:2:3c",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      hpgid: "Signup_MemberNamePage_Client",
      pragma: "no-cache",
      scid: "100118",
      tcxt: "KEdZygrERw0sVw0EQUxNvrnK1cAgVc7VqCKBCqRzBZAeDoywUJKlN3xZtCzCRXCEBBG6fiPM+5tCOIc2Ahmw3JTKIbZ4LKs1Ai3RmufX8E505g8eBvRA5BH/SUdk8UTH+VNoSH9iBnnKfM018Yt22hQ05ypZF2TJx1ob0j3dxmruAoi/QlEiryj4y3mC0dr5U9NmE8j1lGJIhIc5/VDnRm9TeErvDgAM/qQ5ry7sAvtX2Mo8U/O3Xy0M3QEuNaS/5EUiHfY/jjRe/pIm++2INgXvnTX0nqp7GheftkeTuJac3pE935wiT4fpyIRgobTSn9H0FbPd0Ixhy8VlU9W42Fiq/ddttXbblxHbrt5Vv0StFHO3yZ6igbz//H5LUiAS+yHqYdualu5XH48DC08OysokLrBo8bp7wk3e9KmkrOdOw44TNq/KU0PTHTtgTV+X:2:3",
      uaid: "5fdfdd755c2a4af59f22e23810e8362b",
      uiflvr: "1001",
      "x-ms-apitransport": "xhr",
      "x-ms-apiversion": "2",
      "x-requested-with": "XMLHttpRequest"
    },
    referrer: "https://signup.live.com/signup?lcid=1033&wa=wsignin1.0&rpsnv=13&ct=1544209306&rver=7.0.6737.0&wp=MBI_SSL&wreply=https%3a%2f%2foutlook.live.com%2fowa%2f%3fnlp%3d1%26signup%3d1%26RpsCsrfState%3d0c9420c0-643a-9238-e793-1e8d3665d34a&id=292841&CBCXT=out&lw=1&fl=dob%2cflname%2cwld&cobrandid=90015&lic=1&uaid=5fdfdd755c2a4af59f22e23810e8362b",
    referrerPolicy: "no-referrer-when-downgrade",
    body: `{"signInName":"${name}@outlook.com","uaid":"5fdfdd755c2a4af59f22e23810e8362b","includeSuggestions":true,"uiflvr":1001,"scid":100118,"hpgid":"Signup_MemberNamePage_Client"}`,
    method: "POST",
    mode: "cors"
  };
};
