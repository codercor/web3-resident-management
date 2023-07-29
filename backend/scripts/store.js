const ResidentRegistration = artifacts.require('ResidentRegistration');

module.exports = async (callback) => {
  try {
    const residentRegistration = await ResidentRegistration.deployed();
    const reciept = await residentRegistration.taxRate();
    console.log(reciept);
  } catch(err) {
    console.log('Oops: ', err.message);
  }
  callback();
};
