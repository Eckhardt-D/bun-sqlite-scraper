/* https://github.com/Eckhardt-D/bun-sqlite-scraper */

import sql from 'sql-template-tag'
import { Database } from 'bun:sqlite'
import * as sqlite_http from 'sqlite-http'
import * as sqlite_html from 'sqlite-html'

const db = new Database(':memory:')

db.loadExtension(sqlite_http.getLoadablePath())
db.loadExtension(sqlite_html.getLoadablePath())

const query = sql`
  SELECT text, html_attribute_get(html, 'a', 'href') AS href
  FROM html_each(http_get_body('https://text.npr.org'), 'a')
`;

const rows = db.prepare(query.sql).all();


console.table(rows)

/*

----------------------
|  text  |   href    |
----------------------
|  title |  /1234    |
----------------------

*/


