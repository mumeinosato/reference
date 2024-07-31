import { Buffer } from 'buffer';

export function exportData(basecsv: string) {
  const csv = Buffer.from(basecsv, 'base64').toString('utf-8');

  const list = csv.split('\n').map((row) => row.split(','));
  list.splice(0, 28);

  const result: string[] = [];

  for (let i = 0; i < 17; i += 2) {
    for (let j = 0; j < list.length; j++) {
      if (list[j][i] === 'TRUE' || list[i][i] === 'FALSE') {
        result.push(list[j][i + 1]);
      }
    }
  }

  return result;
}
