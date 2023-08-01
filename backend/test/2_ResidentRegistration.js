const ResidentRegistration = artifacts.require("./ResidentRegistration.sol");

contract("Owner Methods", (accounts) => {
    const ownerAccount = accounts[0];

    it("should set tax rate", async () => {
        const instance = await ResidentRegistration.deployed();
        await instance.setTaxRate(20, { from: ownerAccount });
        const taxRate = await instance.taxRate.call();
        assert.equal(taxRate, 20, "Tax rate is not set");
    });

    it("should get all residents", async () => {
        const instance = await ResidentRegistration.deployed();
        const residents = await instance.getAllResident.call();
        assert.equal(residents.length, 0, "Residents are not empty");
    });

    it("should get resident by wallet address", async () => {
        const instance = await ResidentRegistration.deployed();
        await instance.registerResident(
            "Jhon",
            "street",
            "city",
            "state",
            55800,
            31,
            7,
            1999,
            { from: accounts[2] }
        );
        const resident = await instance.getResident.call(accounts[2]);
        assert.equal(resident.name, "Jhon", "Resident name is not Jhon");
    });

    it("should get resident by name", async () => {
        const instance = await ResidentRegistration.deployed();
        const resident = await instance.searchResidentByName.call("Jhon");
        assert.equal(resident.name, "Jhon", "Resident name is not Jhon");
    });
});