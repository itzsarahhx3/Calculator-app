import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";
import calculator from "./calculatorFunc";

test("renders the correct content", () => {
  const root = document.createElement("div");
  ReactDOM.render(<App />, root);
  expect(root.querySelector("button").textContent).toBe("C");
  expect(root.querySelector("input").textContent).toBe("");
});

test("Edge case: no more than 2 operators in series, unless the 2nd operator is a minus or -", () => {
  expect(calculator("1-+*2")).toEqual("Syntax Error");
  expect(calculator("1+++2")).toEqual("Syntax Error");
  expect(calculator("1++2")).toEqual("Syntax Error");
  expect(calculator("1-+2")).toEqual("Syntax Error");
  expect(calculator("1--2")).toEqual(3);
  expect(calculator("1//2")).toEqual("Syntax Error");
  expect(calculator("1+*10")).toEqual("Syntax Error");
  expect(calculator("2*-10")).toEqual(-20);
  expect(calculator("2+-+-4")).toEqual("Syntax Error");
});

test("Edge case: input includes invalid characters", () => {
  expect(calculator("19 + cinnamon")).toEqual("Invalid Input");
  expect(calculator("80-hello")).toEqual("Invalid Input");
});

test("Edge case: invalid parentheses", () => {
  expect(calculator("(4-2")).toEqual("Syntax Error");
  expect(calculator("2-4)")).toEqual("Syntax Error");
});

test("Support spaces", () => {
  expect(calculator("   1+ 2    ")).toEqual(3);
});

test("Support + operatior: adds numbers", () => {
  expect(calculator("1+2")).toEqual(3);
  expect(calculator("9+ 100")).toEqual(109);
});

test("Support - operatior: subtracts numbers", () => {
  expect(calculator("2-1")).toEqual(1);
  expect(calculator("1  -6")).toEqual(-5);
});

test("Support + & - operatior: adds and subtracts numbers", () => {
  expect(calculator("3+9-1")).toEqual(11);
  expect(calculator(" 2-3+2")).toEqual(1);
  expect(calculator("0-2+1-5 ")).toEqual(-6);
});

test("Support * operatior: multiplies numbers", () => {
  expect(calculator("1 * 2")).toEqual(2);
  expect(calculator("1*2*3")).toEqual(6);
  expect(calculator("4*0")).toEqual(0);
});

test("Support / operatior: divides numbers", () => {
  expect(calculator("5/2")).toEqual(2.5);
  expect(calculator("600/200")).toEqual(3);
});

test("Support * & / operatior: multiplies & divides numbers", () => {
  expect(calculator("4*5/2")).toEqual(10);
});

test("Support the 1st operator or middle operator as a minus or -", () => {
  expect(calculator("5--2")).toEqual(7);
  expect(calculator("-1+7")).toEqual(6);
  expect(calculator("-2/2")).toEqual(-1);
  expect(calculator("-5+-8--11*2")).toEqual(9);
});

test("Support Decimal numbers with +, -, *, / operations", () => {
  expect(calculator("1+2.1")).toEqual(3.1);
  expect(calculator("4.99-1")).toEqual(3.99);
  expect(calculator("2*2.33")).toEqual(4.66);
  expect(calculator("10.2/2")).toEqual(5.1);
});

test("Support Decimal numbers without an integer before the decimal point", () => {
  expect(calculator(".2+3")).toEqual(3.2);
  expect(calculator("5*.4")).toEqual(2);
  expect(calculator("-.32 /.5")).toEqual(-0.64);
});

test("Support long expressions", () => {
  expect(calculator("-5+-8--11*2")).toEqual(9);
});

test("Support parentheses (multiple nesting levels)", () => {
  expect(calculator("(4-2)*3.5")).toEqual(7);
  expect(calculator("2*(5+5*2)/3+(6/2+8)")).toEqual(21);
});

