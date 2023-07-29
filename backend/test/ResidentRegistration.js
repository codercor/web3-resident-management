const ResidentRegistration = artifacts.require("./ResidentRegistration.sol");

contract("ResidentRegistration tax rate", (accounts) => {
  it("...should store the value 0", async () => {
    const residentRegistrationInstance = await ResidentRegistration.deployed();
    // Get stored value
    const taxRate = await residentRegistrationInstance.taxRate.call({
      from: accounts[0],
    });

    assert.equal(taxRate, 10, "The value 10 was not stored. ->"+taxRate.toString());
  });
});
