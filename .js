/* The final list of open tabs should be: 
['FB', 'Gitter', 'Reddit', 'Twitter', 'Medium', 'new tab', 'Netflix', 'YouTube', 'Vine', 'GMail', 'Work mail', 'Docs', 'freeCodeCamp', 'new tab'] 

But the output is slightly different as below:
['FB', 'Gitter', 'Reddit', 'Twitter', 'Medium', 'new tab', 'Netflix', 'YouTube', 'GMail', 'Work mail', 'Docs', 'freeCodeCamp', 'new tab'] 
 as  'Vine' is missing... 
 
In line 32 & 33 shows one possible solution to fix the bug.                 */


// tabs is an array of titles of each site open within the window
var Window = function(tabs) {
  this.tabs = tabs; // we keep a record of the array inside the object
};

// When you join two windows into one window
Window.prototype.join = function (otherWindow) {
  this.tabs = this.tabs.concat(otherWindow.tabs);
  return this;
};

// When you open a new tab at the end
Window.prototype.tabOpen = function (tab) {
  this.tabs.push('new tab'); // let's open a new tab for now
  return this;
};

// When you close a tab
Window.prototype.tabClose = function (index) {
  /* One way to corrent the code is to change the folowing two lines of code into:
  
   let tabsBeforeIndex = this.tabs.slice(0, index); 
   let tabsAfterIndex = this.tabs.slice(index+1); 
   
   As the original array will not be modified when using the slice() method which is easier to manage than the splice() method that changes the contents of an array
   Also, the index is zero based and if accidentally forget that it could sometimes cause sneaky bugs
  */
  var tabsBeforeIndex = this.tabs.splice(0, index); // get the tabs before the tab
  var tabsAfterIndex = this.tabs.splice(index); // get the tabs after the tab

  this.tabs = tabsBeforeIndex.concat(tabsAfterIndex); // join them together 
  return this;
 };

// Let's create three browser windows
var workWindow = new Window(['GMail', 'Inbox', 'Work mail', 'Docs', 'freeCodeCamp']); // Your mailbox, drive, and other work sites
var socialWindow = new Window(['FB', 'Gitter', 'Reddit', 'Twitter', 'Medium']); // Social sites
var videoWindow = new Window(['Netflix', 'YouTube', 'Vimeo', 'Vine']); //  Entertainment sites

// Now perform the tab opening, closing, and other operations
var finalTabs = socialWindow
                    .tabOpen() // Open a new tab for cat memes
                    .join(videoWindow.tabClose(2)) // Close third tab in video window, and join
                    .join(workWindow.tabClose(1).tabOpen());

alert(finalTabs.tabs);


// Retrieved from https://learn.freecodecamp.org/javascript-algorithms-and-data-structures/functional-programming/understand-the-hazards-of-using-imperative-code/
