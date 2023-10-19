import { join } from 'path';
import { getFileToBuffer } from './get-file-to-buffer';

export const getFileMock = async (
  tempFileMock: Partial<Express.Multer.File>,
  path: string,
): Promise<Express.Multer.File> => {
  const { buffer, stream } = await getFileToBuffer(
    join(__dirname, `../testing/mocks/files-mocks/${path}`),
  );

  return { ...tempFileMock, buffer, stream } as Express.Multer.File;
};
