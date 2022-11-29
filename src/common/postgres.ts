import pg from 'pg'

import { POSTGRES_CA, POSTGRES_CONNECTION_STRING, PROJECT_ENV } from './constants'

const { Pool } = pg

// https://github.com/brianc/node-postgres/issues/2089#issuecomment-580266063
export const pool = new Pool({
  connectionString: POSTGRES_CONNECTION_STRING,

  ...((PROJECT_ENV === 'cloud-dev' ||
    PROJECT_ENV === 'cloud-prod' ||
    PROJECT_ENV === 'local-prod') && {
    ssl: {
      ca: `-----BEGIN CERTIFICATE-----\n${POSTGRES_CA}\n-----END CERTIFICATE-----`,
      checkServerIdentity: () => {
        return undefined
      },
    },
  }),
})
