const { Pool } = require('pg');
const connectionString = 'postgresql://postgres:myPassword@146.56.197.70:5432/mydb';

const pool = new Pool({
    connectionString: connectionString,
});

pool.query('select version()', (err, res) => {
    console.log(err, res);
    pool.end();
});

// connect refused
// 1. add pg_ctl location and PGDATA to bash.
// my bash.profile is look like that:
// PATH=$PATH:$HOME/bin:/usr/pgsql-12/bin
// export PGDATA=/var/lib/pgsql/12/data
// export PATH
// 
// 2.edit pg_hba.conf, add host all all 0.0.0.0/0 md5
//
// 3.edit remove comment and modify listen_addresses = '*'