// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

type Data = {
  name: string
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  console.log(__dirname)
  const data = fs.readFileSync('/sitemap.xml', { encoding: 'utf-8' })
  res.status(200).json({ data: data })
}
