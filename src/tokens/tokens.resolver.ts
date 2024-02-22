import { Resolver, Query, Args } from '@nestjs/graphql'
import { TokensPrice, GetTokensArgs } from './dtos/get-tokens.dto'
import { TokensService } from './tokens.service'

@Resolver()
export class TokensResolver {
  constructor(private readonly tokensService: TokensService) {}

  @Query(() => TokensPrice)
  getTokenPrice(@Args() args: GetTokensArgs) {
    const tokens = this.tokensService.getTokensPrice(args.tokens)
    return {
      tokens,
    }
  }
}
