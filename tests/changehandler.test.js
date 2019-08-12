let { ChangeHandler } = require("../src/changehandler");

describe("Tests for ChangeHandler", function() {
  // Set up a test below...
  test("The ChangeHandler class is defined.", function() {
    // Remember, you can arrange, act, and assert...start small
    expect(ChangeHandler).toBeDefined();
  });
  test("amount due is set based on an argument", function() {
    let vendingMachine = new ChangeHandler(25);
    expect(vendingMachine.amountDue).toBe(25);
  });

  test("cashTendered is set to 0", function() {
    let vendingMachine = new ChangeHandler(0);
    expect(vendingMachine.cashTendered).toBe(0);
  });
  it("insert a penny increases cash tendered by 1", function() {
    const vendingMachine = new ChangeHandler(105);
    vendingMachine.insertCoin("penny");
    expect(vendingMachine.cashTendered).toBe(1);
  });
  it("insert a nickel increases cash tendered by 5", function() {
    const vendingMachine = new ChangeHandler(105);
    vendingMachine.insertCoin("nickel");
    expect(vendingMachine.cashTendered).toBe(5);
  });
  it("insert a dime increases cash tendered by 10", function() {
    const vendingMachine = new ChangeHandler(105);
    vendingMachine.insertCoin("dime");
    expect(vendingMachine.cashTendered).toBe(10);
  });
  it("insert a quarter increases cash tendered by 25", function() {
    const vendingMachine = new ChangeHandler(105);
    vendingMachine.insertCoin("quarter");
    expect(vendingMachine.cashTendered).toBe(25);
  });
  it("calling function multiple times continues to add to amount", function() {
    const vendingMachine = new ChangeHandler(105);
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("quarter");
    expect(vendingMachine.cashTendered).toBe(50);
  });
  it("returns true if cashtendered is > amountDue", function() {
    const vendingMachine = new ChangeHandler(10);
    vendingMachine.insertCoin("quarter");
    vendingMachine.isPaymentSufficient();
    expect(vendingMachine.isPaymentSufficient()).toBe(true);
  });
  it("returns false if cashtendered is < amountDue", function() {
    const vendingMachine = new ChangeHandler(10);
    vendingMachine.insertCoin("penny");
    expect(vendingMachine.isPaymentSufficient()).toBe(false);
  });
  it("returns true if cashtendered is = amountDue", function() {
    const vendingMachine = new ChangeHandler(10);
    vendingMachine.insertCoin("dime");
    vendingMachine.isPaymentSufficient();
    expect(vendingMachine.isPaymentSufficient()).toBe(true);
  });
  it("32 change produces 1 qt 0 dimes, 1 nickel, 2 pennies", function() {
    const vendingMachine = new ChangeHandler(0);
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("nickel");
    vendingMachine.insertCoin("penny");
    vendingMachine.insertCoin("penny");
    vendingMachine.giveChange();
    expect(vendingMachine.giveChange()).toEqual({
      quarters: 1,
      dimes: 0,
      nickels: 1,
      pennies: 2
    });
  });
  it("10 change produces 0 qt 1 dimes, 0 nickel, 0 pennies", function() {
    const vendingMachine = new ChangeHandler(0);
    vendingMachine.insertCoin("dime");
    vendingMachine.giveChange();
    expect(vendingMachine.giveChange()).toEqual({
      quarters: 0,
      dimes: 1,
      nickels: 0,
      pennies: 0
    });
  });
  it("27 change produces 1 qt 0 dimes, 0 nickel, 2 pennies", function() {
    const vendingMachine = new ChangeHandler(0);
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("penny");
    vendingMachine.insertCoin("penny");
    vendingMachine.giveChange();
    expect(vendingMachine.giveChange()).toEqual({
      quarters: 1,
      dimes: 0,
      nickels: 0,
      pennies: 2
    });
  });
  it("68 change produces 2 qt 1 dimes, 1 nickel, 3 pennies", function() {
    const vendingMachine = new ChangeHandler(0);
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("quarter");
    vendingMachine.insertCoin("dime");
    vendingMachine.insertCoin("nickel");
    vendingMachine.insertCoin("penny");
    vendingMachine.insertCoin("penny");
    vendingMachine.insertCoin("penny");
    vendingMachine.giveChange();
    expect(vendingMachine.giveChange()).toEqual({
      quarters: 2,
      dimes: 1,
      nickels: 1,
      pennies: 3
    });
  });
});
