import { ArgsType, Field, ObjectType } from '@nestjs/graphql'

@ArgsType()
export class CreateSwapArgs {
  @Field(() => String)
  addressTo: string = ''

  @Field(() => String)
  amountFrom: string = ''

  @Field(() => String)
  currencyFrom: string = ''

  @Field(() => String)
  currencyTo: string = ''
}

@ObjectType()
export class CreateSwap {
  @Field(() => String!, { nullable: true })
  destination? = ''

  @Field(() => String!, { nullable: true })
  error? = ''
}