import { getFileMock } from '../../../utils/functions';

const tempSpreadsheetMock: Partial<Express.Multer.File> = {
  fieldname: 'file',
  originalname: 'mock-vacancy-spreadsheet-xlsx.xlsx',
  encoding: '7bit',
  mimetype: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  size: 1111,
  destination: 'mock destination',
  filename: 'mock  filename',
  path: 'mock path',
};

export const spreadsheetMock = getFileMock(
  tempSpreadsheetMock,
  'planilha.xlsx',
);
