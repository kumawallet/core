import { Args, Query, Resolver } from '@nestjs/graphql'
import { CreateSwapArgs, CreateSwap } from './dtos/create-swap.dto'
import { ActiveSwaps, ActiveSwapsArgs } from './dtos/get-active-swaps.dto'
import { EstimatedAmount, GetEstimatedAmount } from './dtos/get-estimated-amount.dto'
import { GetPairTokens } from './dtos/get-pairs-tokens.dto'
import { PairTokensFromNativeCurrency, Tokens } from './dtos/get-tokens.dto'
import { StealthExService } from './stealhtex.service'

@Resolver()
export class StealhExResolver {
  constructor(private readonly stealthexService: StealthExService) {}

  @Query(() => Tokens)
  async getTokens() {
    const tokens = (await this.stealthexService.getTokens()) as {
      name: string
      symbol: string
      image: string
      network: string
    }[]

    return {
      tokens,
    }
  }

  @Query(() => PairTokensFromNativeCurrency)
  async getPairTokensFromNativeCurrency(@Args() args: GetPairTokens) {
    const pairTokens = await this.stealthexService.getPairTokensFromNativeCurrency(args)
    return {
      pairTokens,
    }
  }

  @Query(() => EstimatedAmount)
  async getEstimatedAmount(@Args() args: GetEstimatedAmount) {
    const { estimatedAmount, minAmount } = await this.stealthexService.getEstimatedAmount(args)

    return {
      estimatedAmount,
      minAmount,
    }
  }

  @Query(() => CreateSwap)
  async createSwap(@Args() args: CreateSwapArgs) {
    const { destination, error, id } = await this.stealthexService.createSwap(args)
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
