
/*
for soons:  
    public updateField = <K extends keyof MMImage>(elementIndex: number, field: K, value: MMImage[K]): boolean => {
        const result = super.updateField(elementIndex, field, value);
        return result;
    };
*/

export class CtrlCollectionByIndex<T> {

    public elements: Array<T> = [];

    // Constructor
    constructor() {}

    /**
     * Deletes all elements in the collection.
     * @returns {boolean} - Always returns true.
     */
    public deleteAllElements(): boolean {
        this.elements = [];
        return true;
    }

    /**
     * Adds new elements to the end of the collection.
     * @param {Array<T> | null | undefined} newElements - Elements to add.
     * @returns {boolean} - Returns true if elements were added, false otherwise.
     */
    public addElements(newElements: Array<T> | null): boolean {
        if (newElements && newElements.length > 0) {
            this.elements.push(...newElements);
            return true;
        }
        return false;
    }

    /**
     * Inserts new elements at a specific position in the collection.
     * @param {number} insertIndex - Index where elements will be inserted.
     * @param {Array<T> | null | undefined} newElements - Elements to insert.
     * @returns {boolean} - Returns true if elements were inserted, false otherwise.
     */
    public insertElements(newElements: Array<T> | null,insertIndex: number): boolean {
        if (!newElements || newElements.length === 0) return false;

        // Adjust the index if it's out of range
        if (insertIndex < 0) {
            insertIndex = 0;
        } else if (insertIndex > this.elements.length) {
            insertIndex = this.elements.length;
        }

        this.elements.splice(insertIndex, 0, ...newElements);
        return true;
    }

    

    /**
     * Deletes an element from the collection by its index.
     * @param {number} elementIndex - Index of the element to delete.
     * @returns {boolean} - Returns true if the element was deleted, false otherwise.
     */
    public deleteElement(elementIndex: number): boolean {

        if (elementIndex >= 0 && elementIndex < this.elements.length) {
            this.elements.splice(elementIndex, 1);
            return true;
        }
        return false;
    }

    /**
     * Updates an element in the collection by its index.
     * @param {number} elementIndex - Index of the element to update.
     * @param {T} updateElement - New value for the element.
     * @returns {boolean} - Returns true if the element was updated, false otherwise.
     */
    public updateElement(elementIndex: number, updateElement: T): boolean {
        if (elementIndex >= 0 && elementIndex < this.elements.length) {
            this.elements[elementIndex] = updateElement;
            return true;
        }
        return false;
    }

    /**
     * Updates a specific field of an element in the collection.
     * @param {number} elementIndex - Index of the element to update.
     * @param {K} field - Field name to update (key of the object).
     * @param {T[K]} value - New value for the field.
     * @returns {boolean} - Returns true if the field was updated, false otherwise.
     */
    public updateField<K extends keyof T>(elementIndex: number, field: K, value: T[K]): boolean {
        if (elementIndex >= 0 && elementIndex < this.elements.length) {
            this.elements[elementIndex][field] = value;
            return true;
        }
        return false;
    }

    /**
     * Moves an element up in the collection (swaps with the previous one).
     * @param {number} elementIndex - Index of the element to move.
     * @returns {boolean} - Returns true if the element was moved, false otherwise.
     */
    public moveUp(elementIndex: number): boolean {
        if (elementIndex > 0 && elementIndex < this.elements.length) {
            const temp = this.elements[elementIndex];
            this.elements[elementIndex] = this.elements[elementIndex - 1];
            this.elements[elementIndex - 1] = temp;
            return true;
        }
        return false;
    }

    /**
     * Moves an element down in the collection (swaps with the next one).
     * @param {number} elementIndex - Index of the element to move.
     * @returns {boolean} - Returns true if the element was moved, false otherwise.
     */
    public moveDown(elementIndex: number): boolean {
        if (elementIndex >= 0 && elementIndex < this.elements.length - 1) {
            const temp = this.elements[elementIndex];
            this.elements[elementIndex] = this.elements[elementIndex + 1];
            this.elements[elementIndex + 1] = temp;
            return true;
        }
        return false;
    }

    public isEmpty(): boolean {
        if(this.elements.length>0){
            return false;
        }
        return true;
    }    
    /**
     * Gets all elements in the collection.
     * @returns {Array<T>} - The original collection (not a copy).
     */
    public getElements(): Array<T> {
        return this.elements; // Devuelve el array original
    }

}