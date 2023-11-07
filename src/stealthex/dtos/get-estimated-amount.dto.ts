import { ArgsType, Field, ObjectType } from '@nestjs/graphql'

@ArgsType()
export class GetEstimatedAmount {
  @Field(() => String)
  from: string = ''

  @Field(() => String)
  to: string = ''

  @Field(() => String)
  amount: string = ''
}

@ObjectType()
export class EstimatedAmount {
  @Field(() => String!, { nullable: true })
  estimatedAmount?: string = ''

  @Field(() => String)
  minAmount: string = ''
}
