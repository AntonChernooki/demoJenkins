const SeatService = require('../services/seatService');

const getSeats = async (req, res) => {
    try {
        const seats = await SeatService.getSeats();
        res.json(seats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSeatById = async (req, res) => {
    try {
        const seat = await SeatService.getSeatById(req.params.id);
        if (seat) {
            res.json(seat);
        } else {
            res.status(404).json({ error: 'Seat not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getSeatsBySessionId = async (req, res) => {
    try {
        const seats = await SeatService.getSeatsBySessionId(req.params.sessionId);
        res.json(seats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createSeat = async (req, res) => {
    try {
        const { film_session_id, seats } = req.body;
        console.log("Received data:", { film_session_id, seats }); // Логируем входящие данные

        // Валидация данных
        if (!film_session_id || !seats || !Array.isArray(seats)) {
            return res.status(400).json({ error: "Необходимо указать film_session_id и массив seats" });
        }

        // Создаем места
        const createdSeats = await SeatService.createSeats(film_session_id, seats);
        console.log("Created seats:", createdSeats); // Логируем созданные места
        res.status(201).json(createdSeats);
    } catch (error) {
        console.error("Ошибка при создании мест:", error);
        res.status(500).json({ error: error.message });
    }
};
const updateSeat = async (req, res) => {
    try {
        const seat = await SeatService.getSeatById(req.params.id);
        if (seat) {
            await SeatService.updateSeat(seat, req.body);
            res.json(seat);
        } else {
            res.status(404).json({ error: 'Seat not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteSeat = async (req, res) => {
    try {
        const seat = await SeatService.getSeatById(req.params.id);
        if (seat) {
            await SeatService.deleteSeat(seat);
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Seat not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getSeats,
    getSeatById,
    getSeatsBySessionId,
    createSeat,
    updateSeat,
    deleteSeat
};