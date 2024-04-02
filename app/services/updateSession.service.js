import { sessionDatamapper } from "../models/index.datamapper.js";

export default {
    async addNewDay() {
        try {
            const addDay = await sessionDatamapper.addNewDay();
            console.log("addDay", addDay);

            if (!addDay) throw new Error("New day could not be created");
        } catch (err) {
            console.log(err);
        }
    },

    async deletePastDay() {
        try {
            const deleteDay = await sessionDatamapper.deletePastDay();
            console.log("deleteDay", deleteDay);

            if (!deleteDay) throw new Error("The day could not be deleted");
        } catch (err) {
            console.log(err);
        }
    },
};
