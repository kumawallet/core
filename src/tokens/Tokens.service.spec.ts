import { HttpModule, HttpService } from '@nestjs/axios'
import { CacheModule, Cache } from '@nestjs/cache-manager'
import { Test, TestingModule } from '@nestjs/testing'
import { of } from 'rxjs'
import t from 'tap'
import { TokensService } from './tokens.service'
import { cacheManagerMock, HttpServiceError, mockService } from '../../mocks/mock-service'
import { filterToken, httpServiceMock, tokensSave } from '../../mocks/mock-tokens'
import { mockPinoService } from '../../mocks/pino-mocks'
import { EnvModule } from '../env/env.module'
import { EnvService } from '../env/env.service'

t.test('TokensService ', async (t) => {
  let service: TokensService
  t.beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register(),
        HttpModule.registerAsync({
          imports: [EnvModule],
          inject: [EnvService],
          useFactory: async (env: EnvService) => ({
            baseURL: env.COINMARKETCAP_BASE_URL,
            headers: {
              'X-CMC_PRO_API_KEY': env.COINMARKETCAP_API_KEY,
            },
          }),
        }),
        EnvModule,
      ],
      providers: [
        TokensService,
        mockPinoService(TokensService.name),
        {
          provide: HttpService,
          useValue: {
            get: () => of(httpServiceMock),
          },
        },
        {
          provide: Cache,
          useValue: cacheManagerMock,
        },
      ],
    }).compile()
    service = module.get<TokensService>(TokensService)
  })
  t.test('should be defined', (t) => {
    t.ok(service)
    t.end()
  })

  t.test('fetchTokensPrices', async (t) => {
    const symbols = ['DOT', 'USDT']
    const result = await service.fetchTokensPrices(symbols)
    t.ok(result)
    t.same(Object.keys(result), symbols, 'The expected response was not obtained')
    t.end()
  })

  t.test('updateTokenPrices - Cache-Manager', async (t) => {
    t.beforeEach(async () => {
      cacheManagerMock.setData = []
    })
    t.test('tokens saved', async (t) => {
      await service.updateTokenPrices()
      t.ok(cacheManagerMock.setData.length > 0, 'set() is running')
      t.same(cacheManagerMock.setData[0], tokensSave, 'The expected response was not obtained')
      t.end()
    })
  })
  t.test('getTokensPrice', async (t) => {
    const result = await service.getTokensPrice(['DOT'])
    t.same(result, filterToken, 'The expected response was not obtained')
    t.end()
  })

  t.test('updateTokenPrices - Catch', async (t) => {
    const serviceError = new TokensService(mockService as any, HttpServiceError as any, cacheManagerMock as any)
    const capturedLogs = t.capture(console, 'log')
    await serviceError.updateTokenPrices()
    const results = capturedLogs()
    t.ok(results.length > 0, 'Se han registrado mensajes en la consola')
    t.end()
  })
})
