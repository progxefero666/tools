

export class QueryCollection<T> {

    private elements: Array<T> = [];

    // Constructor: Inicializa la colección con elementos
    constructor(elements: Array<T>) {
        this.elements = elements;
    }

    /**
     * Initializes the collection with new elements.
     * @param {Array<T>} elements - The new array of elements to set.
     */
    public init(elements: Array<T>): void {
        this.elements = elements;
    }

    /**
     * Gets all elements in the collection.
     * @returns {Array<T>} - A copy of the collection.
     */
    public getItems(): Array<T> {
        //return [...this.elements];
        return this.elements;
    }

    /**
     * Filters elements based on a condition.
     * @param {(item: T) => boolean} predicate - The condition to filter by.
     * @returns {Array<T>} - An array of elements that match the condition.
     */
    public filterItems(predicate: (item: T) => boolean): Array<T> {
        return this.elements.filter(predicate);
    }

    /**
     * Finds the first element that matches a condition.
     * @param {(item: T) => boolean} predicate - The condition to search by.
     * @returns {T | undefined} - The first matching element, or undefined if not found.
     */
    public findItem(predicate: (item: T) => boolean): T | undefined {
        return this.elements.find(predicate);
    }

    /**
     * Gets a single item by its index.
     * @param {number} index - The index of the item to retrieve.
     * @returns {T | undefined} - The item at the specified index, or undefined if out of bounds.
     */
    public getItemByIndex(index: number): T | undefined {
        return this.elements[index];
    }

    /**
     * Gets multiple items starting from a specific index.
     * @param {number} startIndex - The starting index.
     * @param {number} count - The number of items to retrieve.
     * @returns {Array<T>} - An array of items starting from the index, up to the specified count.
     */
    public getItemsByIndex(startIndex: number, count: number): Array<T> {
        return this.elements.slice(startIndex, startIndex + count);
    }

}//end class