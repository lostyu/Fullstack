```
note over browser:
browser executes the
form submit event handler in spa.js
end note

note over browser:
create note and push to notes
render HTML
end note

note over browser:
send note to server use AJAX POST
end note

browser->server: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note_spa
server-->browser: {"message":"note created"} 201 created
```

![img](https://github.com/lostyu/Fullstack/blob/master/part0/0.6spa-new-note/0.6spa-new-note.png)
