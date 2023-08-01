const ResidentRegistration = artifacts.require("./ResidentRegistration.sol");

contract("Resident Methods", (accounts) => {

    const residentAccount = accounts[1];

    it("should register resident", async () => {
        const residentRegistrationInstance = await ResidentRegistration.deployed()
        // Set value of 20
        await residentRegistrationInstance.registerResident(
            "Jhon",
            "street",
            "city",
            "state",
            55800,
            31,
            7,
            1999,
            { from: residentAccount }
        );
        // Get stored value
        const resident = await residentRegistrationInstance.getMeResident.call({
            from: residentAccount,
        });

        assert.equal(
            resident.name,
            "Jhon",
            "Resident name is not Jhon" + resident.name
        );
    });

    it("should update resident", async () => {
        const residentRegistrationInstance = await ResidentRegistration.deployed()
        // Set value of 20
        await residentRegistrationInstance.updateResident(
            "Berk", //-> changed
            "street",
            "city",
            "state",
            55800,
            31,
            7,
            1999,
            { from: accounts[1] }
        );
        // Get stored value
        const resident = await residentRegistrationInstance.getMeResident.call({
            from: residentAccount,
        });

        assert.equal(
            resident.name,
            "Berk",
            "Resident is updated" + resident.name
        );
    });

    it("should declare income", async () => {
        const residentRegistrationInstance = await ResidentRegistration.deployed()
        // Set value of 20
        await residentRegistrationInstance.declareIncome(100, {
            from: residentAccount
        });
        // Get stored value
        const resident = await residentRegistrationInstance.getMeResident.call({
            from: residentAccount,
        });

        assert.equal(
            resident.income,
            100,
            "Resident income is not 100" + resident.income
        );
    });

    it("should pay tax", async () => {
        const residentRegistrationInstance = await ResidentRegistration.deployed()
        await residentRegistrationInstance.payTax({
            from: residentAccount,
            value: 10,
        });

        const resident = await residentRegistrationInstance.getMeResident.call({
            from: residentAccount,
        });

        assert.equal(
            resident.taxDept,
            0,
            "Resident tax dept is not 0" + resident.taxDept
        );

    });

    it("should get tax dept", async () => {
        const residentRegistrationInstance = await ResidentRegistration.deployed()
        const taxDept = await residentRegistrationInstance.getTaxDept({
            from: residentAccount,
        })

        assert.equal(
            parseInt(taxDept),
            0,
            "Resident tax dept is not 0" + taxDept
        );
    })

    it("should get me resident", async () => {
        const residentRegistrationInstance = await ResidentRegistration.deployed()
        const resident = await residentRegistrationInstance.getMeResident.call({
            from: residentAccount,
        });

        assert.equal(
            resident.name,
            "Berk",
            "Resident name is not Berk" + resident.name
        );
    })

});