import "mocha";
import { expect } from "chai";
import {
  FilterMapAddReduce,
  FilterMapSubReduce,
  FilterMapProdReduce,
  FilterMapDivReduce,
} from "../src/ejercicio-pe.js";

// describe("FilterMap", () => {
//   const numberList: number[] = [1, 2, 3, 4, 5, 6];
//   const filterMap: FilterMapAddReduce = new FilterMapAddReduce(
//     numberList,
//   );
//   function filterFunction(x: number): boolean {
//     if (x % 2 == 0) {
//         return true;
//     }
//     return false;
//   }
//   const expectedResult: number[] = [2, 4, 5, 6];
//   filterMap.Filter(filterFunction);

// });

describe("FilterMapAddReduce", () => {
  const numberList: number[] = [1, 2, 3];
  const filterMapAddReduce: FilterMapAddReduce = new FilterMapAddReduce(
    numberList,
  );

  it("should return the correct result", () => {
    expect(filterMapAddReduce.Reduce()).to.be.equal(6);
  });
});

describe("FilterMapSubReduce", () => {
  const numberList: number[] = [1, 2, 3];
  const filterMapSubReduce: FilterMapSubReduce = new FilterMapSubReduce(
    numberList,
  );

  it("should return the correct result", () => {
    expect(filterMapSubReduce.Reduce()).to.be.equal(-4);
  });
});

describe("FilterMapProdReduce", () => {
  const numberList: number[] = [2, 2, 3];
  const filterMapProdReduce: FilterMapProdReduce = new FilterMapProdReduce(
    numberList,
  );

  it("should return the correct result", () => {
    expect(filterMapProdReduce.Reduce()).to.be.equal(12);
  });
});

describe("FilterMapProdReduce", () => {
  const numberList: number[] = [6, 2, 3];
  const filterMapDivReduce: FilterMapDivReduce = new FilterMapDivReduce(
    numberList,
  );

  it("should return the correct result", () => {
    expect(filterMapDivReduce.Reduce()).to.be.equal(1);
  });
});