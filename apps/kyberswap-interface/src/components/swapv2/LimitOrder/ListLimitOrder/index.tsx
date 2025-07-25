import { ChainId } from '@kyberswap/ks-sdk-core'
import { useSearchParams } from 'react-router-dom'
import { Flex } from 'rebass'
import styled from 'styled-components'

import ListMyOrder from '../ListOrder'
import OrderBook from '../OrderBook'
import { LimitOrderTab } from '../type'
import TabSelector from './TabSelector'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.border};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-left: -16px;
    width: 100vw;
    border-left: none;
    border-right: none;
    border-radius: 0;
    border: none;
  `};
`

export default function ListLimitOrder({ customChainId }: { customChainId?: ChainId }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const activeTab = (searchParams.get('activeTab') as LimitOrderTab) || LimitOrderTab.ORDER_BOOK

  const setActiveTab = (tab: LimitOrderTab) => {
    searchParams.set('activeTab', tab)
    setSearchParams(searchParams, { replace: true })
  }

  return (
    <Wrapper>
      <Flex flexDirection={['column', 'row']} justifyContent={'space-between'} alignItems={['flex-start', 'center']}>
        <TabSelector setActiveTab={setActiveTab} activeTab={activeTab} />
      </Flex>

      {activeTab === LimitOrderTab.ORDER_BOOK ? <OrderBook /> : <ListMyOrder customChainId={customChainId} />}
    </Wrapper>
  )
}
