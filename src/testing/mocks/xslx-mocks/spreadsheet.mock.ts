import { createReadStream } from 'fs';

export const spreadsheetMock: Express.Multer.File = {
  fieldname: 'file',
  originalname: 'mock-vacancy-spreadsheet-xlsx.xlsx',
  encoding: '7bit',
  mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  buffer: Buffer.from('mock buffer'),
  size: 1111,
  stream: createReadStream('mock redable stream'),
  destination: 'mock destination',
  filename: 'mock  filename',
  path: 'mock path',
};
