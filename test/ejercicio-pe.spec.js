import "mocha";
import { expect } from "chai";
import { FilterMapAddReduce, FilterMapSubReduce, FilterMapProdReduce, FilterMapDivReduce, } from "../src/ejercicio-pe.js";
describe("FilterMapAddReduce", () => {
    const numberList = [1, 2, 3];
    const filterMapAddReduce = new FilterMapAddReduce(numberList);
    it("should return the correct result", () => {
        expect(filterMapAddReduce.Reduce()).to.be.equal(6);
    });
});
describe("FilterMapSubReduce", () => {
    const numberList = [1, 2, 3];
    const filterMapSubReduce = new FilterMapSubReduce(numberList);
    it("should return the correct result", () => {
        expect(filterMapSubReduce.Reduce()).to.be.equal(-4);
    });
});
describe("FilterMapProdReduce", () => {
    const numberList = [2, 2, 3];
    const filterMapProdReduce = new FilterMapProdReduce(numberList);
    it("should return the correct result", () => {
        expect(filterMapProdReduce.Reduce()).to.be.equal(12);
    });
});
describe("FilterMapProdReduce", () => {
    const numberList = [6, 2, 3];
    const filterMapDivReduce = new FilterMapDivReduce(numberList);
    it("should return the correct result", () => {
        expect(filterMapDivReduce.Reduce()).to.be.equal(1);
    });
});
//# sourceMappingURL=ejercicio-pe.spec.js.map