// rpcii is a Discord rich presence for Nintendo Wii using RiiConnect24's RiiTag
// Copyright (C) 2022 Ruben Uijtdewilligen

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import fetch from 'node-fetch';
import fs from 'fs';
import { Client } from '@xhayper/discord-rpc';

const client = new Client({
  clientId: '939928903315771452',
});

client.on('ready', () => {
  fs.readFile('wiitdb.txt', 'utf8', async (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const response = await fetch('https://tag.rc24.xyz/api/user/708412162586181632');
    const tag_data = await response.json();

    client.user.setActivity({
      state: data
        .split('\r\n')
        .find((el) => el.includes(tag_data.game_data.last_played.game_id))
        .split(' = ')[1]
        .toString(),
      startTimestamp: tag_data.game_data.last_played.time,
      largeImageKey: `https://art.gametdb.com/wii/cover/US/${tag_data.game_data.last_played.game_id}.png`,
    });
  });
});

client.login();
