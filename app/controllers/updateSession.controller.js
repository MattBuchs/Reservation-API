import * as datamappers from "../models/index.datamapper.js";

export default {
    async addNewDay(req, res) {
        try {
            const addDay = await datamappers.sessionDatamapper.addNewDay();

            if (!addDay)
                throw new Error("New day could not be created", {
                    cause: { code: 400 },
                });

            return res.status(201).json({ addDay });
        } catch (err) {
            console.log(err);
            if (err.cause) {
                const { code } = err.cause;
                return res.status(code).json({ error: err.message });
            }
            return res
                .status(500)
                .json({ error: `Internal Server Error: ${err.message}` });
        }
    },

    async deletePastDay(req, res) {
        try {
            const deleteDay =
                await datamappers.sessionDatamapper.deletePastDay();

            if (!deleteDay)
                throw new Error("The day could not be deleted", {
                    cause: { code: 400 },
                });

            return res.status(201).json({ deleteDay });
        } catch (err) {
            console.log(err);
            if (err.cause) {
                const { code } = err.cause;
                return res.status(code).json({ error: err.message });
            }
            return res
                .status(500)
                .json({ error: `Internal Server Error: ${err.message}` });
        }
    },
};
