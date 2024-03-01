import { Test, TestingModule } from '@nestjs/testing'
import t from 'tap'
import { TokensResolver } from './tokens.resolver'
import { TokensService } from './tokens.service'
import { httpServiceMock } from '../../mocks/mock-tokens'
import { mockPinoService } from '../../mocks/pino-mocks'

t.test('TokensResolver ', async (t) => {
  let resolver: TokensResolver
  t.beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokensResolver,
        {
          provide: TokensService,
          useValue: {
            getTokensPrice: () => httpServiceMock,
          },
        },
        mockPinoService(TokensResolver.name),
      ],
    }).compile()
    resolver = module.get<TokensResolver>(TokensResolver)
  })

  t.test('should be defined', (t) => {
    t.ok(resolver)
    t.end()
  })

  t.test('getTokensPrices', (t) => {
    const result = resolver.getTokenPrice({ tokens: ['DOT', 'USDT'] })
    t.same(result.tokens, httpServiceMock, 'The expected response was not obtained')
    t.end()
  })
})
