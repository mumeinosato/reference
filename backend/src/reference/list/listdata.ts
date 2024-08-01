import { Buffer } from 'buffer';

export function exportData(basecsv: string) {
  const csv = Buffer.from(basecsv, 'base64').toString('utf-8');

  const list = csv.split('\n').map((row) => row.split(','));
  list.splice(0, 28);

  const result: string[][] = [[], []];

  let k = 1;

  for (let i = 0; i < 17; i += 2) {
    for (let j = 0; j < list.length; j++) {
      if (list[j][i] === 'TRUE' || list[j][i] === 'FALSE') {
        result[0].push(list[j][i + 1]);
        result[1].push(k.toString());
      }
    }

    if (i === 0) k = 2;
    else if (i === 6) k = 3;
    else if (i === 12) k = 4;
    else if (i === 14) k = 5;
  }

  return result;
}
