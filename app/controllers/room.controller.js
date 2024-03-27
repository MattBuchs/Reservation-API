import * as datamappers from "../models/index.datamapper.js";

export default {
    async getRooms(req, res) {
        try {
            const rooms =
                await datamappers.roomDatamapper.getRoomsWithDetails();

            console.log(rooms);
            if (!rooms)
                throw new Error("Rooms not found", {
                    cause: { code: 404 },
                });

            return res.status(200).json({ rooms });
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
