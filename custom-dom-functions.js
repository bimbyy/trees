// Finds an element by its ID.
function customGetElementById(id) {
    let elementFound = null;
  
    function searchElement(children) {
      for (let child of children) {
        if (child.id === id) {
          elementFound = child;
          return;
        }
        if (child.children.length > 0) {
          searchElement(child.children);
        }
        if (elementFound) return;
      }
    }
  
    searchElement(document.body.children);
    return elementFound;
  }
  
  // Finds all elements that match a given tag name.
  function customGetElementsByTagName(tagName) {
    let elementsFound = [];
  
    function searchElements(children) {
      for (let child of children) {
        if (child.tagName.toLowerCase() === tagName.toLowerCase()) {
          elementsFound.push(child);
        }
        if (child.children.length > 0) {
          searchElements(child.children);
        }
      }
    }
  
    searchElements(document.body.children);
    return elementsFound;
  }
  
  // Finds all elements that have a specific class name.
  function customGetElementsByClassName(className) {
    let elementsFound = [];
  
    function searchElements(children) {
      for (let child of children) {
        if (child.classList && child.classList.contains(className)) {
          elementsFound.push(child);
        }
        if (child.children.length > 0) {
          searchElements(child.children);
        }
      }
    }
  
    searchElements(document.body.children);
    return elementsFound;
  }
  