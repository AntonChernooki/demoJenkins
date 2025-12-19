const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Role = sequelize.define('role', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING }
}, {
    timestamps: false
});

const Generic = sequelize.define('generic', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    created_when: { type: DataTypes.DATE },
    created_by: { type: DataTypes.STRING },
    updated_when: { type: DataTypes.DATE },
    updated_by: { type: DataTypes.STRING },
    deleted_when: { type: DataTypes.DATE },
    deleted_by: { type: DataTypes.STRING }
}, {
    timestamps: false
});

const Genre = sequelize.define('genre', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false }
}, {
    timestamps: false
});

const Film = sequelize.define('film', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    release_year: { type: DataTypes.SMALLINT },
    genre_id: { type: DataTypes.BIGINT, references: { model: Genre, key: 'id' } },
    country: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    poster_file_name: { type: DataTypes.STRING }
}, {
    timestamps: false
});

const FilmCreator = sequelize.define('film_creator', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    full_name: { type: DataTypes.STRING, allowNull: false },
    position: { type: DataTypes.STRING }
}, {
    timestamps: false
});

const FilmSession = sequelize.define('film_session', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    start_date: { type: DataTypes.DATE },
    start_time: { type: DataTypes.TIME },
    price: { type: DataTypes.DOUBLE }
}, {
    timestamps: false
});

const Seat = sequelize.define('seat', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    row: { type: DataTypes.INTEGER },
    place: { type: DataTypes.INTEGER },
    status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'available' } 
}, {
    timestamps: false
});

const Order = sequelize.define('order', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    cost: { type: DataTypes.DOUBLE },
    purchase: { type: DataTypes.BOOLEAN }
}, {
    timestamps: false
});

const User = sequelize.define('user', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    first_name: { type: DataTypes.STRING },
    last_name: { type: DataTypes.STRING },
    birth_date: { type: DataTypes.DATE },
    email: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role_id: { type: DataTypes.BIGINT }
}, {
    timestamps: false
});

const Review = sequelize.define('review', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.STRING },
    rating: { type: DataTypes.INTEGER, allowNull: false }
}, {
    timestamps: false
});

const Hall = sequelize.define('hall', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    capacity: { type: DataTypes.INTEGER, allowNull: false }
}, {
    timestamps: false
});

Film.belongsTo(Genre, { foreignKey: 'genre_id' });
Genre.hasMany(Film, { foreignKey: 'genre_id' });

Film.belongsToMany(FilmCreator, { through: 'films_film_creators', timestamps: false });
FilmCreator.belongsToMany(Film, { through: 'films_film_creators', timestamps: false });

Film.hasMany(FilmSession, { foreignKey: 'film_id' });
FilmSession.belongsTo(Film, { foreignKey: 'film_id' });

Film.hasMany(Review, { foreignKey: 'film_id' });
Review.belongsTo(Film, { foreignKey: 'film_id' });

User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });

FilmSession.hasMany(Order, { foreignKey: 'film_session_id' });
Order.belongsTo(FilmSession, { foreignKey: 'film_session_id' });

FilmSession.hasMany(Seat, { foreignKey: 'film_session_id' });
Seat.belongsTo(FilmSession, { foreignKey: 'film_session_id' });

Order.belongsToMany(Seat, { through: 'orders_seats', timestamps: false });
Seat.belongsToMany(Order, { through: 'orders_seats', timestamps: false });

User.belongsTo(Role, { foreignKey: 'role_id', as: 'role' });
Role.hasMany(User, { foreignKey: 'role_id' });

FilmSession.belongsTo(Hall, { foreignKey: 'hall_id' });
Hall.hasMany(FilmSession, { foreignKey: 'hall_id' });

module.exports = {
    Film,
    FilmCreator,
    FilmSession,
    Seat,
    Order,
    User,
    Review,
    Role,
    Generic,
    Hall,
    Genre 
};