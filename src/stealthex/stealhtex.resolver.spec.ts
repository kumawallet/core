import { Test, TestingModule } from '@nestjs/testing'
import t from 'tap'
import { StealthAssets } from './dtos/array-stealth-assets'
import { StealthExService } from './stealhtex.service'
import { StealhExResolver } from './stealthex.resolver'
import { NativeCurrency, responseSwap, estimate, Swap } from '../../mocks/mock-stealhex'
import { mockPinoService } from '../../mocks/pino-mocks'

t.test('TokensResolver ', async (t) => {
  let resolver: StealhExResolver
  t.beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StealhExResolver,
        {
          provide: StealthExService,
          useValue: {
            getTokens: () => StealthAssets,
            getPairTokensFromNativeCurrency: () => NativeCurrency,
            createSwap: () => responseSwap,
            getExchangeAmounts: () => estimate,
            getActiveSwaps: () => Swap,
          },
        },
        mockPinoService(StealhExResolver.name),
      ],
    }).compile()
    resolver = module.get<StealhExResolver>(StealhExResolver)
  })

  t.test('should be defined', (t) => {
    t.ok(resolver)
    t.end()
  })

  t.test('getTokens', async (t) => {
    const result = await resolver.getTokens()
    t.same(result, { tokens: StealthAssets }, 'The expected response was not obtained')
    t.end()
  })

  t.test('getPairTokensFromNativeCurrency', async (t) => {
    const nativeCurrency = await resolver.getPairTokensFromNativeCurrency({ nativeCurrencies: ['DOT'] })
    t.same(nativeCurrency, { pairs: NativeCurrency }, 'The expected response was not obtained')
    t.end()
  })

  t.test('CreateSwap', async (t) => {
    const swap = await resolver.createSwap({
      addressFrom: '1DpwmiCkmpwXzk4ofFk5Qg9AjqsPiEMbxH',
      addressTo: '0x6B6005c8e59bfEcF565c7B5f6097b12AA6e35806',
      amountFrom: '0.1',
      currencyFrom: 'btc',
      currencyTo: 'eth',
    })
    t.same({ destination: swap.destination, id: swap.id }, responseSwap, 'The expected response was not obtained')
    t.end()
  })

  t.test('getEstimatedAmount', async (t) => {
    const result = await resolver.getEstimatedAmount({
      from: 'btc',
      to: 'eth',
      amount: '0.54',
    })
    t.same(result, estimate, 'The expected response was not obtained')
    t.end()
  })
  t.test('getActiveSwaps', async (t) => {
    const result = await resolver.getActiveSwaps({ swapsIds: ['145dfnd'] })
    t.same(result, Swap, 'The expected response was not obtained')
    t.end()
  })
})
