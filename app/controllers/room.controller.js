import * as datamappers from "../models/index.datamapper.js";

export default {
    async getTodaysRooms(req, res) {
        const { date } = req.query;
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

            const farthestDay =
                await datamappers.roomDatamapper.getFarthestDay();

            if (!farthestDay)
                throw new Error("farthest day not found", {
                    cause: { code: 400 },
                });

            const groupedData = {};

            dayRooms.forEach((session) => {
                const { room_id, name, icon, day, is_blocked, hour } = session;

                if (!groupedData[room_id]) {
                    // Si la salle n'est pas encore dans groupedData, on l'initialise
                    groupedData[room_id] = {
                        room_id,
                        name,
                        icon,
                        day,
                        sessions: [{ is_blocked, hour }],
                    };
                } else {
                    // Si la salle est déjà dans groupedData, on ajoute la session à son tableau de sessions
                    groupedData[room_id].sessions.push({ is_blocked, hour });
                }
            });

            // Conversion de l'objet en tableau
            const result = Object.values(groupedData);

            return res.status(200).json({ dayRooms: result, farthestDay });
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
