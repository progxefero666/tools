

export class CtrlCollectionByKey<T, K> {
    private keyField: keyof T;
    public elements: Array<T> = [];

    // Constructor
    constructor(keyField: keyof T) {
        this.keyField = keyField;
    }

    // Private method to find the index of an element by its key value
    private findIndexByKey(keyValue: K): number {
        return this.elements.findIndex((element) => element[this.keyField] === keyValue);
    }

    // Deletes all elements in the collection
    public deleteAllElements(): boolean {
        this.elements = [];
        return true;
    }

    // Adds new elements to the end of the collection
    public addElements(newElements: Array<T>): boolean {
        if (newElements && newElements.length > 0) {
            this.elements.push(...newElements);
            return true;
        }
        return false;
    }

    // Inserts new elements at a specific position in the collection
    public insertElements(newElements: Array<T>, insertIndex: number): boolean {
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

    // Deletes an element from the collection by its key value
    public deleteElement(keyValue: K): boolean {
        const index = this.findIndexByKey(keyValue);
        if (index !== -1) {
            this.elements.splice(index, 1);
            return true;
        }
        return false;
    }

    // Updates an element in the collection by its key value
    public updateElement(keyValue: K, updatedElement: T): boolean {
        const index = this.findIndexByKey(keyValue);
        if (index !== -1) {
            this.elements[index] = updatedElement;
            return true;
        }
        return false;
    }

    // Moves an element up in the collection (swaps with the previous one)
    public moveUp(keyValue: K): boolean {
        const index = this.findIndexByKey(keyValue);
        if (index > 0) {
            const temp = this.elements[index];
            this.elements[index] = this.elements[index - 1];
            this.elements[index - 1] = temp;
            return true;
        }
        return false;
    }

    // Moves an element down in the collection (swaps with the next one)
    public moveDown(keyValue: K): boolean {
        const index = this.findIndexByKey(keyValue);
        if (index >= 0 && index < this.elements.length - 1) {
            const temp = this.elements[index];
            this.elements[index] = this.elements[index + 1];
            this.elements[index + 1] = temp;
            return true;
        }
        return false;
    }

    // Gets all elements in the collection
    public getElements(): Array<T> {
        return this.elements; // Returns the original array
    }

}//end class