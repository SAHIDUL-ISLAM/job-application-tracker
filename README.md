**1. What is the difference between getElementById, getElementsByClassName, and querySelector / querySelectorAll?
Answer: 
      >>getElementById() -selects one element by its unique ID and returns a single element or null.

      >>getElementsByClassName() -selects all elements with a given class name and returns a live HTMLCollection.

      >>querySelector() -selects the first element that matches a CSS selector and returns a single element or null.

      >>querySelectorAll() -selects all elements that match a CSS selector and returns a static NodeList.
      
**2. How do you create and insert a new element into the DOM?
Answer:
      >>To create and insert a new element into the DOM using JavaScript, you need to create the element and then append it to an existing parent element in the document
      
**3. What is Event Bubbling? And how does it work?
Answer: 
      >>It works by first running on the clicked element, then on its parent, then on the parent’s parent, until it reaches the top of the page unless it is stopped.

**4. What is Event Delegation in JavaScript? Why is it useful?
Answer:
      >>Event delegation is a technique where add one event listener to a parent element instead of adding listeners to many child elements. It is useful because it saves memory, improves performance, and also works for elements added to the page later.

**5. What is the difference between preventDefault() and stopPropagation() methods?
Answer: 
      >>preventDefault() stops the browser from doing its normal action. stopPropagation() stops the event from going up to parent elements.
  
