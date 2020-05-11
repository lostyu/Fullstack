```
browser->server: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note
server-->browser: 302 redirect Location /notes
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/notes
server-->browser: HTML-code
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css
server-->browser: main.css
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.js
server-->browser: main.js

note over browser:
browser starts executing js-code
that requests JSON data from server
end note

browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/data.json
server-->browser: [{content: "HTML is easy", date: "2019-05-23T17:30:31.098Z"},…]

note over browser:
browser executes the event handler
that renders notes to display
end note
```

![img](https://github.com/lostyu/Fullstack/blob/master/part0/0.4new-note/new-note.png)
