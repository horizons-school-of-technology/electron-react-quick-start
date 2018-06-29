# HDocs
App can be viewed by using [electron](https://electronjs.org/). Start with `npm install` followed by `npm run dev`.


  When users open the application, they are taken to the home screen, but are unable to view their documents without first being user authenticated.
<div>
  <img height=200 src="https://raw.githubusercontent.com/bjeng/HDocs/bjeng/screenshots/Screen%20Shot%202018-04-10%20at%209.08.38%20PM.png"/>
  <img height=200 src="https://raw.githubusercontent.com/bjeng/HDocs/bjeng/screenshots/Screen%20Shot%202018-04-10%20at%209.09.14%20PM.png"/>
</div>

  Upon registering and logging in, the home screen will display all of the documents that the user, in this case bran, is a collaborator on. These documents are persisted in the database from the past. Bran is the author of document "a" and was invited to collaborate on document "b"
<div>
  <img height=200 src="https://raw.githubusercontent.com/bjeng/HDocs/bjeng/screenshots/Screen%20Shot%202018-04-10%20at%209.09.40%20PM.png"/>
</div>
 
  Let's visit document "b". Here we can see that aus is the author of document "b" and that both aus and bran are collaborators. We can also see the extent of what features HDocs offers as a text-editor. The ability to do this is courtesy of [Draft.js](https://draftjs.org/).
<div>
  <img height=400 src="https://raw.githubusercontent.com/bjeng/HDocs/bjeng/screenshots/Screen%20Shot%202018-04-10%20at%209.11.15%20PM.png"/>
</div>
 
Now let's go back and create a new document. We'll call this document "c". Bran will be the author of this document and create a personalized password for it. Once aus has the name of the document and the password, he is able to become a collaborator on the document.
<div>
  <img height=200 src="https://raw.githubusercontent.com/bjeng/HDocs/bjeng/screenshots/Screen%20Shot%202018-04-10%20at%209.14.30%20PM.png"/>
</div>

Both users are redirected to the text editor and when one person types, the other can see the same thing on their screen resulting in a truly collaborative experience!
<div>
  <img height=250 src="https://raw.githubusercontent.com/bjeng/HDocs/bjeng/screenshots/Screen%20Shot%202018-04-10%20at%209.16.18%20PM.png"/>
</div>
