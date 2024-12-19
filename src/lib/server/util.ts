import { dev } from '$app/environment';
import type { LogLevel } from 'vite';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const { combine, timestamp, json } = winston.format;

export interface LogEvent {
	level: LogLevel;
	message: string;
	userId: string | undefined | null;
	error?: Error | unknown;
	errorId?: string;
	meta?: Record<string, unknown>;
}

const stripe_logger = winston.createLogger({
	format: combine(timestamp(), json()),
	transports: [
		new winston.transports.Console({
			level: dev ? 'info' : 'error'
		}),
		new DailyRotateFile({
			filename: 'logs/stripe-server-%DATE%.log',
			datePattern: 'YYYY-MM-DD',
			zippedArchive: true,
			maxSize: '20m',
			maxFiles: '14d',
			level: 'info'
		})
	]
});

const general_logger = winston.createLogger({
	format: combine(timestamp(), json()),
	transports: [
		// Only log errors to console in production
		new winston.transports.Console({
			level: dev ? 'info' : 'error'
		}),
		new DailyRotateFile({
			filename: 'logs/info-server-%DATE%.log',
			datePattern: 'YYYY-MM-DD',
			zippedArchive: true,
			maxSize: '20m',
			maxFiles: '14d',
			level: 'info'
		}),
		new DailyRotateFile({
			filename: 'logs/error-server-%DATE%.log',
			datePattern: 'YYYY-MM-DD',
			zippedArchive: true,
			maxSize: '20m',
			maxFiles: '14d',
			level: 'error'
		})
	]
});

export const logError = (
	message: string,
	userId: string | undefined,
	error: Error | undefined,
	errorId?: string | undefined
) => {
	general_logger.log({
		level: 'error',
		message,
		error,
		meta: {
			userId,
			errorId,
			stack: error instanceof Error ? error.stack : undefined,
			errorMsg: error instanceof Error ? error.message : undefined
		}
	});
};

export const logServer = ({ level, message, userId, error, errorId, meta }: LogEvent) => {
	general_logger.log({
		level,
		message,
		meta: {
			userId,
			stack: error instanceof Error ? error.stack : undefined,
			errorMsg: error instanceof Error ? error.message : undefined,
			errorId,
			...meta
		}
	});
};

/**  In addition to the norma error logging, also log stripe errors into a separate file for easier debugging.  */
export const logStripe = ({ level, message, userId, error, errorId, meta }: LogEvent) => {
	stripe_logger.log({
		level,
		message,
		meta: {
			userId,
			stack: error instanceof Error ? error.stack : undefined,
			errorMsg: error instanceof Error ? error.message : undefined,
			errorId,
			...meta
		}
	});
	general_logger.log({
		level,
		message,
		meta: {
			userId,
			stack: error instanceof Error ? error.stack : undefined,
			errorMsg: error instanceof Error ? error.message : undefined,
			errorId,
			...meta
		}
	});
};
