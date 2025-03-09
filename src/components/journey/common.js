/**
 * Get mouse position relative to an element in the range of -1 to +1.
 * Also supports touch events for mobile.
 * @param {MouseEvent | TouchEvent} event
 * @returns {{x: number; y: number}}
 */
export const getInitializedMousePosByMouseEvent = (event) => {
    const element = event.currentTarget;
    let x, y;
  
    // Get XY coordinates relative to the element
    if (event instanceof TouchEvent) {
      x = event.touches[0].clientX - element.offsetLeft;
      y = event.touches[0].clientY - element.offsetTop;
    } else if (event instanceof MouseEvent) {
      x = event.clientX - element.offsetLeft;
      y = event.clientY - element.offsetTop;
    }
  
    // Get canvas element dimensions
    const w = element.offsetWidth;
    const h = element.offsetHeight;
  
    // Normalize mouse coordinates to range -1 to +1
    const initializedX = (x / w) * 2 - 1;
    const initializedY = -(y / h) * 2 + 1;
  
    return { x: initializedX, y: initializedY };
  };
  
  /**
   * Removes an element from the DOM.
   * @param {Element} el
   */
  export const removeElementItself = (el) => {
    if (el.parentNode) {
      el.parentNode.removeChild(el);
    }
  };
  
  /**
   * Get a random integer between min and max (inclusive).
   * @param {number} min
   * @param {number} max
   * @returns {number}
   */
  export const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };