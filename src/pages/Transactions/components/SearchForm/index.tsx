import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlass } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { TransactionsContext } from '../../../../contexts/TransactionsProvider'
import { SearchFormContainer } from './styles'
import { useContextSelector } from 'use-context-selector'

const searchFormSchema = zod.object({
  query: zod.string(),
})

type SearchFormInputs = zod.infer<typeof searchFormSchema>

export function SearchForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  })

  const fetchTransactions = useContextSelector(TransactionsContext, (context) => {
    return context.fetchTransactions
  })

  async function handleSearchTransactions({ query }: SearchFormInputs) {
    await fetchTransactions({ query })
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input type="search" placeholder="Busque por transações" {...register('query')} />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
      </button>
    </SearchFormContainer>
  )
}
