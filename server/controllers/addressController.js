import Address from "../models/AddressModel.js";

// Add Address : /api/address/add
export const addAddress = async (req, res) => {
    try {
        const { address, userId } = req.body;
        await Address.create({ ...address, userId });
        return ResponseModel.success(200, "Address added successfully", "Address added successfully").send(res);
    } catch (error) {
        console.log(error.message);
        return ResponseModel.error(500, "Internal Server Error", "Server error").send(error.message);
    }
};


// get Address : /api/address/add
export const getAddress = async (req, res) => {
    try {
        const { userId } = req.body;
        const addresses = await Address.find({ userId })
        return ResponseModel.success(200, "Addresses getted successfully", "Addresses getted successfully").send(addresses);
    } catch (error) {
        console.log(error.message);
        return ResponseModel.error(500, "Internal Server Error", "Server error").send(error.message);
    }
};
