const pool = require('../utils/pool');
const { Pool } = require('../utils/pool');

module.exports = class Sauce {
    id;
    color;
    type;

    constructor(row) {
      this.id = row.id;
      this.color = row.color;
      this.type = row.type;
    }

    static async insert({ color, type }) {
      const { rows } = await Pool.query(
        'INSERT INTO sauce (color, type) VALUES($1, $2) RETURNING *',
        [color, type]
      );
      return new Sauce(rows[0]);
    }


    static async returnAll() {
      const { rows } = await Pool.query(
        'SELECT * FROM  sauce'
      );
      return rows.map(row => Sauce(row));
    }

    static async findById(id) {
      const { rows } = await Pool.query(
        'SELECT * FROM  sauce WHERE id=$1',
        [id]
      );
      return new Sauce(rows[0]);
    }

    static async update(id, { color, type }) {
      const { rows } = await Pool.query(
        `UPDATE sauce
            SET color=$1
            type=$2
            WHERE id=$3
            RETURNING *`,
        [color, type, id]
      );
      return new Sauce(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM sauce WHERE id=$1 RETURNING *',
        [id]
      );
      return new Sauce(rows[0]);
    }

};
