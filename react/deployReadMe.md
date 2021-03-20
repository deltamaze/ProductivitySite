To deploy to firebase
1) determine which firebase target we want to use (prod/dev) in src\config\firebaseInitializer
2) npm run build to create bundle.js
3) take bundle.js and move it to the build or buildProd folder
4) move src/assets to the build or buildProd folder, also the index.html
5) install firebase tools: npm install -g firebase-tools 
6) go into build or buildProd in terminal and run firebase login
7) run firebase init (public": "/",) hosting, single page app
8) run firebase deploy
9) review