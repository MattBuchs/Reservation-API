import * as datamappers from "../models/index.datamapper.js";

export default {
    async getTodaysRooms(req, res) {
        const { date } = req.body;
        try {
            if (!date)
                throw new Error("Missing value", {
                    cause: { code: 400 },
                });

            const dayRooms = await datamappers.roomDatamapper.getRoomsForDay(
                date
            );
            if (!dayRooms)
                throw new Error("Rooms not found", {
                    cause: { code: 404 },
                });
            return res.status(200).json({ dayRooms });
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
