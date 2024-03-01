import { HttpModule, HttpService } from '@nestjs/axios'
import { Test, TestingModule } from '@nestjs/testing'
import { of } from 'rxjs'
import t from 'tap'
import { StealthExService } from './stealhtex.service'
import { responseMock, HttpServiceError, mockService } from '../../mocks/mock-service'
import {
  currency,
  NativeCurrency,
  responseEstimate,
  responseMin,
  Swap,
  estimate,
  responseSwap,
  mockSwap,
} from '../../mocks/mock-stealhex'
import { mockPinoService } from '../../mocks/pino-mocks'
import { EnvModule } from '../env/env.module'
import { EnvService } from '../env/env.service'

t.test('StealthExService ', async (t) => {
  let service: StealthExService
  t.beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
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
        StealthExService,
        mockPinoService(StealthExService.name),
        {
          provide: HttpService,
          useValue: {
            request: (config: any) => {
              const path = config.url
              if (path == 'currency') return of(currency)
              else if (path.startsWith('pairs/')) return of(NativeCurrency)
              else if (path.startsWith('estimate/')) return of(responseEstimate)
              else if (path.startsWith('min/')) return of(responseMin)
              else if (path.startsWith('exchange')) return of(Swap)
              else if (path.startsWith('exchange/')) return of(Swap)
              return of(responseMock)
            },
          },
        },
      ],
    }).compile()
    service = module.get<StealthExService>(StealthExService)
  })
  t.test('should be defined', (t) => {
    t.ok(service)
    t.end()
  })

  t.test('sendPetition', async (t) => {
    const path = '/example/path'
    const method = 'GET'
    const params = { key: 'value' }
    const body = { data: 'example' }
    const result = await service.sendPetition(path, method, params, body)
    t.same(result, responseMock, 'The expected response was not obtained')
    t.end()
  })

  t.test('getTokens', async (t) => {
    const result = await service.getTokens()
    t.same(result, currency.data, 'The expected response was not obtained')
    t.end()
  })
  t.test('getPairTokensFromNativeCurrency', async (t) => {
    const result: any = await service.getPairTokensFromNativeCurrency(['USDT'])
    t.same(result[0], { asset: 'USDT', pairs: NativeCurrency.data }, 'The expected response was not obtained')
    t.end()
  })
  t.test('getExchangeAmounts', async (t) => {
    const result = await service.getExchangeAmounts(
      '0xE063C958680A0CE941efc272eA0eB1299eAfCB65',
      '0xE063C958680A0CE941efc272eA0eB1299eAfCB65',
      '20',
    )
    t.same(result, estimate, 'The expected response was not obtained')
    t.end()
  })
  t.test('createSwap', async (t) => {
    const result = await service.createSwap(
      '0xE063C958680A0CE941efc272eA0eB1299eAfCB65',
      '0xE063C958680A0CE941efc272eA0eB1299eAfCB65',
      '20',
      'eth',
      'usdt',
    )
    t.same(result, responseSwap, 'The expected response was not obtained')
    t.end()
  })
  t.test('getActiveSwaps', async (t) => {
    const result = await service.getActiveSwaps(['145dfnd'])
    t.same(result, [mockSwap], 'The expected response was not obtained')
    t.end()
  })
  t.test('Catchs', async (t) => {
    const serviceError = new StealthExService(mockService, HttpServiceError)
    t.test('getTokens - Catch', async (t) => {
      const capturedLogs = t.capture(console, 'log')
      const result = await serviceError.getTokens()
      const results = capturedLogs()
      t.ok(results.length > 0, 'logger.err() did not run')
      t.same(result, [], 'The expected response was not obtained')
      t.end()
    })
    t.test('getPairTokensFromNativeCurrency - Catch', async (t) => {
      const capturedLogs = t.capture(console, 'log')
      const result = await serviceError.getPairTokensFromNativeCurrency(['DOT'])
      const results = capturedLogs()
      t.ok(results.length > 0, 'logger.err() did not run')
      t.same(result, [], 'The expected response was not obtained')
      t.end()
    })

    t.test('getExchangeAmounts - Catch', async (t) => {
      const capturedLogs = t.capture(console, 'log')
      const result = await serviceError.getExchangeAmounts(
        '0xE063C958680A0CE941efc272eA0eB1299eAfCB65',
        '0xE063C958680A0CE941efc272eA0eB1299eAfCB65',
        '20',
      )
      const results = capturedLogs()
      t.ok(results.length > 0, 'logger.err() did not run')
      t.same(result, { estimated: '0', min: '0' }, 'The expected response was not obtained')
      t.end()
    })
    t.test('createSwap - Catch', async (t) => {
      const capturedLogs = t.capture(console, 'log')
      await serviceError.createSwap(
        '0xE063C958680A0CE941efc272eA0eB1299eAfCB65',
        '0xE063C958680A0CE941efc272eA0eB1299eAfCB65',
        '20',
        'eth',
        'usdt',
      )
      const results = capturedLogs()
      t.ok(results.length > 0, 'logger.err() did not run')
      t.end()
    })
    t.test('getActiveSwaps - Catch', async (t) => {
      const capturedLogs = t.capture(console, 'log')
      const result = await serviceError.getActiveSwaps(['145dfnd'])
      const results = capturedLogs()
      t.ok(results.length > 0, 'logger.err() did not run')
      t.same(result, [], 'The expected response was not obtained')
      t.end()
    })
  })
})
