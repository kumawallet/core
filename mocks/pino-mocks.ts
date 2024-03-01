import { getLoggerToken } from 'nestjs-pino'
export const mockPinoService = (serviceName: string) => {
    const mockService = {
        info: () => {},
        debug: () => {},
        error: () => { error: 'Error'},
        warn: () => {},
      };
    return {
        provide: getLoggerToken(serviceName),
        useValue: mockService,
      }
}
