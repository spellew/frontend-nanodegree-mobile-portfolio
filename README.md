## Website Optimization

#### Building The Project
  1. In the root of the frontend-nanodegree-mobile-portfolio folder, run the following command `npm i`.
  2. After the packages are installed, run the `gulp` command. The built project is now in the dist directory directory.
  
#### Running The Tool 
  1. If you haven't already, run the command `npm i` in the root of the frontend-nanodegree-mobile-portfolio folder.
  2. Assuming the packages are installed, run the command `gulp run-server`. The console will output a URL, navigate to this URL to access the website.
  3. If attempting to test the Google Page Speed Insighs of the website, you can use the URL outputted by the console on https://developers.google.com/speed/pagespeed/insights/.

#### Optimizations Made
  index.html:
  * I commented out the Google Fonts stylesheet, because the browser comes with it's own stylish fonts.
  * I used gulp to minify and concatenate, the style.css and print.css files. Now the browser, will make less requests, for a file that takes up much less space.
  * I commented out the Google Analytics script, because it massively slows down page load, the goal here is to optimize page load.
  * I also minified the JavaScript file, so the file takes up much less space, and the request made will complete faster.
  * Image files were also compressed using gulp, now they take up less space, and requests made for images will complete faster.
  * The index.html file itself was also ran through a gulp minifier.

  views/main.js:
  
  * I used gulp to minify the images, and changed the src attribute of image elements to these minified images.
  * I removed the changeSliderLabel function, and replaced it with the newPizzaSize function. This new function returns a string, instead of changing the label itself. This string can be used not only to label pizzas, but also to change the size of pizzas.
  * Also, functions are moved outside of the resizePizzas function, so they aren't recreated everytime functions are called.
  * Classes containing styling for the different pizza sizes are added and removed using JavaScript, instead of the JavaScript his will save a lot of resources, that could be used elsewhere.
  * document.querySelector is replaced by getElementById and getElementByClassName. This is faster, because these newer functions don't search the entire tree for elements.
  * window.requestAnimationFrame is now used, to ease the animation as the user scrolls. This is the browser's native way of optimizing animations, with frames and repaints.
  * The main.js file was also ran through a gulp minifier.