import { ObjectType, Field, ArgsType } from '@nestjs/graphql'

@ObjectType()
export class TokensPrice {
  @Field(() => [TokenInfo])
  tokens = []
}

@ObjectType()
export class TokenInfo {
  @Field(() => String)
  name = ''

  @Field(() => String)
  symbol = ''

  @Field(() => Number)
  usd = 0
}

@ArgsType()
export class GetTokensArgs {
  @Field(() => [String])
  tokens: string[] = []
}
