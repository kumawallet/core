import { Args, Query, Resolver } from '@nestjs/graphql'
import { StealthAssets } from './dtos/array-stealth-assets'
import { CreateSwapArgs, CreateSwap } from './dtos/create-swap.dto'
import { ActiveSwaps, ActiveSwapsArgs } from './dtos/get-active-swaps.dto'
import { EstimatedAmount, GetEstimatedAmount } from './dtos/get-estimated-amount.dto'
import { GetPairTokens, GetPairTokensArgs } from './dtos/get-pairs-tokens.dto'
import { Tokens } from './dtos/get-tokens.dto'
import { StealthExService } from './stealhtex.service'

@Resolver()
export class StealhExResolver {
  constructor(private readonly stealthexService: StealthExService) {}

  @Query(() => Tokens)
  getTokensToSwap() {
    return {
      tokens: StealthAssets,
    }
  }

  @Query(() => Tokens)
  async getTokens() {
    const tokens = await this.stealthexService.getTokens()

    return {
      tokens: tokens.map((token) => ({
        name: token.name,
        symbol: token.symbol,
        image: token.image,
        network: token.network,
      })),
    }
  }

  @Query(() => GetPairTokens)
  async getPairTokensFromNativeCurrency(@Args() args: GetPairTokensArgs) {
    const pairs = await this.stealthexService.getPairTokensFromNativeCurrency(args.nativeCurrencies)

    return {
      pairs,
    }
  }

  @Query(() => EstimatedAmount)
  async getEstimatedAmount(@Args() args: GetEstimatedAmount) {
    const { from, to, amount } = args
    const { estimated, min } = await this.stealthexService.getExchangeAmounts(from, to, amount)
    return {
      estimated,
      min,
    }
  }

  @Query(() => CreateSwap)
  async createSwap(@Args() args: CreateSwapArgs) {
    const { addressFrom, addressTo, amountFrom, currencyFrom, currencyTo } = args
    const { destination, error, id } = await this.stealthexService.createSwap(
      addressFrom,
      addressTo,
      amountFrom,
      currencyFrom,
      currencyTo,
    )
    return {
      destination,
      error,
      id,
    }
  }

  @Query(() => [ActiveSwaps])
  async getActiveSwaps(@Args() { swapsIds }: ActiveSwapsArgs) {
    const activeSwaps = await this.stealthexService.getActiveSwaps(swapsIds)
    return activeSwaps
  }
}
