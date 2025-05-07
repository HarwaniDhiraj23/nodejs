import { COMMON_MESSAGES, ErrorType } from '../constants/messages';
import { throwError } from '../middlewares/errorMiddleware';
import { HttpStatus } from '../utils/httpStatus';
import { successResponse } from '../utils/responseHelper';
import fs from 'fs';
import path from 'path';

export const uploadFile = async (req: any, res: any): Promise<void> => {
    if (!req.file) {
        throwError(ErrorType.UPLOAD_PROMPT)
    }
    const buffer = fs.readFileSync(req.file.path); // this creates a buffer
    console.log('Buffer length:', buffer.length);

    // ✅ Step 2: Create a stream and copy the file using it
    const fileStream = fs.createReadStream(req.file.path);
    const copyPath = path.join('uploads', 'copy_' + req.file.filename);
    const writeStream = fs.createWriteStream(copyPath);

    // Pipe the read stream into the write stream
    fileStream.pipe(writeStream);

    // Handle stream completion
    writeStream.on('finish', () => {
        console.log('File copied using stream to:', copyPath);

        // Prepare custom file object for response
        const file = {
            original: req.file.filename,
            copy: 'copy_' + req.file.filename,
            size: req.file.size,
            mimetype: req.file.mimetype,
        };
    });

    // Optional: Handle stream errors
    writeStream.on('error', (err) => {
        console.error('Stream error:', err);
        throwError(ErrorType.UPLOAD_FAILED);
    });
    const file = { file: req.file }
    successResponse(res, HttpStatus.OK, true, COMMON_MESSAGES.UPLOAD_SUCCESS, file);
};

