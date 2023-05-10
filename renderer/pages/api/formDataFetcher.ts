import path from 'path';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const filePath = path.join(process.cwd(), 'public', 'FormData.json');
    await checkFileExists(filePath);
    const json = await fs.readFile(filePath, 'utf8');
    res.json(JSON.parse(json));
  }

async function checkFileExists(filePath: string): Promise<boolean> {
    try {
      await fs.access(filePath);
      return true;
    } catch (err:any) {
      if (err.code === 'ENOENT') {
        fs.writeFile(filePath,JSON.stringify([]))
        return false;
      } else {
        throw err;
      }
    }
  }
  